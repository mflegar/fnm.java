package hr.fer.proinz.airelm.controller;

import hr.fer.proinz.airelm.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class HomeController {

    @Autowired private TokenService tokenService;

    // User info from github
    @GetMapping("/user-info")
    public Map<String, Object> user(@AuthenticationPrincipal OAuth2User principal){
        System.out.println(principal);
        return principal.getAttributes();
    }

    @GetMapping("/generate-token/{userId}")
    public ResponseEntity<String> generateToken(@PathVariable Integer userId){
        String token = tokenService.generateToken(userId);

        return ResponseEntity.ok(token);
    }

}