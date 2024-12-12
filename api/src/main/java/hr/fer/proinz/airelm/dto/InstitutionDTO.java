package hr.fer.proinz.airelm.dto;

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
    private String institutionName;
    private String institutionLink;
    private Long ownerID; // ID ownera (Actor)
}
