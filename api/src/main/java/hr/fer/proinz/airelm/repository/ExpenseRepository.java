package hr.fer.proinz.airelm.repository;

import hr.fer.proinz.airelm.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Integer> {
    // zasad ovako
}
