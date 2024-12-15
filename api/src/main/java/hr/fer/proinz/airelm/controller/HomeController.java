package hr.fer.proinz.airelm.controller;

import hr.fer.proinz.airelm.dto.ActorDTO;
import hr.fer.proinz.airelm.entity.Actor;
import hr.fer.proinz.airelm.service.ActorService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.w3c.dom.stylesheets.LinkStyle;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class HomeController {
    @Autowired
    private ActorService actorService;

    @PostMapping("/")
    public String greet2(){ return "Welcome lmaooo"; }

    // User info from github
    @GetMapping("/user-info")
    public Map<String, Object> user(@AuthenticationPrincipal OAuth2User principal){
        System.out.println(principal);
        return principal.getAttributes();
    }

    @PostMapping("/lol")
    public Map<String, String> greet3(@RequestBody Map<String, String> userData) {
        System.out.println("Received user data: " + userData);
        Long id = Long.parseLong(userData.get("id"));  // Assuming the id is a string and needs to be parsed
        String name = userData.get("name");
        String surname = userData.get("surname");
        String email = userData.get("email");
        String role = userData.get("role");
        Actor newActor = new Actor();
        newActor.setActorID(id);
        newActor.setActorEmail(email);
        newActor.setActorSurname(surname);
        newActor.setActorRole(role);
        newActor.setActorName(name);
        actorService.saveActor(newActor);

        return Map.of("message", "Welcome lmaoo", "status", "Success");
    }
    @GetMapping("users")
    public List<ActorDTO> getAllUsers() {
        return actorService.getActors();
    }
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpSession session) {
        session.invalidate(); // Završava sesiju
        return ResponseEntity.ok().build();
    }
    



}
