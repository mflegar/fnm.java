package hr.fer.proinz.airelm.service;

import hr.fer.proinz.airelm.entity.ActorRoleInstitution;
import hr.fer.proinz.airelm.repository.ActorRoleInstitutionRepozitory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ActorRoleInstitutionService {
    @Autowired
    ActorRoleInstitutionRepozitory actorRoleInstitutionRepozitory;

    public void saveActorRoleInstitution(ActorRoleInstitution actorRoleInstitution){
        actorRoleInstitutionRepozitory.save(actorRoleInstitution);
    }
}
