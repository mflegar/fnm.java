package hr.fer.proinz.airelm.controller;

import hr.fer.proinz.airelm.dto.ProjectDTO;
import hr.fer.proinz.airelm.entity.Actor;
import hr.fer.proinz.airelm.entity.Institution;
import hr.fer.proinz.airelm.entity.Project;
import hr.fer.proinz.airelm.entity.State;
import hr.fer.proinz.airelm.repository.ActorRepository;
import hr.fer.proinz.airelm.repository.InstitutionRepository;
import hr.fer.proinz.airelm.repository.ProjectRepository;
import hr.fer.proinz.airelm.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("project")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private ActorRepository actorRepository;
    @Autowired
    private InstitutionRepository institutionRepository;

    // Add project
    @PostMapping("/add")
    public ResponseEntity<String> addProject(@RequestBody ProjectDTO projectDTO) {
        try {
            Optional<Actor> actor = actorRepository.findById(projectDTO.getActorID());
            Optional<Institution> institution = institutionRepository.findById(projectDTO.getInstitutionID());

            if (actor.isEmpty() || institution.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid actor or institution ID.");
            }

            Project project = new Project();

            project.setProjectName(projectDTO.getProjectName());
            project.setStartTime(LocalDateTime.now());
            project.setAttachment(projectDTO.getAttachment());
            project.setState(State.pending);

            project.setInstitution(institution.get());
            project.setActor(actor.get());

            projectRepository.save(project);
            return new ResponseEntity<>("Project successfully added!", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error adding Project: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Get Projects inside of Institution
    @GetMapping("/institution/{institutionID}")
    public ResponseEntity<List<ProjectDTO>> getProjectsByInstitution(@PathVariable Integer institutionID) {
        List<ProjectDTO> projects = projectService.getProjectsByInstitution(institutionID);
        return ResponseEntity.ok(projects);
    }

    // Get Projects Actor is inside of
    @GetMapping("/actor/{actorID}")
    public ResponseEntity<List<ProjectDTO>> getProjectsByActor(@PathVariable Integer actorID) {
        List<ProjectDTO> projects = projectService.getProjectsByActor(actorID);
        return ResponseEntity.ok(projects);
    }

    // Get Projects that Actor created
    @GetMapping("/actor/created/{actorID}")
    public ResponseEntity<List<ProjectDTO>> getProjectsByOwner(@PathVariable Integer actorID) {
        List<ProjectDTO> projects = projectService.getProjectsByOwner(actorID);
        return ResponseEntity.ok(projects);
    }

    // Change project state
    @PutMapping("/change/{id}")
    public ResponseEntity<String> changeProjectState(@PathVariable Integer id, @RequestBody State newState) {
        try {
            Optional<Project> projectOpt = projectRepository.findById(id);

            if (projectOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Project not found.");
            }

            Project project = projectOpt.get();

            if(project.getState() == newState){
                return ResponseEntity.status(HttpStatus.OK).body("The project is already in the requested state.");


            } else if (newState == State.pending) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Project can not be changed to pending.");
            } else if (project.getState() != State.pending && newState == State.rejected) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Only pending project can be changed to rejected.");
            } else if (project.getState() != State.active && newState == State.closed) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Only active project can be changed to closed.");
            }


            project.setState(newState);  // Postavljanje novog stanja projekta

            Actor actor = project.getActor(); // actor that created the project
            if(newState == State.active) {
                // saving in joins_project
                actor.getProjects().add(project); // adding project to the actor
                actorRepository.save(actor);
                project.getActors().add(actor);  // adding actor to the project
                projectRepository.save(project);
            }

            if(newState == State.closed){

                for (Actor act : project.getActors()) {
                    act.getProjects().remove(project);  // removing project from actor's set of projects
                    actorRepository.save(act);  // saving
                }
                project.getActors().clear(); //removing all actors that were on the project
                projectRepository.save(project);
            }
            else projectRepository.save(project);  // Spremanje promjena u bazu



            return ResponseEntity.ok("Project state successfully updated!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error updating project state: " + e.getMessage());
        }
    }

    // Get all projects
    @GetMapping("/")
    public ResponseEntity<List<ProjectDTO>> getAllProjects() {
        List<ProjectDTO> projects = projectService.getProjects();
        return ResponseEntity.ok(projects);
    }

    // Get project by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getProject(@PathVariable Integer id) {
        ProjectDTO projectDTO = projectService.getProject(id);

        if (projectDTO == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Project not found.");
        }
        return ResponseEntity.ok(projectDTO);
    }

    @GetMapping("/{actorID}/inside/{institutionID}")
    public ResponseEntity<?> getProjectsByActorInsideInstitution(@PathVariable Integer actorID, @PathVariable Integer institutionID) {

        List<ProjectDTO> projects = projectService.getProjectsByActorAndInstitution(actorID, institutionID);

        if (projects.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Project not found.");
        }

        return ResponseEntity.ok(projects);
    }


}
