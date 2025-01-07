package hr.fer.proinz.airelm.controller;

import hr.fer.proinz.airelm.dto.ExpenseDTO;
import hr.fer.proinz.airelm.dto.NotificationDTO;
import hr.fer.proinz.airelm.entity.Actor;
import hr.fer.proinz.airelm.entity.Institution;
import hr.fer.proinz.airelm.entity.Notification;
import hr.fer.proinz.airelm.repository.ActorRepository;
import hr.fer.proinz.airelm.repository.InstitutionRepository;
import hr.fer.proinz.airelm.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/notification")
public class NotificationController {
    @Autowired
    NotificationService notificationService;
    @Autowired
    private ActorRepository actorRepository;
    @Autowired
    private InstitutionRepository institutionRepository;

    //Get all notifications
    @GetMapping("/")
    public ResponseEntity<List<NotificationDTO>> getAllNotifications() {
        List<NotificationDTO> notifications = notificationService.getNotifications();
        return ResponseEntity.ok(notifications);
    }

    //get notifications by actor
    @GetMapping("/actor/{actorID}")
    public ResponseEntity<List<NotificationDTO>> getNotificationsByActor(@PathVariable Integer actorID) {
        List<NotificationDTO> notifications = notificationService.getNotificationsByActor(actorID);
        return ResponseEntity.ok(notifications);
    }

    //get notifications by institution
    @GetMapping("/institution/{institutionID}")
    public ResponseEntity<List<NotificationDTO>> getNotificationsByInstitution(@PathVariable Integer institutionID) {
        List<NotificationDTO> notifications = notificationService.getNotificationsByInstitution(institutionID);
        return ResponseEntity.ok(notifications);
    }

    //get a single notification by the id
    @GetMapping("/{id}")
    public ResponseEntity<NotificationDTO> getNotification(@PathVariable Integer id) {
        NotificationDTO notification = notificationService.getNotification(id);
        if (notification == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(notification);
    }

    //save notification
    @PostMapping("/add")
    public ResponseEntity<String> createNotification(@RequestBody NotificationDTO notificationDTO) {
        try {
            // check if there is an actor with actorId from request body
            Actor actor = actorRepository.findById(notificationDTO.getActorID()).orElse(null);
            if (actor == null) {
                return ResponseEntity.badRequest().body("Actor not found.");
            }

            // check if there is an institution with institutionId from request body
            Institution institution = institutionRepository.findById(notificationDTO.getInstitutionID()).orElse(null);
            if (institution == null) {
                return ResponseEntity.badRequest().body("Institution not found.");
            }

            // create notification with data from notificatinDTO and save it
            Notification notification = new Notification();
            notification.setCreatedAt(LocalDateTime.now()); // set time
            notification.setActor(actor);
            notification.setInstitution(institution);

            notificationService.saveNotification(notification); // save notification

            return new ResponseEntity<>("Notification successfully added!", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error adding notification: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }

    }

    //delete notification by the id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotification(@PathVariable Integer id) {
        notificationService.deleteNotification(id);
        return ResponseEntity.noContent().build();
    }
}
