package hr.fer.proinz.airelm.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TaskDTO {
    private Integer taskID;        // Part of composite primary key
    private Integer projectID;     // Part of composite primary key
    private String description;    // Task description
    private Long actorID;       // Referencing Actor entity
}