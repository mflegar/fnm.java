package hr.fer.proinz.airelm.entity;

import jakarta.persistence.*;
import lombok.*;
import net.minidev.json.annotate.JsonIgnore;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Task")
public class Task {

    @EmbeddedId
    private TaskIDUsingEmbeddable id;

    @Column(name = "description", nullable = false)
    private String description;


    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "actor_id", nullable = false)
    private Actor actor;

    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false, insertable = false, updatable = false)
    private Project project;

}
