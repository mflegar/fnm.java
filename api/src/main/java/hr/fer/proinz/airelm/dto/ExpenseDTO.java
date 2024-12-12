package hr.fer.proinz.airelm.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseDTO {
    private Integer expenseID;
    private String description;
    private Integer expense_cost;
    private Long actorID;
    private Integer projectID;
}
