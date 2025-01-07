package hr.fer.proinz.airelm.controller;

import hr.fer.proinz.airelm.dto.ProjectDTO;
import hr.fer.proinz.airelm.entity.Actor;
import hr.fer.proinz.airelm.entity.Institution;
import hr.fer.proinz.airelm.entity.Project;
import hr.fer.proinz.airelm.entity.State;
import hr.fer.proinz.airelm.repository.ActorRepository;
import hr.fer.proinz.airelm.repository.InstitutionRepository;
import hr.fer.proinz.airelm.repository.ProjectRepository;
import hr.fer.proinz.airelm.service.MailService;
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
    private MailService mailService;
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

            mailService.sendMail(institution.get().getOwner().getActorEmail(), "Project suggestion",
                    String.format("Researcher %s has suggested a new project idea!\nProject name: %s\nProject description: %s",
                            actor.get().getActorUsername(), project.getProjectName(), project.getAttachment()));

            return new ResponseEntity<>("Project successfully added!", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error adding Project: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Get Projects inside of a Institution
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
            project.setState(newState);  // Postavljanje novog stanja projekta

            projectRepository.save(project);  // Spremanje promjena u bazu
            if (newState == State.active){
                mailService.sendMail(project.getActor().getActorEmail(), "Project accepted!",
                        String.format("Project %s has been accepted by the institution!", project.getProjectName()));
            }
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

}
