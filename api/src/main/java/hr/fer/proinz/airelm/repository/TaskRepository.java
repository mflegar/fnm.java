package hr.fer.proinz.airelm.repository;

import hr.fer.proinz.airelm.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {
    List<Task> findByActor_ActorID(Integer actorID);
    List<Task> findByProject_ProjectID(Integer projectID);
}
