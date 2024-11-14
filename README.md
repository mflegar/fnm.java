# Software Engineering

> The project title should aim to describe the purpose of the project and help spark initial interest by presenting the project's primary objective. This choice is entirely up to you!
>
> Naturally, no template is ideal for all projects since needs and goals vary. Don’t hesitate to emphasize your objective on this project’s homepage, whether it’s more technology-focused or marketing-oriented; we’ll support it regardless.
>
> Why this document? Only a small portion of teams have recognized the need for it (and it makes it easier for me to follow your progress).

## Project Description/Overview

This collaborative effort was undertaken as part of a project assignment for the [Software Engineering](https://www.fer.unizg.hr/predmet/proinz) course at the Faculty of Electrical Engineering and Computing at the University of Zagreb.

> Briefly describe the goal of your project. Your motivation? (Note: the answer isn’t “Because it was the assignment, and we had no other ideas.”) What problem are you solving?
>
> Since this is an assigned project, state what you want to learn or have learned.
>
> A well-crafted description allows you to showcase your work to other developers and potential employers. Not only does a strong project description often differentiate good projects from less impressive ones, but it also represents a good practice you should master.

### AI Research Lab Management

The "**AI Research Lab Management**" (**_AIReLM_**) application is designed to assist academic and private institutions with larger numbers of researchers working on various projects. It aims to streamline the development and testing of new technologies implementing artificial intelligence algorithms.

The research management process encompasses project proposal submission, proposal approval by the institution, task assignment to team members, progress tracking, and results testing.

The application will support multiple user roles, including researcher, project leader, institution manager, quality assurance engineer, and IT system administrator, each with specific permissions and capabilities within the application.

Features include project duration estimation, project status tracking, cost tracking for funded projects (with export options to PDF), and basic functionalities for testing developed models and products, including automated testing basics.

Status updates and project status changes, as well as notifications about new projects, will be sent to relevant individuals via email or push notifications.

The application should integrate with external research databases, such as arXiv or PubMed, to display relevant papers and, if feasible, calculate and display the project’s significance relative to existing research in the field.

The registration and login process will leverage an external authentication service (OAuth2).

The application will have a responsive design, optimized for use across different device types.

## Functional Requirements Overview

1. **User Registration**  
   Users can register an account.

2. **Institution Creation**  
   The system facilitates the establishment of an institution.

3. **Access Request**  
   Users can submit an access request to a specific institution.

4. **Researcher Project Idea Submission**  
   Each researcher in the institution can submit their project proposal directly to the institution.

5. **Team Invitation and Management**  
   Team leaders can assemble their teams.

For a full list and detailed description of the functional requirements, please refer to the [wiki](https://github.com/mflegar/fnm.java/wiki/2-Analysis-of-requirements#functional-requirements).

## Non-Functional Requirements Overview

1. **Security**  
   The application should ensure confidentiality, integrity, and availability of user data.

2. **Usability**  
   The application should be easy to use for all intended users.

3. **Scalability**  
   The application should handle a large number of users and projects without performance degradation.

4. **Performance**  
   The application should quickly respond to user interactions, with minimal load times.

5. **Reliability**  
   The application should be stable and reliable, minimizing crashes or errors, with data preservation in case of disruptions.

For a more comprehensive description of the non-functional requirements, refer to the [wiki](https://github.com/mflegar/fnm.java/wiki/2-Analysis-of-requirements#other-requirements).

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

To get started, open your terminal and run the following command:

```bash
docker compose up
```

## Team Members

| Name             | GitHub account                                           |
|------------------|----------------------------------------------------------|
| Filip Alaber     | [@GrmiSijeva](https://github.com/GrmiSijeva)             |
| Marko Flegar     | [@mflegar](https://github.com/mflegar)                   |
| Josip Koprivnjak | [@Josip-Koprivnjak](https://github.com/Josip-Koprivnjak) |
| Vedran Maksić    | [@VedranMaksic](https://github.com/VedranMaksic)         |
| Antonija Pandžić | [@Antonija-Pandzic](https://github.com/Antonija-Pandzic) |
| Antonio Tolić    | [@antoniotolic](https://github.com/antoniotolic)         |
| Niko Žužul       | [@NikoZuzul](https://github.com/NikoZuzul)               |

## Contributing

Read our [contributing guide](.github/CONTRIBUTING.md) to learn about our development process.

## Code of Conduct &ensp;[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md)

As students, you’re familiar with the minimum standards of acceptable behavior outlined in the [FER Student Code of Conduct](https://www.fer.unizg.hr/_download/repository/Kodeks_ponasanja_studenata_FER-a_procisceni_tekst_2016[3][1].pdf), as well as guidelines for teamwork in the [Software Engineering](https://www.fer.unizg.hr/predmet/proinz) course. We also expect adherence to the [IEEE Code of Ethics](https://www.ieee.org/about/corporate/governance/p7-8.html), which establishes standards of integrity, responsible behavior, and ethical conduct in professional activities.

The Code of Conduct is an enforceable set of rules that clearly communicates expectations and requirements for teamwork. It explicitly outlines obligations, rights, unacceptable behaviors, and corresponding consequences, creating moral expectations for all team members.

### Improve Team Functionality

- Define work distribution among group members.
- Agree on communication methods within the group.
- Avoid spending time discussing how to resolve disputes—apply standards!
- Implicitly assume all team members will follow the code of conduct.

### Reporting Issues

The worst scenario is silence when problems exist. To best resolve conflicts and issues:

- Contact me directly via [email](mailto:vlado.sruk@fer.hr), and we’ll do everything to determine next steps in confidence.
- Speak with your assistant, who is best positioned to understand team dynamics and can help resolve conflicts and avoid future disruptions.
- If you feel comfortable, discuss the issue directly. Minor incidents should be resolved directly. Take time to privately speak with the affected team member and trust in openness.

## License &ensp;[![CC BY-NC-SA 4.0][cc-by-nc-sa-4.0-shield]][cc-by-nc-sa-4.0]

This repository contains Open Educational Resources and is licensed under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International][cc-by-nc-sa-4.0] license. You may download, share, and modify the work as long as you:

- Attribute the author
- Do not use it for commercial purposes
- Share it under the same terms



[![CC BY-NC-SA 4.0][cc-by-nc-sa-4.0-image]][cc-by-nc-sa-4.0]

### Note

- All third-party packages are distributed under their own licenses
- All other resources (images, models, animations, etc.) are distributed under their own licenses

[cc-by-nc-sa-4.0]: https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en
[cc-by-nc-sa-4.0-image]: https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png
[cc-by-nc-sa-4.0-shield]: https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey

### Repository Licensing Reference

- The repository's wiki is subject to the same licensing terms as the repository itself