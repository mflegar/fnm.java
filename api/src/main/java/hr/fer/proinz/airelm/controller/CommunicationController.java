package hr.fer.proinz.airelm.controller;

import hr.fer.proinz.airelm.entity.Institution;
import hr.fer.proinz.airelm.repository.InstitutionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.Map;

@Controller
public class CommunicationController {

    private final SimpMessagingTemplate messagingTemplate;

    @Autowired private InstitutionRepository institutionRepository;

    public CommunicationController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/join/{institutionID}")
    public Map<String, String> handleJoinRequest(
            @DestinationVariable String institutionID,
            Map<String, String> joinRequest
    ) {
        // Log poruke za pracenje
        String userID = joinRequest.get("userID");
        System.out.println("Researcher " + userID + " wants to join your institution " + institutionID);

        // Saznaj ownerID
        Integer institutionIdInt = Integer.valueOf(institutionID);

        Institution institution = institutionRepository.findById(institutionIdInt).orElse(null);

        if (institution == null) {
            System.out.println("Institution not found.");
            return Map.of("message", "Institution not found.");
        }

        Integer ownerID = institution.getOwner().getActorID();

        System.out.println(ownerID);

        // Dinamičko slanje poruke Institution Manageru (ownerID)
        messagingTemplate.convertAndSend(
                "/topic/join/" + ownerID, // Dinamička destinacija
                Map.of(
                        "message", "Researcher " + userID + " wants to join your institution.",
                        "userID", userID,
                        "institutionID", institutionID
                )
        );

        return Map.of("message", "Request sent to Institution Manager.");
    }
}
