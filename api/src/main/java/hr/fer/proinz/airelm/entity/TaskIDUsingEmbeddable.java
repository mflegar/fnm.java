package hr.fer.proinz.airelm.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class TaskIDUsingEmbeddable implements Serializable {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "task_id")
    private Integer taskID;

    @Column(name = "project_id")
    private Integer projectID;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TaskIDUsingEmbeddable that = (TaskIDUsingEmbeddable) o;
        return taskID.equals(that.taskID) && projectID.equals(that.projectID);
    }

    @Override
    public int hashCode() {
        return taskID.hashCode() + projectID.hashCode();
    }
}
