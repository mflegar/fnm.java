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
@Table(name = "Institution")
public class Institution {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "institution_id")
    private Integer institutionID;

    @Column(name = "institution_name", nullable = false)
    private String institutionName;

    @Column(name = "institution_link", nullable = false)
    private String institutionLink;

    @ManyToOne
    @JoinColumn(name = "owner_id", referencedColumnName = "actor_id", nullable = false)
    private Actor owner;

    // Many-to-Many relationship between Actor and Institution
    @ManyToMany
    @JoinTable(
            name = "joins",
            joinColumns = @JoinColumn(name = "institution_id"),
            inverseJoinColumns = @JoinColumn(name = "actor_id")
    )
    private Set<Actor> actors = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "institution", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProjectProposal> projectProposals;

}