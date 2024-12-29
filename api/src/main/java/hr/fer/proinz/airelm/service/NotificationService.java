package hr.fer.proinz.airelm.service;

import hr.fer.proinz.airelm.dto.NotificationDTO;
import hr.fer.proinz.airelm.entity.Notification;
import hr.fer.proinz.airelm.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificationService {

    @Autowired private NotificationRepository notificationRepository;

    public List<NotificationDTO> getNotifications() {
        return notificationRepository.findAll().stream()
                .map(notif -> new NotificationDTO(
                        notif.getNotificationID(),
                        notif.getCreatedAt(),
                        notif.getActor().getActorID(),
                        notif.getInstitution().getInstitutionID()))
                .collect(Collectors.toList());
    }

    public Notification saveNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

    public List<NotificationDTO> getNotificationsByActor(Integer actorID) {
        if (actorID == null || actorID <= 0) {
            throw new IllegalArgumentException("Invalid Actor ID.");
        }

        return notificationRepository.findByActor_ActorID(actorID).stream()
                .map(notif -> new NotificationDTO(
                        notif.getNotificationID(),
                        notif.getCreatedAt(),
                        notif.getActor().getActorID(),
                        notif.getInstitution().getInstitutionID()))
                .collect(Collectors.toList());
    }

    public List<NotificationDTO> getNotificationsByInstitution(Integer institutionID){
        if (institutionID == null || institutionID <= 0) {
            throw new IllegalArgumentException("Invalid institution ID.");
        }

        return notificationRepository.findByInstitution_InstitutionID(institutionID).stream()
                .map(notif -> new NotificationDTO(
                        notif.getNotificationID(),
                        notif.getCreatedAt(),
                        notif.getActor().getActorID(),
                        notif.getInstitution().getInstitutionID()
                ))
                .collect(Collectors.toList());

    }

    public NotificationDTO getNotification(Integer id) {
        Notification notification = notificationRepository.findById(id).orElse(null);
        if (notification == null) return null;

        return new NotificationDTO(
                notification.getNotificationID(),
                notification.getCreatedAt(),
                notification.getActor().getActorID(),
                notification.getInstitution().getInstitutionID());
    }

    public void deleteNotification(Integer id) {
        notificationRepository.deleteById(id);
    }

}