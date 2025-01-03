package hr.fer.proinz.airelm.service;

import hr.fer.proinz.airelm.dto.ActorDTO;
import hr.fer.proinz.airelm.dto.ExpenseDTO;
import hr.fer.proinz.airelm.dto.ProjectDTO;
import hr.fer.proinz.airelm.entity.Actor;
import hr.fer.proinz.airelm.entity.Project;
import hr.fer.proinz.airelm.repository.ActorRepository;
import hr.fer.proinz.airelm.repository.InstitutionRepository;
import hr.fer.proinz.airelm.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    @Autowired private ProjectRepository projectRepository;
    @Autowired private ActorRepository actorRepository;
    @Autowired private InstitutionRepository institutionRepository;
    public List<ProjectDTO> getProjects() {
        return projectRepository.findAll().stream()
                .map(project -> new ProjectDTO(
                        project.getProjectID(),
                        project.getProjectName(),
                        project.getStartTime(),
                        project.getAttachment(),
                        project.getInstitution().getInstitutionID(),
                        project.getActor().getActorID()
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
                project.getAttachment(),
                project.getInstitution().getInstitutionID(),
                project.getActor().getActorID()
        );
    }
    public List<ProjectDTO> getProjectsByActor(Integer actorID){
        return projectRepository.findByActor(
                actorRepository.findByActorID(actorID)).stream().map(
                project -> new ProjectDTO(
                        project.getProjectID(),
                        project.getProjectName(),
                        project.getStartTime(),
                        project.getAttachment(),
                        project.getInstitution().getInstitutionID(),
                        project.getActor().getActorID()
        )).collect(Collectors.toList());
    }
    public List<ProjectDTO> getProjectsByInstitution(Integer institutionID){
        return projectRepository.findByInstitution(institutionRepository.findById(institutionID).get()
                ).stream().map(
                project -> new ProjectDTO(
                        project.getProjectID(),
                        project.getProjectName(),
                        project.getStartTime(),
                        project.getAttachment(),
                        project.getInstitution().getInstitutionID(),
                        project.getActor().getActorID()
                )).collect(Collectors.toList());
    }

    public boolean deleteProject(Integer id) {
        if (projectRepository.existsById(id)) {
            projectRepository.deleteById(id);
            return true;
        }
        return false;
    }

}
