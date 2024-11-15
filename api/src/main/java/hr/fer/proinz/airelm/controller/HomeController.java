package hr.fer.proinz.airelm.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5780") // Ovo ne radi nazalost
public class HomeController {

    @GetMapping("/") // Pocetna ruta
    public String greet(){
        return "Welcome to the page";
    }

    @GetMapping("/login2") // Ruta /login2
    public String login(@AuthenticationPrincipal OAuth2User principal){
        // Dobivamo podatke korisnika koje je GitHub poslao
        Map<String, Object> attributes = principal.getAttributes();

        // Ispisivanje korisničkih podataka kao string
        return "GitHub User Info: " + attributes.toString();
    }
}