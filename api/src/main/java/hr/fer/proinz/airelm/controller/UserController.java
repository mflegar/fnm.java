package hr.fer.proinz.airelm.controller;

import hr.fer.proinz.airelm.dto.ActorDTO;
import hr.fer.proinz.airelm.entity.Actor;
import hr.fer.proinz.airelm.service.ActorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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

    @GetMapping("/{id}")
    public ResponseEntity<?> getActor(@PathVariable Long id) {
        ActorDTO actorDTO = actorService.getActor(id);

        if (actorDTO != null) {
            return ResponseEntity.ok(actorDTO);
        } else {
            // Kreiraj odgovor koji sadrži informacije o grešci
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    Map.of("error", "Actor not found", "id", id)
            );
        }
    }

}
