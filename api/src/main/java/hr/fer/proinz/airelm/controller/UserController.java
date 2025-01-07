package hr.fer.proinz.airelm.controller;

import hr.fer.proinz.airelm.dto.ActorDTO;
import hr.fer.proinz.airelm.entity.Actor;
import hr.fer.proinz.airelm.repository.ActorRepository;
import hr.fer.proinz.airelm.service.ActorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private ActorService actorService;
    @Autowired
    private ActorRepository actorRepository;

    @PostMapping("/add")
    public ResponseEntity<String> addActor(@RequestBody Actor actor) {
        try {

            Optional<Actor> existingActor = actorRepository.findByActorEmail(actor.getActorEmail());
            if (existingActor.isPresent()) {
                return new ResponseEntity<>("Actor already exists in the database.", HttpStatus.ACCEPTED);
            }

            actorService.saveActor(actor);
            return new ResponseEntity<>("Actor successfully added!", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error adding actor: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getActor(@PathVariable Integer id) {
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

    @GetMapping("/getuserbyusername/{username}")
    public ResponseEntity<?> getActorByUsername(@PathVariable String username) {
        try {
            ActorDTO actorDTO = actorService.getActorByUsername(username);
            return ResponseEntity.ok(actorDTO);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    Map.of("error", "Actor not found", "username", username));  // create response entity with status 404 not found
        }
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteActor(@PathVariable Integer id) {
        try {
            actorService.deleteActor(id);
            return new ResponseEntity<>("Actor successfully deleted!", HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error deleting actor: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
