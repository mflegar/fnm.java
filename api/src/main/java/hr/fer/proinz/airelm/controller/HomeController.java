package hr.fer.proinz.airelm.controller;

import hr.fer.proinz.airelm.entity.Actor;
import hr.fer.proinz.airelm.repository.ActorRepository;
import hr.fer.proinz.airelm.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class HomeController {

    @Autowired
    private TokenService tokenService;
    @Autowired
    private ActorRepository actorRepository;

    @GetMapping("validate-token")
    public ResponseEntity<Boolean> validateToken(@RequestHeader("Authorization") String authorization){
        return ResponseEntity.ok(tokenService.validateToken(authorization.split(" ")[1]));
    }

    @GetMapping("/user-info")
    public ResponseEntity<Map<String, Object>> userInfo(@AuthenticationPrincipal OAuth2User principal) {

        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "User is not authenticated"));
        }

        String username = (String) principal.getAttributes().get("login");

        // Check if the user exists in the database
        Actor actor = actorRepository.findByActorUsername(username)
                .orElse(null);

        if (actor == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "User not found in database"));
        }

        // Generate token for the user
        String token = tokenService.generateToken(actor.getActorID());

        // Send data to the frontend
        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("id", actor.getActorID());
        userInfo.put("email", actor.getActorEmail());
        userInfo.put("username", actor.getActorUsername());
        userInfo.put("token", token);

        return ResponseEntity.ok(userInfo); // Send id,username,email,token to frontend
    }

    @GetMapping("/generate-token/{userId}")
    public ResponseEntity<String> generateToken(@PathVariable Integer userId) {
        String token = tokenService.generateToken(userId);

        return ResponseEntity.ok(token);
    }

}
