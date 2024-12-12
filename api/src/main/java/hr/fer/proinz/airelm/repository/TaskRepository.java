package hr.fer.proinz.airelm.repository;

import hr.fer.proinz.airelm.entity.Task;
import hr.fer.proinz.airelm.entity.TaskIDUsingEmbeddable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, TaskIDUsingEmbeddable> {
    // zasad ovako
}
