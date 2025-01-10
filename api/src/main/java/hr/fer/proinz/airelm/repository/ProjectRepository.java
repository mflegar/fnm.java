package hr.fer.proinz.airelm.repository;

import hr.fer.proinz.airelm.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer> {
    List<Project> findByActor_ActorID(Integer actorID);

    List<Project> findByActors_ActorID(Integer actorID);

    List<Project> findByInstitution_InstitutionID(Integer institutionID);

    Optional<Project> findByProjectName(String name);
}
