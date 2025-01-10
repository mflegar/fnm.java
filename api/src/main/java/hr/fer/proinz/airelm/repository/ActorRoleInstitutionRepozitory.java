package hr.fer.proinz.airelm.repository;

import hr.fer.proinz.airelm.entity.Actor;
import hr.fer.proinz.airelm.entity.ActorRoleInstitution;
import hr.fer.proinz.airelm.entity.Institution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActorRoleInstitutionRepozitory extends JpaRepository<ActorRoleInstitution, Integer>{
    ActorRoleInstitution findByActorAndInstitution(Actor actor, Institution institution);
}
