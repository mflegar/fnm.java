package hr.fer.proinz.airelm.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import hr.fer.proinz.airelm.entity.State;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDTO {
    private Integer projectID;

    @JsonProperty("name")
    private String projectName;
    @JsonProperty("start")
    private LocalDateTime startTime;
    @JsonProperty("attachment")
    private String attachment;
    private Integer institutionID;
    private Integer actorID;
    private State state;

}
