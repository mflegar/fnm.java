package hr.fer.proinz.airelm.service;

import hr.fer.proinz.airelm.dto.TaskDTO;
import hr.fer.proinz.airelm.entity.Task;
import hr.fer.proinz.airelm.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public List<TaskDTO> getTasks() {
        return taskRepository.findAll().stream()
                .map(task -> new TaskDTO(
                        task.getTaskID(),
                        task.getProject().getProjectID(),
                        task.getTaskName(),
                        task.getDescription(),
                        task.getActor().getActorID()
                ))
                .collect(Collectors.toList());
    }

    public List<TaskDTO> getTasksByProject(Integer projectID) {
        return taskRepository.findByProject_ProjectID(projectID).stream().map(
                task -> new TaskDTO(
                        task.getTaskID(),
                        task.getProject().getProjectID(),
                        task.getTaskName(),
                        task.getDescription(),
                        task.getActor().getActorID()
                )).collect(Collectors.toList());
    }

    public List<TaskDTO> getTasksByActor(Integer actorID) {
        return taskRepository.findByActor_ActorID(actorID).stream().map(
                task -> new TaskDTO(
                        task.getTaskID(),
                        task.getProject().getProjectID(),
                        task.getTaskName(),
                        task.getDescription(),
                        task.getActor().getActorID()
                )).collect(Collectors.toList());
    }

    public List<TaskDTO> getTasksByActorAndProject(Integer actorID, Integer projectID) {
        return taskRepository.findByActor_ActorIDAndProject_ProjectID(actorID, projectID).stream().map(
                task -> new TaskDTO(
                        task.getTaskID(),
                        task.getProject().getProjectID(),
                        task.getTaskName(),
                        task.getDescription(),
                        task.getActor().getActorID()
                )).collect(Collectors.toList());
    }

    public TaskDTO getTask(Integer taskID) {
        Task task = taskRepository.findById(taskID).orElse(null);
        if (task == null) return null;

        return new TaskDTO(
                task.getTaskID(),
                task.getProject().getProjectID(),
                task.getTaskName(),
                task.getDescription(),
                task.getActor().getActorID()
        );
    }

    public void changeTaskDescription(Integer taskID, String description) {
        Task task = taskRepository.findById(taskID).orElse(null);
        if (task == null) {
            throw new IllegalArgumentException("Task with ID doesn't exist.");
        }
        task.setDescription(description);
        taskRepository.save(task);
    }

    public boolean deleteTask(Integer taskID) {
        if (taskRepository.existsById(taskID)) {
            taskRepository.deleteById(taskID);
            return true;
        }
        return false;
    }

    public Task saveTask(Task task) {
        return taskRepository.save(task);
    }

    public TaskDTO getTaskByTaskName(String taskName){
        Optional<Task> taskOptional = taskRepository.findByTaskName(taskName);
        if (taskOptional.isEmpty()) return null;
        Task task = taskOptional.get();
        return new TaskDTO(
                task.getTaskID(),
                task.getProject().getProjectID(),
                task.getTaskName(),
                task.getDescription(),
                task.getActor().getActorID()
        );
    }

}
