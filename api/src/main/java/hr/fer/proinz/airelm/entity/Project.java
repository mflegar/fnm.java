package hr.fer.proinz.airelm.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Project")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_id")
    private Integer projectID;

    @JsonProperty("name")
    @Column(name = "project_name", nullable = false)
    private String projectName;

    @JsonProperty("start")
    @Column(name = "start_time", nullable = false)
    private java.sql.Timestamp startTime;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "proposal_id", nullable = false)
    private ProjectProposal proposal;

    @JsonIgnore
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Task> task;

    @JsonIgnore
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Expense> expenses;

}
