package hr.fer.proinz.airelm.controller;

import hr.fer.proinz.airelm.dto.TaskDTO;
import hr.fer.proinz.airelm.entity.Actor;
import hr.fer.proinz.airelm.entity.Project;
import hr.fer.proinz.airelm.entity.Task;
import hr.fer.proinz.airelm.repository.ActorRepository;
import hr.fer.proinz.airelm.repository.ProjectRepository;
import hr.fer.proinz.airelm.service.MailService;
import hr.fer.proinz.airelm.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Files;
import java.util.List;

@RestController
@RequestMapping("/task")
public class TaskController {
    @Autowired
    private ActorRepository actorRepository;
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private TaskService taskService;
    @Autowired
    private MailService mailService;

    @PostMapping("/add")
    public ResponseEntity<String> addTask(@RequestBody TaskDTO taskDTO) {
        try {
            Actor actor = actorRepository.findById(taskDTO.getActorID()).orElse(null);

            if (actor == null) {
                return ResponseEntity.badRequest().body("Actor not found.");
            }
            Project project = projectRepository.findById(taskDTO.getProjectID()).orElse(null);
            if (project == null) {
                return ResponseEntity.badRequest().body("Project not found.");
            }
            if (!project.getActors().contains(actor)) {   //check if actor is assigned to the project
                return ResponseEntity.badRequest().body("Actor is not assigned to this project.");
            }
            Task task = new Task();
            task.setActor(actor);
            task.setTaskName(taskDTO.getTaskName());
            task.setDescription(taskDTO.getDescription());
            task.setProject(project);

            taskService.saveTask(task);
            String mailString = Files.readString(new ClassPathResource("mail/taskmail.html").getFile().toPath());
            mailService.sendHTMLMail(actor.getActorEmail(), "Next task assigned to you!",
                    String.format(mailString, actor.getActorUsername(), task.getProject().getProjectName(), task.getDescription()));

            return new ResponseEntity<>("Task successfully added!", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error adding task: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/actor/{actorID}")
    public ResponseEntity<List<TaskDTO>> getTasksByActor(@PathVariable Integer actorID) {
        List<TaskDTO> tasks = taskService.getTasksByActor(actorID);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/project/{projectID}")
    public ResponseEntity<List<TaskDTO>> getTasksByProject(@PathVariable Integer projectID) {
        List<TaskDTO> tasks = taskService.getTasksByProject(projectID);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/")
    public ResponseEntity<List<TaskDTO>> getAllTasks() {
        List<TaskDTO> tasks = taskService.getTasks();
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTask(@PathVariable Integer id) {
        TaskDTO task = taskService.getTask(id);

        if (task == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Task not found.");
        }
        return ResponseEntity.ok(task);
    }

    @PutMapping("/change/{id}")
    public ResponseEntity<String> changeTaskDescription(@PathVariable Integer id, @RequestBody String description) {
        try {
            taskService.changeTaskDescription(id, description);
            return ResponseEntity.ok("Task description successfully updated!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error updating task description: " + e.getMessage());
        }
    }

    @GetMapping("/{actorID}/inside/{projectID}")
    public ResponseEntity<?> getTasksByActorInsideProject(@PathVariable Integer actorID, @PathVariable Integer projectID) {
        List<TaskDTO> tasks = taskService.getTasksByActorAndProject(actorID, projectID);
        return ResponseEntity.ok(tasks);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable Integer id) {
        try {
            taskService.deleteTask(id);
            return new ResponseEntity<>("Task successfully deleted!", HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error deleting task: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<?> getTaskByName(@PathVariable String name){
        TaskDTO taskDTO = taskService.getTaskByTaskName(name);
        if (taskDTO == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Task not found.");
        return ResponseEntity.ok(taskDTO);
    }
}
