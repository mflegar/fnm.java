package hr.fer.proinz.airelm.repository;


import hr.fer.proinz.airelm.entity.Institution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InstitutionRepository extends JpaRepository<Institution, Integer> {
    Optional<Institution> findByInstitutionName(String name);
    List<Institution> findByOwner_ActorID(Integer ownerID);
    List<Institution> findByActors_ActorID(Integer actorID);
}
