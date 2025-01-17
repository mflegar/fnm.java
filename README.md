<!-- markdownlint-disable-file MD033 MD041 -->
> [!NOTE]
> As per [course](#project-descriptionoverview) requirements, we have ensured that the repository name exactly matches our team name. Please see below for the project overview.

# AIReLM &ensp;[![Version Tag](https://img.shields.io/github/v/tag/mflegar/fnm.java?sort=semver&filter=v*&label=version)](https://github.com/mflegar/fnm.java/tags)&nbsp;[![Web Workflow Status](https://img.shields.io/github/actions/workflow/status/mflegar/fnm.java/web.yml?label=build%3Aweb)](https://github.com/mflegar/fnm.java/actions/workflows/web.yml)&nbsp;[![API Workflow Status](https://img.shields.io/github/actions/workflow/status/mflegar/fnm.java/api.yml?label=build%3Aapi)](https://github.com/mflegar/fnm.java/actions/workflows/api.yml)

This repository is based on a [project template](https://github.com/VladoSruk/Programsko-inzenjerstvo) provided by [Associate Professor Vlado Sruk, PhD](https://www.fer.unizg.hr/en/vlado.sruk). We have modified this template to suit our needs and would like to acknowledge the professor's effort in providing a solid foundation for our project assignment.

## Project Description/Overview

<!-- https://www.fer.unizg.hr/_pub/themes_static/fer2016/default/img/UniZg_logo.png -->
<img src="https://www.github.com/mflegar/fnm.java/wiki/images/unizg.png" alt="UNIZG" align="right" height="48">
<!-- https://www.fer.unizg.hr/_pub/themes_static/fer2016/default/img/FER_logo.png -->
<img src="https://www.github.com/mflegar/fnm.java/wiki/images/fer.png" alt="FER" align="right" height="48">

This collaborative effort was undertaken as part of a project assignment for the [Software Engineering](https://www.fer.unizg.hr/en/course/sofeng) course at the [Faculty of Electrical Engineering and Computing](https://www.fer.unizg.hr/en) at the [University of Zagreb](https://www.unizg.hr/homepage/).

The **AI Research Lab Management** (_AIReLM_) application simplifies management for academic and private institutions working on AI research, enabling project proposal submission, task assignment, progress tracking, result testing, and expense tracking.

For a more comprehensive description of the project, please refer to the [wiki](https://github.com/mflegar/fnm.java/wiki/1-Project-Description).

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

For a complete list and more comprehensive description of the functional requirements, please refer to the [wiki](https://github.com/mflegar/fnm.java/wiki/2-Requirements-Analysis#functional-requirements).

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

For a more comprehensive description of the non-functional requirements, please refer to the [wiki](https://github.com/mflegar/fnm.java/wiki/2-Requirements-Analysis#other-requirements).

## Technologies

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)][react]
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)][vite]
&ensp;
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)][spring-boot]
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)][postgres]
&ensp;
[![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)][docker]

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)][github]
[![GitHub Actions](https://img.shields.io/badge/Github%20Actions-282a2e?style=for-the-badge&logo=githubactions&logoColor=367cfe)][github-actions]

[![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)][figma]

[![VSCode](https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)][vscode]
&ensp;
[![IntelliJ IDEA](https://img.shields.io/badge/IntelliJ_IDEA-000000?style=for-the-badge&logo=intellij-idea&logoColor=white)][intellij-idea]

[![Microsoft Teams](https://img.shields.io/badge/Microsoft_Teams-6264A7?style=for-the-badge&logo=microsoft-teams&logoColor=white)][microsoft-teams]

[react]: https://react.dev/
[vite]: https://vite.dev/
[spring-boot]: https://spring.io/projects/spring-boot
[postgres]: https://www.postgresql.org/
[docker]: https://www.docker.com/
[github]: https://github.com/
[github-actions]: https://github.com/features/actions
[figma]: https://www.figma.com/
[vscode]: https://code.visualstudio.com/
[intellij-idea]: https://www.jetbrains.com/idea/
[microsoft-teams]: https://www.microsoft.com/en-us/microsoft-teams/group-chat-software

## Getting Started (Installation)

To get started, open your terminal, and run the following command:

```bash
docker compose up
```

## Team Members

| Name             | GitHub account                                           | Role |
|------------------|----------------------------------------------------------|------|
| Filip Alaber     | [@GrmiSijeva](https://github.com/GrmiSijeva)             | ![Docs][docs]<br>![Frontend][frontend]<br>![Design][design] |
| Marko Flegar     | [@mflegar](https://github.com/mflegar)                   | ![Docs][docs]<br>![Frontend][frontend]<br>![DevOps][devops] |
| Josip Koprivnjak | [@Josip-Koprivnjak](https://github.com/Josip-Koprivnjak) | ![Docs][docs]<br>![Backend][backend] |
| Vedran Maksić    | [@VedranMaksic](https://github.com/VedranMaksic)         | ![Docs][docs]<br>![Backend][backend] |
| Antonija Pandžić | [@Antonija-Pandzic](https://github.com/Antonija-Pandzic) | ![Docs][docs]<br>![Frontend][frontend] |
| Antonio Tolić    | [@antoniotolic](https://github.com/antoniotolic)         | ![Docs][docs]<br>![Backend][backend] |
| Niko Žužul       | [@NikoZuzul](https://github.com/NikoZuzul)               | ![Docs][docs]<br>![Backend][backend] |

[backend]: https://img.shields.io/badge/Backend-6DB33F?logo=spring-boot&logoColor=white
[design]: https://img.shields.io/badge/Design-DA461B?logo=figma&logoColor=white
[devops]: https://img.shields.io/badge/DevOps-2088FF?logo=github-actions&logoColor=white
[docs]: https://img.shields.io/badge/Docs-1B1F24?logo=github&logoColor=white
[frontend]: https://img.shields.io/badge/Frontend-36393F?logo=react&logoColor=61DAFB

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

## Citation

```bibtex
@software{fnmjava2025relm,
  author = {{fnm.java}},
  title = {{AIReLM}},
  url = {},
  version = {0.1.0},
  year = {2025}
}
```
