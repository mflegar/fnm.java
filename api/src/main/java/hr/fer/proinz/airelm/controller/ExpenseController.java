package hr.fer.proinz.airelm.controller;

import hr.fer.proinz.airelm.dto.ExpenseDTO;
import hr.fer.proinz.airelm.dto.InstitutionDTO;
import hr.fer.proinz.airelm.entity.*;
import hr.fer.proinz.airelm.repository.ActorRepository;
import hr.fer.proinz.airelm.repository.ProjectRepository;
import hr.fer.proinz.airelm.service.ExpenseService;
import hr.fer.proinz.airelm.service.InstitutionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/expense")
public class ExpenseController {
    @Autowired
    private ActorRepository actorRepository;
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private ExpenseService expenseService;
    @PostMapping("/add")
    public ResponseEntity<String> addExpense(@RequestBody ExpenseDTO expenseDTO) {
        try {
            Actor actor = actorRepository.findById(expenseDTO.getActorID()).orElse(null);

            if (actor == null) {
                return ResponseEntity.badRequest().body("Actor not found.");
            }
            Project project = projectRepository.findById(expenseDTO.getProjectID()).orElse(null);
            if (project == null){
                return ResponseEntity.badRequest().body("Project not found.");
            }
            Expense expense = new Expense();
            expense.setExpense_cost(expenseDTO.getExpense_cost());
            expense.setActor(actor);
            expense.setDescription(expenseDTO.getDescription());
            expense.setProject(project);

            expenseService.saveExpense(expense);

            return new ResponseEntity<>("Expense successfully added!", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error adding expense: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/actor/{actorID}")
    public ResponseEntity<List<ExpenseDTO>> getExpensesByActor(@PathVariable Integer actorID) {
        List<ExpenseDTO> expenses = expenseService.getExpensesByActor(actorID);
        return ResponseEntity.ok(expenses);
    }
    @GetMapping("/project/{projectID}")
    public ResponseEntity<List<ExpenseDTO>> getExpensesByProject(@PathVariable Integer projectID) {
        List<ExpenseDTO> expenses = expenseService.getExpensesByProject(projectID);
        return ResponseEntity.ok(expenses);
    }
    @GetMapping("/")
    public ResponseEntity<List<ExpenseDTO>> getAllExpenses() {
        List<ExpenseDTO> expenses = expenseService.getExpenses();
        return ResponseEntity.ok(expenses);
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getExpense(@PathVariable Integer id) {
        ExpenseDTO expenseDTO = expenseService.getExpense(id);

        if (expenseDTO == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Expense not found.");
        }
        return ResponseEntity.ok(expenseDTO);
    }
    /*@PutMapping("/change/{id}")
    public ResponseEntity<String> changeExpenseCost(@PathVariable Integer id, @RequestBody Integer cost) {
        try {
            expenseService.changeExpenseCost(id, cost);
            return ResponseEntity.ok("Expense cost successfully updated!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error updating project state: " + e.getMessage());
        }
    }*/
}
