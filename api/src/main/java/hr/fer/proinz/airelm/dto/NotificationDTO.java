package hr.fer.proinz.airelm.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NotificationDTO {
    private Integer notificationID; // Auto-increment
    private LocalDateTime createdAt; // Generiramo na backendu LocalDateTime.now()

    private Integer actorID; // ID aktora koji kreira notification

    private Integer institutionID; // ID institucije za koju je primjenjen notification

}
