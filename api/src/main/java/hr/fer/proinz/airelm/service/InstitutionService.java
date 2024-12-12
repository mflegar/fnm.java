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

    @Autowired InstitutionRepository institutionRepository;

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

    public InstitutionDTO getInstitution(Integer id) {
        Institution inst = institutionRepository.findById(id).orElse(null);
        if (inst == null) return null;

        return new InstitutionDTO(
                inst.getInstitutionID(),
                inst.getInstitutionName(),
                inst.getInstitutionLink(),
                inst.getOwner().getActorID());
    }

    public void deleteInstitution(Integer id) {
        institutionRepository.deleteById(id);
    }

}
