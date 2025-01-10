package hr.fer.proinz.airelm.service;

import hr.fer.proinz.airelm.dto.InstitutionDTO;
import hr.fer.proinz.airelm.dto.ProjectDTO;
import hr.fer.proinz.airelm.entity.Institution;
import hr.fer.proinz.airelm.entity.Project;
import hr.fer.proinz.airelm.entity.State;
import hr.fer.proinz.airelm.repository.ActorRepository;
import hr.fer.proinz.airelm.repository.InstitutionRepository;
import hr.fer.proinz.airelm.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private ActorRepository actorRepository;
    @Autowired
    private InstitutionRepository institutionRepository;

    public List<ProjectDTO> getProjects() {
        return projectRepository.findAll().stream()
                .map(project -> new ProjectDTO(
                        project.getProjectID(),
                        project.getProjectName(),
                        project.getStartTime(),
                        project.getAttachment(),
                        project.getInstitution().getInstitutionID(),
                        project.getActor().getActorID(),
                        project.getState()
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
                project.getActor().getActorID(),
                project.getState()
        );
    }

    public List<ProjectDTO> getProjectsByOwner(Integer actorID) {
        return projectRepository.findByActor_ActorID(
                actorID).stream().map(
                project -> new ProjectDTO(
                        project.getProjectID(),
                        project.getProjectName(),
                        project.getStartTime(),
                        project.getAttachment(),
                        project.getInstitution().getInstitutionID(),
                        project.getActor().getActorID(),
                        project.getState()
                )).collect(Collectors.toList());
    }

    public List<ProjectDTO> getProjectsByActor(Integer actorID) {
        return projectRepository.findByActors_ActorID(
                actorID).stream().map(
                project -> new ProjectDTO(
                        project.getProjectID(),
                        project.getProjectName(),
                        project.getStartTime(),
                        project.getAttachment(),
                        project.getInstitution().getInstitutionID(),
                        project.getActor().getActorID(),
                        project.getState()
                )).collect(Collectors.toList());
    }

    public List<ProjectDTO> getProjectsByInstitution(Integer institutionID) {
        return projectRepository.findByInstitution_InstitutionID(institutionID
        ).stream().map(
                project -> new ProjectDTO(
                        project.getProjectID(),
                        project.getProjectName(),
                        project.getStartTime(),
                        project.getAttachment(),
                        project.getInstitution().getInstitutionID(),
                        project.getActor().getActorID(),
                        project.getState()
                )).collect(Collectors.toList());
    }

    public boolean deleteProject(Integer id) {
        if (projectRepository.existsById(id)) {
            projectRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<ProjectDTO> getProjectsByActorAndInstitution(Integer actorID, Integer institutionID) {
        //projects by actor
        List<ProjectDTO> projectsByActor = getProjectsByActor(actorID);

        return projectsByActor.stream() //check the institutionID for each project
                .filter(projectDTO -> projectDTO.getInstitutionID().equals(institutionID))
                .filter(projectDTO -> projectDTO.getState().equals(State.active)) // Filter by state "active" - it is not needed but
                .toList();
    }

    public ProjectDTO getProjectByName(String name) {
        Project project = projectRepository.findByProjectName(name).orElse(null);
        if (project == null){
            return null;
        }
        return new ProjectDTO(
                project.getProjectID(),
                project.getProjectName(),
                project.getStartTime(),
                project.getAttachment(),
                project.getActor().getActorID(),
                project.getInstitution().getInstitutionID(),
                project.getState()
        );
    }
}
