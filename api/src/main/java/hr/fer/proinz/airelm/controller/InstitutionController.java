package hr.fer.proinz.airelm.controller;

import hr.fer.proinz.airelm.dto.InstitutionDTO;
import hr.fer.proinz.airelm.entity.Actor;
import hr.fer.proinz.airelm.entity.Institution;
import hr.fer.proinz.airelm.repository.ActorRepository;
import hr.fer.proinz.airelm.service.InstitutionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/institution")
public class InstitutionController {

    @Autowired
    private InstitutionService institutionService;


    @Autowired
    private ActorRepository actorRepository;

    @PostMapping("/add")
    public ResponseEntity<String> addInstitution(@RequestBody InstitutionDTO institutionDTO) {
        try {
            Actor owner = actorRepository.findById(institutionDTO.getOwnerID()).orElse(null);

            if (owner == null) {
                return ResponseEntity.badRequest().body("Owner not found.");
            }

            Institution institution = new Institution();
            institution.setInstitutionName(institutionDTO.getInstitutionName());
            institution.setInstitutionLink(institutionDTO.getInstitutionLink());
            institution.setOwner(owner);

            institutionService.saveInstitution(institution);
            return new ResponseEntity<>("Institution successfully added!", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error adding institution: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<InstitutionDTO> getInstitutionByName(@PathVariable String name) {
        return ResponseEntity.ok(institutionService.getInstitutionByName(name));
    }
    @GetMapping("/owner/{ownerID}")
    public ResponseEntity<List<InstitutionDTO>> getInstitutionsByOwner(@PathVariable Integer ownerID) {
        List<InstitutionDTO> institutions = institutionService.getInstitutionsByOwner(ownerID);
        return ResponseEntity.ok(institutions);
    }

    @GetMapping("/actor/{actorID}")
    public ResponseEntity<List<InstitutionDTO>> getInstitutionsByActor(@PathVariable Integer actorID) {
        List<InstitutionDTO> institutions = institutionService.getInstitutionsByActor(actorID);
        return ResponseEntity.ok(institutions);
    }

    // Get all institutions
    @GetMapping("/")
    public ResponseEntity<List<InstitutionDTO>> getAllInstitutions() {
        List<InstitutionDTO> institutions = institutionService.getInstitutions();
        return ResponseEntity.ok(institutions);
    }

    // Get institution by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getInstitution(@PathVariable Integer id) {
        InstitutionDTO institutionDTO = institutionService.getInstitution(id);

        if (institutionDTO == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Institution not found.");
        }
        return ResponseEntity.ok(institutionDTO);
    }

}
