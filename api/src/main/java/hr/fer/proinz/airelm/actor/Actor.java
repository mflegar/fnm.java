package hr.fer.proinz.airelm.actor;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Actor {
    @Id
    private int actorID;
    private String actorEmail;
    private String actorRole;
    private String actorName;
    private String actorSurname;

    public Actor() {
    }

    public Actor(int actorID, String actorEmail, String actorRole, String actorName, String actorSurname) {
        this.actorID = actorID;
        this.actorEmail = actorEmail;
        this.actorRole = actorRole;
        this.actorName = actorName;
        this.actorSurname = actorSurname;
    }

    public int getActorID() {
        return actorID;
    }


    public String getActorEmail() {
        return actorEmail;
    }

    public void setActorEmail(String actorEmail) {
        this.actorEmail = actorEmail;
    }

    public String getActorRole() {
        return actorRole;
    }

    public void setActorRole(String actorRole) {
        this.actorRole = actorRole;
    }

    public String getActorName() {
        return actorName;
    }

    public void setActorName(String actorName) {
        this.actorName = actorName;
    }

    public String getActorSurname() {
        return actorSurname;
    }

    public void setActorSurname(String actorSurname) {
        this.actorSurname = actorSurname;
    }
}
