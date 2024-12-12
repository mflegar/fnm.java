package hr.fer.proinz.airelm.service;

import hr.fer.proinz.airelm.dto.ExpenseDTO;
import hr.fer.proinz.airelm.entity.Expense;
import hr.fer.proinz.airelm.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExpenseService {

    @Autowired private ExpenseRepository expenseRepository;


    public List<ExpenseDTO> getExpenses() {
        return expenseRepository.findAll().stream()
                .map(exp -> new ExpenseDTO(
                        exp.getExpenseID(),
                        exp.getDescription(),
                        exp.getExpense_cost(),
                        exp.getActor().getActorID(),
                        exp.getProject().getProjectID()))
                .collect(Collectors.toList());
    }

    public Expense saveExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    public ExpenseDTO getExpense(Integer id) {
        Expense exp = expenseRepository.findById(id).orElse(null);
        if (exp == null) return null;

        return new ExpenseDTO(
                exp.getExpenseID(),
                exp.getDescription(),
                exp.getExpense_cost(),
                exp.getActor().getActorID(),
                exp.getProject().getProjectID());
    }

    public void deleteExpense(Integer id){
        expenseRepository.deleteById(id);
    }

}
