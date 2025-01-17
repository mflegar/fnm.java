package hr.fer.proinz.airelm.service;


import hr.fer.proinz.airelm.dto.InstitutionDTO;
import hr.fer.proinz.airelm.entity.Institution;
import hr.fer.proinz.airelm.repository.InstitutionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InstitutionService {

    @Autowired
    InstitutionRepository institutionRepository;

    public List<InstitutionDTO> getInstitutions() {
        return institutionRepository.findAll().stream()
                .map(inst -> new InstitutionDTO(
                        inst.getInstitutionID(),
                        inst.getInstitutionName(),
                        inst.getInstitutionLink(),
                        inst.getOwner().getActorID()))
                .collect(Collectors.toList());
    }

    public Institution saveInstitution(Institution institution) {
        return institutionRepository.save(institution);
    }

    public List<InstitutionDTO> getInstitutionsByOwner(Integer ownerID) {
        if (ownerID == null || ownerID <= 0) {
            throw new IllegalArgumentException("Invalid Owner ID.");
        }

        return institutionRepository.findByOwner_ActorID(ownerID).stream()
                .map(inst -> new InstitutionDTO(
                        inst.getInstitutionID(),
                        inst.getInstitutionName(),
                        inst.getInstitutionLink(),
                        inst.getOwner().getActorID()))
                .collect(Collectors.toList());
    }

    public List<InstitutionDTO> getInstitutionsByActor(Integer actorID) {
        if (actorID == null || actorID <= 0) {
            throw new IllegalArgumentException("Invalid actor ID.");
        }

        return institutionRepository.findByActors_ActorID(actorID).stream()
                .map(inst -> new InstitutionDTO(
                        inst.getInstitutionID(),
                        inst.getInstitutionName(),
                        inst.getInstitutionLink(),
                        inst.getOwner().getActorID()))
                .collect(Collectors.toList());
    }

    public InstitutionDTO getInstitution(Integer id) {
        Institution inst = institutionRepository.findById(id).orElse(null);
        if (inst == null) return null;

        return new InstitutionDTO(
                inst.getInstitutionID(),
                inst.getInstitutionName(),
                inst.getInstitutionLink(),
                inst.getOwner().getActorID());
    }

    public InstitutionDTO getInstitutionByName(String name) {
        Institution institution = institutionRepository.findByInstitutionName(name).orElse(null);
        if (institution == null) {
            return null;
        }
        return new InstitutionDTO(
                institution.getInstitutionID(),
                institution.getInstitutionName(),
                institution.getInstitutionLink(),
                institution.getOwner().getActorID());
    }

    public void deleteInstitution(Integer id) {
        institutionRepository.deleteById(id);
    }


}
