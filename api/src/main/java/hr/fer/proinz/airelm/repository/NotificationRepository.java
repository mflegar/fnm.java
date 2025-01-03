package hr.fer.proinz.airelm.repository;

import hr.fer.proinz.airelm.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Integer> {
    List<Notification> findByActor_ActorID(Integer actorID);
    List<Notification> findByInstitution_InstitutionID(Integer institutionID);
}
