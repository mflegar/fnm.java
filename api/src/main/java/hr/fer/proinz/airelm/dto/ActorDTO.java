package hr.fer.proinz.airelm.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ActorDTO {
    private Long actorID;
    private String actorEmail;
    private String actorName;
    private String actorSurname;
    private String actorRole;
}
