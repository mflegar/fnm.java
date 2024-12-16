package hr.fer.proinz.airelm.controller;

import hr.fer.proinz.airelm.dto.ActorDTO;
import hr.fer.proinz.airelm.entity.Actor;
import hr.fer.proinz.airelm.service.ActorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired private ActorService actorService;

    @PostMapping("/add")
    public ResponseEntity<String> addActor(@RequestBody Actor actor) {
        try {
            actorService.saveActor(actor);
            return new ResponseEntity<>("Actor successfully added!", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error adding actor: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
