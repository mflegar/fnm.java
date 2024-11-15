//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package hr.fer.proinz.airelm.actor;

import java.util.List;
import org.springframework.data.repository.CrudRepository;

public interface ActorRepository extends CrudRepository<Actor, Integer> {
    List<Actor> findByActorSurname(String actorSurname);

    Actor findByActorID(int actorID);
}
