package hr.fer.proinz.airelm.controller;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.Map;

@Controller
public class CommunicationController {

    @MessageMapping("/join/{institutionID}")
    @SendTo("/topic/join/{institutionID}") // ovdje treba slati na ownerID
    public Map<String, String> handleJoinRequest(
            @DestinationVariable String institutionID,
            Map<String, String> joinRequest
    ) {
        // Log poruke za pracenje
        String userID = joinRequest.get("userID");
        System.out.println("Researcher " + userID + " wants to join your institution " + institutionID);

        // Vraćanje poruke Institution Manager-u
        return Map.of(
                "message", "Researcher " + userID + " wants to join your institution.",
                "userID", userID,
                "institutionID", institutionID
        );
    }
}
