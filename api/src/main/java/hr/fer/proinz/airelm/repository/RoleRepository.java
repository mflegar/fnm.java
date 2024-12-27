package hr.fer.proinz.airelm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import hr.fer.proinz.airelm.entity.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
    // like this for now
}
