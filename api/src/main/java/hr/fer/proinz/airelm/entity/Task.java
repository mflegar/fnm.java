package hr.fer.proinz.airelm.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Task")
public class Task {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Integer taskID;

    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;
    @JsonProperty("description")
    @Column(name = "description", nullable = false)
    private String description;

    @ManyToOne
    @JoinColumn(name = "actor_id", nullable = false)
    private Actor actor;

}