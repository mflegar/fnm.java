# Software Engineering

## Project Description/Overview

This collaborative effort was undertaken as part of a project assignment for the [Software Engineering](https://www.fer.unizg.hr/predmet/proinz) course at the Faculty of Electrical Engineering and Computing at the University of Zagreb.

> The goal of our project is first of all to gain experience in group project creation. Try to manage in unexpected situations and know how to react. In addition, we want to advance in the engineering aspect and > develop our technological capabilities. The topic of this project was proposed by our leader, after which we accepted it.
> We claim that this topic is close to people of our generation and therefore we find it interesting.

> ### AI Research Lab Management
> The application „AI Research Lab Managment“ will facillitate academic and private institutions with a large number of researches working on variouss projects to develop and test new technologies that implement > artificial intelligence algorithms. The reseacrh managment process includes initiating project proposals, approving proposals by the institution, assigning tasks to team members, monitoring progess and testing > results. The application will have several user roles, including: researchers, project leader, institution leader, quality assurance engineer and system administrator. Each role will have specific permission  > and capatibilities within the application. The application will enable calculating and predicting project duration and viewing project status. For funded projects, it will be possible to track expenses and
> export them as PDF document. The application should also support basci functionalities for testing developed models and products, as well as implementing basic automated testing. Notifications about the  
> project status changes, as well as about new projects, will be sent via email or push notifications to the relevant individuals. The application should be in integreted with external research paper databases,  > such as arXiv or PubMed, to display relevant research papers and, if possible, calculate and display the project's importance in relation to existing researh in the field. For the registration and login  
> process, external authentication services (OAuth2) will be used. The application will have a responsive design and be adapted for use on various types of devices.


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

As students, you are likely familiar with the minimum standards of acceptable behavior as defined in the [FER Student Code of Conduct](https://www.fer.unizg.hr/_download/repository/Kodeks_ponasanja_studenata_FER-a_procisceni_tekst_2016[3][1].pdf), as well as additional guidelines for teamwork on the [Software Engineering](https://www.fer.unizg.hr/predmet/proinz) course. We expect you to respect the [IEEE Code of Ethics](https://www.ieee.org/about/corporate/governance/p7-8.html), which plays an important educational role in establishing the highest standards of integrity, responsible behavior, and ethical conduct in professional activities. By doing so, the community of software engineers defines common principles that define moral character, making important business decisions, and establishing clear moral expectations for all members of the community.

The Code of Conduct is a set of enforceable rules that serve to clearly communicate expectations and requirements for community/team work. It explicitly defines the obligations, rights, unacceptable behavior, and corresponding consequences (in contrast to an ethical code). A widely accepted Code of Conduct for working in an open-source community has been provided within this repository.

## License &ensp;[![CC BY-NC-SA 4.0][cc-by-nc-sa-4.0-shield]][cc-by-nc-sa-4.0]

This repository contains Open Educational Resources and is licensed under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International][cc-by-nc-sa-4.0] license that allows you to download, share, and modify the work as long as you:

* Attribute the author
* Do not use it for commercial purposes
* Share it under the same terms

[![CC BY-NC-SA 4.0][cc-by-nc-sa-4.0-image]][cc-by-nc-sa-4.0]

### Note

* All third-party packages are distributed under their own licenses
* All other resources (images, models, animations, etc.) are distributed under their own licenses

[cc-by-nc-sa-4.0]: https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en
[cc-by-nc-sa-4.0-image]: https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png
[cc-by-nc-sa-4.0-shield]: https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey

### Repository Licensing Reference

* The repository's wiki is subject to the same licensing terms as the repository itself
