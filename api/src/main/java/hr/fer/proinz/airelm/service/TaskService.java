package hr.fer.proinz.airelm.service;

import hr.fer.proinz.airelm.dto.TaskDTO;
import hr.fer.proinz.airelm.entity.Task;
import hr.fer.proinz.airelm.entity.TaskIDUsingEmbeddable;
import hr.fer.proinz.airelm.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {

    @Autowired private TaskRepository taskRepository;

    public List<TaskDTO> getTasks() {
        return taskRepository.findAll().stream()
                .map(task -> new TaskDTO(
                        task.getId().getTaskID(),
                        task.getProject().getProjectID(),
                        task.getDescription(),
                        task.getActor().getActorID()
                ))
                .collect(Collectors.toList());
    }

    public TaskDTO getTask(Integer taskID, Integer projectID) {
        Task task = taskRepository.findById(new TaskIDUsingEmbeddable(taskID, projectID)).orElse(null);
        if (task == null) return null;

        return new TaskDTO(
                task.getId().getTaskID(),
                task.getId().getProjectID(),
                task.getDescription(),
                task.getActor().getActorID()
        );
    }

    public boolean deleteTask(Integer taskID, Integer projectID) {
        TaskIDUsingEmbeddable id = new TaskIDUsingEmbeddable(taskID, projectID);
        if (taskRepository.existsById(id)) {
            taskRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Task saveTask(Task task) {
        return taskRepository.save(task);
    }

}
