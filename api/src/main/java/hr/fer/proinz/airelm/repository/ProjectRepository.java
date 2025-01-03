package hr.fer.proinz.airelm.repository;

import hr.fer.proinz.airelm.entity.Actor;
import hr.fer.proinz.airelm.entity.Institution;
import hr.fer.proinz.airelm.entity.Project;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer> {
    List<Project> findByActor(Actor actor);

    List<Project> findByInstitution(Institution institution);
}
