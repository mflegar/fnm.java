package hr.fer.proinz.airelm.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import hr.fer.proinz.airelm.entity.State;
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

    @JsonProperty("institution")
    private Integer institutionID;

    @JsonProperty("actor")
    private Integer actorID;

    @JsonProperty("state")
    private State state;

}
