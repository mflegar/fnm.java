package hr.fer.proinz.airelm.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.minidev.json.annotate.JsonIgnore;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Actor")
public class Actor {

    // nullable = false <==> NOT NULL

    @Id // Primary Key
    @Column(name = "actor_id")
    private Long actorID;

    @Column(name = "actor_email", nullable = false, unique = true)
    private String actorEmail;

    @Column(name = "actor_role", nullable = false)
    private String actorRole;

    @Column(name = "actor_name", nullable = false)
    private String actorName;

    @Column(name = "actor_surname", nullable = false)
    private String actorSurname;

    // Institution relation , 1 Actor can be in Many institutions
    @JsonIgnore
    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    private List<Institution> ownedInstitutions;

    @ManyToMany
    @JoinTable(
            name = "joins",
            joinColumns = @JoinColumn(name = "actor_id"),
            inverseJoinColumns = @JoinColumn(name = "institution_id")
    )
    private Set<Institution> institutions = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "actor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProjectProposal> projectProposals;

    @JsonIgnore
    @OneToOne(mappedBy = "actor")
    private Task task;

    @JsonIgnore
    @OneToMany(mappedBy = "actor", cascade = CascadeType.ALL)
    private List<Expense> expenses;


}
