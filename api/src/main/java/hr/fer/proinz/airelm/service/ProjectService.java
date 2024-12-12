package hr.fer.proinz.airelm.service;

import hr.fer.proinz.airelm.dto.ProjectDTO;
import hr.fer.proinz.airelm.entity.Project;
import hr.fer.proinz.airelm.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    @Autowired private ProjectRepository projectRepository;

    public List<ProjectDTO> getProjects() {
        return projectRepository.findAll().stream()
                .map(project -> new ProjectDTO(
                        project.getProjectID(),
                        project.getProjectName(),
                        project.getStartTime(),
                        project.getProposal().getProposalID()
                ))
                .collect(Collectors.toList());
    }

    public Project saveProject(Project project) {
        return projectRepository.save(project);
    }

    public ProjectDTO getProject(Integer id) {
        Project project = projectRepository.findById(id).orElse(null);
        if (project == null) return null;

        return new ProjectDTO(
                project.getProjectID(),
                project.getProjectName(),
                project.getStartTime(),
                project.getProposal().getProposalID()
        );
    }

    public boolean deleteProject(Integer id) {
        if (projectRepository.existsById(id)) {
            projectRepository.deleteById(id);
            return true;
        }
        return false;
    }

}
