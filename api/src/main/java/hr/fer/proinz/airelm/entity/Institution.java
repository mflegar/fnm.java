package hr.fer.proinz.airelm.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
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

    @JsonProperty("name")
    @Column(name = "institution_name", nullable = false, unique = true)
    private String institutionName;

    @JsonProperty("link")
    @Column(name = "institution_link", nullable = false)
    @Pattern(regexp = "https?://.+", message = "Invalid URL format")
    private String institutionLink;

    @ManyToOne
    @JoinColumn(name = "owner_id", referencedColumnName = "actor_id", nullable = false)
    private Actor owner;

    // Many-to-Many relationship between Actor and Institution
    @ManyToMany(mappedBy = "institutions")
    private Set<Actor> actors = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "institution", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Project> projects;

    @JsonIgnore
    @OneToMany(mappedBy = "institution", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Notification> notifications;

    @JsonIgnore
    @OneToMany(mappedBy = "institution", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ActorRoleInstitution> actorRoleInstitutions = new HashSet<>();

}
