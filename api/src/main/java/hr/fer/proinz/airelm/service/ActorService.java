package hr.fer.proinz.airelm.service;

import hr.fer.proinz.airelm.dto.ActorDTO;
import hr.fer.proinz.airelm.entity.Actor;
import hr.fer.proinz.airelm.repository.ActorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ActorService {

    @Autowired ActorRepository actorRepository;

    public ActorService(){

    }

    public List<ActorDTO> getActors() {
        return actorRepository.findAll().stream()
                .map(actor -> new ActorDTO(
                        actor.getActorID(),
                        actor.getActorEmail(),
                        actor.getActorName(),
                        actor.getActorSurname(),
                        actor.getActorRole()))
                .collect(Collectors.toList());
    }

    public Actor saveActor(Actor actor){
        return actorRepository.save(actor);
    }

    public ActorDTO getActor(Long id){
        Actor actor = actorRepository.findByActorID(id);
        if(actor == null) return null;

        return new ActorDTO(
                actor.getActorID(),
                actor.getActorEmail(),
                actor.getActorName(),
                actor.getActorSurname(),
                actor.getActorRole()
        );
    }

    public boolean deleteActor(Long id) {
        if (actorRepository.existsById(id)) {
            actorRepository.deleteById(id);
            return true;  // Brisanje je uspješno
        }
        return false;  // Actor ne postoji u bazi
    }

}
