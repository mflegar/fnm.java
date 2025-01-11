package hr.fer.proinz.airelm.controller;

import hr.fer.proinz.airelm.dto.ProjectDTO;
import hr.fer.proinz.airelm.entity.*;
import hr.fer.proinz.airelm.repository.*;
import hr.fer.proinz.airelm.service.MailService;
import hr.fer.proinz.airelm.service.ProjectService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("project")
public class ProjectController {
    @Autowired
    private Environment env;
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
    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private ExpenseRepository expenseRepository;

    // Add project
    @PostMapping("/add")
    public ResponseEntity<String> addProject(@RequestBody ProjectDTO projectDTO) {
        try {
            Optional<Actor> actorOptional = actorRepository.findById(projectDTO.getActorID());
            Optional<Institution> institutionOptional = institutionRepository.findById(projectDTO.getInstitutionID());

            if (actorOptional.isEmpty()) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid actorID.");
            Actor actor = actorOptional.get();
            if (institutionOptional.isEmpty())
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid institution ID.");
            Institution institution = institutionOptional.get();

            if (!institution.getActors().contains(actor)) {   //check if actor is in this institution
                return ResponseEntity.badRequest().body("Actor is not in this institution.");
            }
            State state = State.pending;
            if (institution.getOwner().equals(actor)) state = State.active;

            Project project = new Project();

            project.setProjectName(projectDTO.getProjectName());
            project.setStartTime(LocalDateTime.now());
            project.setAttachment(projectDTO.getAttachment());
            project.setState(state);

            project.setInstitution(institution);
            project.setActor(actor);
            projectRepository.save(project);

            if (institution.getOwner().equals(actor))
                return new ResponseEntity<>("Project successfully added!", HttpStatus.CREATED); // only temporarily

            String mailString = Files.readString(new ClassPathResource("mail/projectidea.html").getFile().toPath());
            mailService.sendHTMLMail(institution.getOwner().getActorEmail(), "Project suggestion!",
                    String.format(mailString, institution.getOwner().getActorUsername(),
                            actor.getActorUsername(), project.getProjectName(), project.getAttachment(),
                            String.format("%sprojectRequest?projectID=%s",
                                    env.getProperty("spring.application.url"), project.getProjectID())));

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

            if (project.getState() == newState) {
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
            if (newState == State.active) {
                // saving in joins_project
                actor.getProjects().add(project); // adding project to the actor
                actorRepository.save(actor);
                project.getActors().add(actor);  // adding actor to the project
                projectRepository.save(project);
                String mailString = Files.readString(new ClassPathResource("mail/projectaccepted.html").getFile().toPath());
                mailService.sendHTMLMail(project.getActor().getActorEmail(), "Project accepted!",
                        String.format(mailString, actor.getActorUsername(), project.getProjectName()));
            } else if (newState == State.rejected) {
                projectRepository.save(project);
                String mailString = Files.readString(new ClassPathResource("mail/projectrejected.html").getFile().toPath());
                mailService.sendHTMLMail(project.getActor().getActorEmail(), "Project rejected!",
                        String.format(mailString, actor.getActorUsername(), project.getProjectName()));
            }

            if (newState == State.closed) {

                for (Actor act : project.getActors()) {
                    act.getProjects().remove(project);  // removing project from actor's set of projects
                    actorRepository.save(act);  // saving
                }
                project.getActors().clear(); //removing all actors that were on the project


                for (Task task : project.getTasks()) {
                    taskRepository.delete(task);
                }
                project.getTasks().clear();


                projectRepository.save(project);
            } else projectRepository.save(project);  // Spremanje promjena u bazu
            return ResponseEntity.ok("Project state successfully updated!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error updating project state: " + e.getMessage());
        }
    }

    @PostMapping("/requestJoin/{projectID}")
    public ResponseEntity<String> requestJoinProject(@PathVariable Integer projectID, @RequestBody Integer actorID) throws IOException {
        Actor actor = actorRepository.findByActorID(actorID);
        if (actor == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Actor not found!");
        }
        Project project = projectRepository.findById(projectID).orElse(null);
        if (project == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Project not found!");
        }
        String mailString = Files.readString(new ClassPathResource("mail/projectjoinmail.html").getFile().toPath());
        mailService.sendHTMLMail(actor.getActorEmail(), "Request to join project",
                String.format(mailString, project.getActor().getActorUsername(), actor.getActorUsername(), project.getProjectName(),
                        String.format(env.getProperty("spring.application.url") + "userRequest?projectID=%s&actorID=%s",
                                projectID, actorID)));
        return ResponseEntity.status(HttpStatus.OK).body("Project application successfully sent!");
    }

    @PostMapping("acceptActor")
    public ResponseEntity<String> acceptActor(@RequestParam("projectID") Integer projectID,
                                              @RequestParam("actorID") Integer actorID,
                                              @RequestParam("accepted") Boolean accepted) throws IOException {
        Project project = projectRepository.findById(projectID).orElse(null);
        Actor actor = actorRepository.findById(actorID).orElse(null);
        if (project == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Project not found.");
        }
        if (actor == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Actor not found.");
        }
        if (accepted) {
            actor.getProjects().add(project); // adding project to the actor
            actorRepository.save(actor);
            project.getActors().add(actor);  // adding actor to the project
            projectRepository.save(project);
            String mailString = Files.readString(new ClassPathResource("mail/useraccepted.html").getFile().toPath());
            mailService.sendHTMLMail(actor.getActorEmail(), "Application accepted!",
                    String.format(mailString, actor.getActorUsername(), project.getProjectName(), project.getAttachment()));
        } else {
            String mailString = Files.readString(new ClassPathResource("mail/userrejected.html").getFile().toPath());
            mailService.sendHTMLMail(actor.getActorEmail(), "Application rejected.",
                    String.format(mailString, actor.getActorUsername(), project.getProjectName()));
        }
        return ResponseEntity.status(HttpStatus.OK).body("Join request successfully updated.");
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

    //get all project of certain actor in certain institution
    @GetMapping("/{actorID}/inside/{institutionID}")
    public ResponseEntity<?> getProjectsByActorInsideInstitution(@PathVariable Integer actorID, @PathVariable Integer institutionID) {

        List<ProjectDTO> projects = projectService.getProjectsByActorAndInstitution(actorID, institutionID);

        if (projects.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Project not found.");
        }

        return ResponseEntity.ok(projects);
    }

    @Transactional
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProject(@PathVariable Integer id) {
        try {
            Optional<Project> projectOpt = projectRepository.findById(id);
            if (projectOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Project not found.");
            }

            Project project = projectOpt.get();

            for (Task task : project.getTasks()) {
                taskRepository.deleteById(task.getTaskID());
                project.getTasks().clear();
            }

            projectRepository.deleteById(id);

            return ResponseEntity.ok("Project and associated tasks and expenses deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error deleting project: " + e.getMessage());
        }
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<ProjectDTO> getInstitutionByName(@PathVariable String name) {
        return ResponseEntity.ok(projectService.getProjectByName(name));
    }

}
