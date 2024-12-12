package hr.fer.proinz.airelm.repository;


import hr.fer.proinz.airelm.entity.Institution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InstitutionRepository extends JpaRepository<Institution, Integer> {
    // Custom query methods, if needed
}
