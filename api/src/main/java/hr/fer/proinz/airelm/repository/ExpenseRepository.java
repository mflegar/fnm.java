package hr.fer.proinz.airelm.repository;

import hr.fer.proinz.airelm.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Integer> {
    List<Expense> findByActor_ActorID(Integer actorID);

    List<Expense> findByProject_ProjectID(Integer projectID);

    List<Expense> findByProject_Institution_InstitutionID(Integer institutionID);
}
