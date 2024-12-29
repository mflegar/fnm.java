package hr.fer.proinz.airelm.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Role")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id")
    private Integer roleID;

    @Column(name = "role_name", nullable = false)
    @JsonProperty("role")
    private String roleName;

    @ManyToMany(mappedBy = "roles")
    private Set<Actor> actors = new HashSet<>();

    @ManyToMany(mappedBy = "roles")
    private Set<Institution> institutions = new HashSet<>();

}
