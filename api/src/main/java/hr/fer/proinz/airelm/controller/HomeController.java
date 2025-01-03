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
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class HomeController {

    @Autowired private TokenService tokenService;
    @Autowired private ActorRepository actorRepository;

    @GetMapping("/user-info")
    public ResponseEntity<Map<String, Object>> userInfo(@AuthenticationPrincipal OAuth2User principal) {

        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "User is not authenticated"));
        }

        // Get email and username from principal
        String email = (String) principal.getAttributes().get("email");
        String username = (String) principal.getAttributes().get("login");

        // Provjeri postoji li korisnik u bazi
        Actor actor = actorRepository.findByActorEmail(email)
                .orElse(null);

        if (actor == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "User not found in database"));
        }

        // Generiraj token za korisnika
        String token = tokenService.generateToken(actor.getActorID());

        // Pripremi podatke za odgovor
        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("id", actor.getActorID()); // ID korisnika iz baze
        userInfo.put("email", actor.getActorEmail()); // Email korisnika
        userInfo.put("username", actor.getActorUsername()); // Username korisnika
        userInfo.put("token", token); // Generirani token

        return ResponseEntity.ok(userInfo); // Send id,username,email,token to frontend
    }

    @GetMapping("/generate-token/{userId}")
    public ResponseEntity<String> generateToken(@PathVariable Integer userId){
        String token = tokenService.generateToken(userId);

        return ResponseEntity.ok(token);
    }

}
