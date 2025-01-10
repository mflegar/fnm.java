package hr.fer.proinz.airelm.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InstitutionDTO {
    private Integer institutionID;
    @JsonProperty("name")
    private String institutionName;
    @JsonProperty("link")
    private String institutionLink;
    private Integer ownerID; // ID ownera (Actor)
}
