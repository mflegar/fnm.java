package hr.fer.proinz.airelm.repository;

import hr.fer.proinz.airelm.entity.Actor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActorRepository extends JpaRepository<Actor, Integer> {
    Actor findByActorID(Integer actorID);
    Actor findByActorEmail(String email);
}
