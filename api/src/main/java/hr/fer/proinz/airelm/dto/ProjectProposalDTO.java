package hr.fer.proinz.airelm.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectProposalDTO {
    private Integer proposalID;
    private String title;
    private String description;
    private Long actorID;
    private Integer institutionID;
}
