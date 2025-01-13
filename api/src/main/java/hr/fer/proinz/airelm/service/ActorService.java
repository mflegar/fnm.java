package hr.fer.proinz.airelm.service;

import hr.fer.proinz.airelm.dto.ActorDTO;
import hr.fer.proinz.airelm.entity.Actor;
import hr.fer.proinz.airelm.entity.Institution;
import hr.fer.proinz.airelm.entity.Project;
import hr.fer.proinz.airelm.repository.ActorRepository;
import hr.fer.proinz.airelm.repository.InstitutionRepository;
import hr.fer.proinz.airelm.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ActorService {

    @Autowired
    ActorRepository actorRepository;
    @Autowired
    InstitutionRepository institutionRepository;
    @Autowired
    ProjectRepository projectRepository;

    public ActorService() {

    }

    public List<ActorDTO> getActors() {
        return actorRepository.findAll().stream()
                .map(actor -> new ActorDTO(
                        actor.getActorID(),
                        actor.getActorEmail(),
                        actor.getActorUsername()))
                .collect(Collectors.toList());
    }

    public List<ActorDTO> getActorsByProject(Integer id) {
        return actorRepository.findByProjects_ProjectID(id).stream()
                .map(actor -> new ActorDTO(
                        actor.getActorID(),
                        actor.getActorEmail(),
                        actor.getActorUsername()))
                .collect(Collectors.toList());
    }

    public List<ActorDTO> getActorsByInstitution(Integer id) {
        return actorRepository.findByInstitutions_InstitutionID(id).stream()
                .map(actor -> new ActorDTO(
                        actor.getActorID(),
                        actor.getActorEmail(),
                        actor.getActorUsername()))
                .collect(Collectors.toList());
    }

    public Boolean isOwnerOfInstitution(Integer actorID, Integer institutionID) {
        Institution institution = institutionRepository.findById(institutionID).orElse(null);
        if (institution == null) {
            throw new IllegalArgumentException("Institution not found.");
        }
        return Objects.equals(institution.getOwner().getActorID(), actorID);
    }

    public Boolean isOwnerOfProject(Integer actorID, Integer projectID) {
        Project project = projectRepository.findById(projectID).orElse(null);
        if (project == null) {
            throw new IllegalArgumentException("Project not found.");
        }
        return Objects.equals(project.getActor().getActorID(), actorID);
    }

    public Actor saveActor(Actor actor) {
        return actorRepository.save(actor);
    }

    public ActorDTO getActor(Integer id) {
        Actor actor = actorRepository.findByActorID(id);
        if (actor == null) return null;

        return new ActorDTO(
                actor.getActorID(),
                actor.getActorEmail(),
                actor.getActorUsername()
        );
    }

    public ActorDTO getActorByUsername(String username) {
        Optional<Actor> actorOptional = actorRepository.findByActorUsername(username);
        if (actorOptional.isEmpty()) throw new RuntimeException("Actor with username " + username + " not found");
        Actor actor = actorOptional.get();
        return new ActorDTO(
                actor.getActorID(),
                actor.getActorEmail(),
                actor.getActorUsername()
        );
    }

    public boolean deleteActor(Integer id) {
        if (actorRepository.existsById(id)) {
            actorRepository.deleteById(id);
            return true;  // Brisanje je uspješno
        }
        return false;  // Actor ne postoji u bazi
    }

}
