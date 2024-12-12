package hr.fer.proinz.airelm.repository;

import hr.fer.proinz.airelm.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer> {
    // ovo zasad ovako
}
