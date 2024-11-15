package hr.fer.proinz.airelm.formdata;



public class FormData {
    private String name;
    private String surname;
    private String mail;
    private String role; //this should me enum

    public FormData(){}

    public FormData(String mail, String role, String name, String surname) {
        this.name = name;
        this.surname = surname;
        this.mail = mail;
        this.role = role;
    }

    @Override
    public String toString() {
        return "FormData{" +
                "name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", mail='" + mail + '\'' +
                ", role='" + role + '\'' +
                '}';
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }

    public String getMail() {
        return mail;
    }

    public String getRole() {
        return role;
    }
}

