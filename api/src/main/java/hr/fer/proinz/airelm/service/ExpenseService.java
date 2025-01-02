package hr.fer.proinz.airelm.service;

import hr.fer.proinz.airelm.dto.ExpenseDTO;
import hr.fer.proinz.airelm.dto.NotificationDTO;
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

    public List<ExpenseDTO> getExpensesByInstitution(Integer institutionID){
        if (institutionID == null || institutionID <= 0){
            throw new IllegalArgumentException("Invalid institution ID.");
        }

        return expenseRepository.findAll().stream()
                .filter(exp -> exp.getProject().getInstitution().getInstitutionID().equals(institutionID))
                .map(exp -> new ExpenseDTO(
                        exp.getExpenseID(),
                        exp.getDescription(),
                        exp.getExpense_cost(),
                        exp.getActor().getActorID(),
                        exp.getProject().getProjectID()))
                .collect(Collectors.toList());

    }

    public List<ExpenseDTO> getExpensesByActor(Integer actorID) {
        if (actorID == null || actorID <= 0) {
            throw new IllegalArgumentException("Invalid actor ID.");
        }

        return expenseRepository.findByActor_ActorID(actorID).stream()
                .map(exp -> new ExpenseDTO(
                        exp.getExpenseID(),
                        exp.getDescription(),
                        exp.getExpense_cost(),
                        exp.getActor().getActorID(),
                        exp.getProject().getProjectID()))
                .collect(Collectors.toList());
    }

    public List<ExpenseDTO> getExpensesByProject(Integer projectID){
        if (projectID == null || projectID <= 0) {
            throw new IllegalArgumentException("Invalid project ID.");
        }

        return expenseRepository.findByProject_ProjectID(projectID).stream()
                .map(exp -> new ExpenseDTO(
                        exp.getExpenseID(),
                        exp.getDescription(),
                        exp.getExpense_cost(),
                        exp.getActor().getActorID(),
                        exp.getProject().getProjectID()))
                .collect(Collectors.toList());
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
