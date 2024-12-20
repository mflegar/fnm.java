# AI Research Lab Management - AIReLM
This collaborative effort was undertaken as part of a project assignment for the [Software Engineering](https://www.fer.unizg.hr/predmet/proinz) course at the Faculty of Electrical Engineering and Computing at the University of Zagreb.

# Motivation
This project was created as a result of a joint idea of ​​our team members inspired by the given topic by the professor. The project itself is very similar to the Travel Order theme, which was the default, but we adapted it to our idea.

> ### AI Research Lab Management
The application **“AI Research Lab Management”** will facilitate academic and private institutions with a large number of researchers working on various projects to develop and test new technologies that implement artificial intelligence algorithms. 

The research management process includes initiating project proposals, approving proposals by the institution, assigning tasks to team members, monitoring progress, and testing results. The application will have several user roles, including: **researchers**, **project leader**, **institution leader**, **quality assurance engineer**, and **system administrator**. Each role will have specific permissions and capabilities within the application.

The application will enable calculating and predicting project duration and viewing project status. For funded projects, it will be possible to track expenses and export them as PDF documents. Additionally, the application should support basic functionalities for testing developed models and products, as well as implementing basic automated testing.

Notifications about project status changes, as well as new projects, will be sent via email or push notifications to the relevant individuals. The application should be integrated with external research paper databases, such as **arXiv** or **PubMed**, to display relevant research papers and, if possible, calculate and display the project's importance in relation to existing research in the field.

For the registration and login process, external authentication services (**OAuth2**) will be used. The application will have a responsive design and be adapted for use on various types of devices.



## Functional Requirements Overview

1. **User Registration**<br>
Users can register an account.

2. **Institution Creation**<br>
The system facilitates the establishment of an institution.

3. **Access Request**<br>
You can submit an access request to a specific institution.

4. **Researcher Project Idea Submission**<br>
Each researcher in the institution can submit their project proposal directly to the institution.

5. **Team Invitation and Management**<br>
Team leaders can assemble their teams.

For a complete list and more comprehensive description of the functional requirements, please refer to the [wiki](https://github.com/mflegar/fnm.java/wiki/2-Analysis-of-requirements#functional-requirements).

## Non-Functional Requirements Overview

1. **Security**<br>
The application should ensure the confidentiality, integrity, and availability of user data.

2. **Usability**<br>
The application should be easy to use for all intended users.

3. **Scalability**<br>
The application should be able to handle a large number of users and projects without compromising performance.

4. **Performance**<br>
The application should respond quickly to user interactions and load times should be minimized.

5. **Reliability**<br>
The application should be reliable, users should be able to use it without expecting crashes and errors and in case they do happen, data should not be lost.

For a more comprehensive description of the non-functional requirements, please refer to the [wiki](https://github.com/mflegar/fnm.java/wiki/2-Analysis-of-requirements#other-requirements).

## Technologies

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
&ensp;
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
&ensp;
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)

![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/Github%20Actions-282a2e?style=for-the-badge&logo=githubactions&logoColor=367cfe)

![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)

![VSCode](https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)
&ensp;
![IntelliJ IDEA](https://img.shields.io/badge/IntelliJ_IDEA-000000?style=for-the-badge&logo=intellij-idea&logoColor=white)

![Microsoft Teams](https://img.shields.io/badge/Microsoft_Teams-6264A7?style=for-the-badge&logo=microsoft-teams&logoColor=white)

## Getting Started (Installation)

To get started, open your terminal, and run the following command:

```bash
docker compose up
```

## Team Members

| Name             | GitHub account                                           | Role |
|------------------|----------------------------------------------------------|------|
| Filip Alaber     | [@GrmiSijeva](https://github.com/GrmiSijeva)             | ![Docs](https://img.shields.io/badge/Docs-1B1F24?logo=github&logoColor=white)<br>![Frontend](https://img.shields.io/badge/Frontend-36393F?logo=react&logoColor=61DAFB)<br>![Design](https://img.shields.io/badge/Design-DA461B?logo=figma&logoColor=white) |
| Marko Flegar     | [@mflegar](https://github.com/mflegar)                   | ![Docs](https://img.shields.io/badge/Docs-1B1F24?logo=github&logoColor=white)<br>![Frontend](https://img.shields.io/badge/Frontend-36393F?logo=react&logoColor=61DAFB)<br>![DevOps](https://img.shields.io/badge/DevOps-2088FF?logo=github-actions&logoColor=white) |
| Josip Koprivnjak | [@Josip-Koprivnjak](https://github.com/Josip-Koprivnjak) | ![Docs](https://img.shields.io/badge/Docs-1B1F24?logo=github&logoColor=white)<br>![Backend](https://img.shields.io/badge/Backend-6DB33F?logo=spring-boot&logoColor=white) |
| Vedran Maksić    | [@VedranMaksic](https://github.com/VedranMaksic)         | ![Docs](https://img.shields.io/badge/Docs-1B1F24?logo=github&logoColor=white)<br>![Backend](https://img.shields.io/badge/Backend-6DB33F?logo=spring-boot&logoColor=white) |
| Antonija Pandžić | [@Antonija-Pandzic](https://github.com/Antonija-Pandzic) | ![Docs](https://img.shields.io/badge/Docs-1B1F24?logo=github&logoColor=white)<br>![Frontend](https://img.shields.io/badge/Frontend-36393F?logo=react&logoColor=61DAFB) |
| Antonio Tolić    | [@antoniotolic](https://github.com/antoniotolic)         | ![Docs](https://img.shields.io/badge/Docs-1B1F24?logo=github&logoColor=white)<br>![Backend](https://img.shields.io/badge/Backend-6DB33F?logo=spring-boot&logoColor=white) |
| Niko Žužul       | [@NikoZuzul](https://github.com/NikoZuzul)               | ![Docs](https://img.shields.io/badge/Docs-1B1F24?logo=github&logoColor=white)<br>![Backend](https://img.shields.io/badge/Backend-6DB33F?logo=spring-boot&logoColor=white) |

## License
