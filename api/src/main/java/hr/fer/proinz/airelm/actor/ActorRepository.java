package hr.fer.proinz.airelm.actor;

import org.springframework.data.repository.CrudRepository;

import java.util.List;


public interface ActorRepository extends CrudRepository<Actor, Integer> {
    List<Actor> findByActorSurname(String actorSurname);
    Actor findByActorID(int actorID);
}
