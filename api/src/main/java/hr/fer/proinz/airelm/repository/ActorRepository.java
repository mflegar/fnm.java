package hr.fer.proinz.airelm.repository;

import hr.fer.proinz.airelm.entity.Actor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ActorRepository extends JpaRepository<Actor, Integer> {
    Actor findByActorID(Integer actorID);

    Optional<Actor> findByActorEmail(String email);

    Optional<Actor> findByActorUsername(String username);
}
