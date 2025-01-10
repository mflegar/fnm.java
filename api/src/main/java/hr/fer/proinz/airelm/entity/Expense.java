package hr.fer.proinz.airelm.entity;


import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Expense")
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "expense_id")
    private Integer expenseID;

    @Column(name = "description", nullable = false)
    @JsonProperty("description")
    private String description;

    @JsonProperty("expense")
    @Column(name = "expense_cost", nullable = false)
    private Integer expense_cost;

    @ManyToOne
    @JoinColumn(name = "actor_id", nullable = false)
    private Actor actor;

    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

}
