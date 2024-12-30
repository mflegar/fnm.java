package hr.fer.proinz.airelm.repository;

import hr.fer.proinz.airelm.entity.Expense;
import hr.fer.proinz.airelm.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Integer> {
    List<Expense> findByActor_ActorID(Integer actorID);
    List<Expense> findByProject_ProjectID(Integer projectID);
}
