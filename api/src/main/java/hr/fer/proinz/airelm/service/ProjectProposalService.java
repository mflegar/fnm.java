package hr.fer.proinz.airelm.service;

import hr.fer.proinz.airelm.dto.ProjectProposalDTO;
import hr.fer.proinz.airelm.entity.ProjectProposal;
import hr.fer.proinz.airelm.repository.ProjectProposalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectProposalService {

    @Autowired ProjectProposalRepository projectProposalRepository;

    public List<ProjectProposalDTO> getProposals() {
        return projectProposalRepository.findAll().stream()
                .map(proposal -> new ProjectProposalDTO(
                        proposal.getProposalID(),
                        proposal.getAttachment(),
                        proposal.getTitle(),
                        proposal.getActor().getActorID(),
                        proposal.getInstitution().getInstitutionID()))
                .collect(Collectors.toList());
    }

    public ProjectProposal saveProposal(ProjectProposal proposal) {
        return projectProposalRepository.save(proposal);
    }

    public ProjectProposalDTO getProposal(Integer id) {
        ProjectProposal proposal = projectProposalRepository.findById(id).orElse(null);
        if (proposal == null) return null;

        return new ProjectProposalDTO(
                proposal.getProposalID(),
                proposal.getAttachment(),
                proposal.getTitle(),
                proposal.getActor().getActorID(),
                proposal.getInstitution().getInstitutionID()
        );
    }


    public void deleteProposal(Integer id) {
        projectProposalRepository.deleteById(id);
    }

}
