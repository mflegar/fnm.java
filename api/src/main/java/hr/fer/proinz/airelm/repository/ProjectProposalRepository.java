package hr.fer.proinz.airelm.repository;


import hr.fer.proinz.airelm.entity.ProjectProposal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectProposalRepository extends JpaRepository<ProjectProposal, Integer> {
    // zasad ovako
}
