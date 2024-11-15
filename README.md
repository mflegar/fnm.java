# Software Engineering

> Ime projekta u naslovu ima cilj opisati namjenu projekta te pomoći u podizanju početnog interesa za projekt prezentirajući osnovnu svrhu projekta. Isključivo ovisi o Vama!
>
> Naravno, nijedan predložak nije idealan za sve projekte jer su potrebe i ciljevi različiti. Ne bojte se naglasiti Vaš cilj u ovoj početnoj stranici projekta, podržat ćemo ga bez obzira usredotočili se Vi više na tenologiju ili marketing.
>
> Zašto ovaj dokument? Samo manji dio timova je do sada propoznao potrebu (a i meni je lakše pratiti Vaš rad).

## Project Description/Overview

This collaborative effort was undertaken as part of a project assignment for the [Software Engineering](https://www.fer.unizg.hr/predmet/proinz) course at the Faculty of Electrical Engineering and Computing at the University of Zagreb.

> Kratko opisati cilj Vašeg projekta. Vaša motivacija?  (Napomena: odgovor nije »Zato što je to bio zadatak i nismo imali ideje za drugo.«). Koji problem rješavate?
>
> Obzirom da je ovo zadani projekt navedite i što želite/jeste novo naučili.
>
> Dobro izrađen opis omogućuje vam da pokažete svoj rad drugim programerima, kao i potencijalnim poslodavcima. Ne samo da prvi dojam na stranici opisa često razlikuje dobar projekt od lošeg projekta već i predstavlja dobru praksu koju morate savladati.

> ### AI Research Lab Management
>
> Aplikacija "**AI Research Lab Management**" (**_AIReLM_**) olakšat će
> akademskim i privatnim institucijama s većim brojem istraživača, koji rade
> na raznim projektima, razvoj i testiranje novih tehnologija koje
> implementiraju algoritme umjetne inteligencije.
>
> Proces upravljanja istraživanjem obuhvaća otvaranje prijedloga projekta,
> odobravanje prijedloga od strane institucije, dodjeljivanje zadataka
> članovima tima, praćenje napretka i testiranje rezultata.
>
> Aplikacija će imati nekoliko uloga korisnika, kao što su: istraživač,
> voditelj projekta, voditelj institucije, inženjer osiguranja kvalitete i
> administrator informatičkog sustava. Svaki od njih ima specifične ovlasti
> i mogućnosti unutar aplikacije.
>
> Aplikacija će omogućiti izračunavanje i predviđanje vremena trajanja
> projekta i pregled statusa projekta. Ako je projekt financiran bit će
> moguće pratiti troškove te ih izvesti kao PDF dokument. Aplikacija bi
> trebala također omogućiti osnovne funkcionalnosti testiranja razvijenih
> modela i proizvoda te implementirati osnove automatskog testiranja.
>
> Obavijesti o statusu i promjeni statusa projekta, kao i o novim projektima,
> se putem elektroničke pošte ili push notifikacija šalju odgovarajućim
> osobama.
>
> Aplikacija bi trebala biti povezana s vanjskim bazama istraživačkih radova
> poput arXiv-a ili PubMed-a, putem kojih će prikazati relevantne radove te,
> ako je to moguće, izračunati i prikazati važnost projekta u odnosu na
> postojeće radove u tom području.
>
> Za proces registracije i prijave će se koristiti neki od vanjskih servisa
> za autentifikaciju (OAuth2).
>
> Aplikacija će imati responzivan dizajn i biti prilagođena upotrebi na
> različitim vrstama uređaja.

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

## Contributing

Read our [contributing guide](.github/CONTRIBUTING.md) to learn about our development process.

## Code of Conduct &ensp;[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md)

As students, you are likely familiar with the minimum standards of acceptable behavior as defined in the [FER Student Code of Conduct](https://www.fer.unizg.hr/_download/repository/Kodeks_ponasanja_studenata_FER-a_procisceni_tekst_2016[3][1].pdf), as well as additional guidelines for teamwork on the [Software Engineering](https://www.fer.unizg.hr/predmet/proinz) course. We expect you to respect the [IEEE Code of Ethics](https://www.ieee.org/about/corporate/governance/p7-8.html), which plays an important educational role in establishing the highest standards of integrity, responsible behavior, and ethical conduct in professional activities. By doing so, the community of software engineers defines common principles that define moral character, making important business decisions, and establishing clear moral expectations for all members of the community.

The Code of Conduct is a set of enforceable rules that serve to clearly communicate expectations and requirements for community/team work. It explicitly defines the obligations, rights, unacceptable behavior, and corresponding consequences (in contrast to an ethical code). A widely accepted Code of Conduct for working in an open-source community has been provided within this repository.

> ### Poboljšajte funkcioniranje tima
>
> * definirajte načina na koji će rad biti podijeljen među članovima grupe
> * dogovorite kako će grupa međusobno komunicirati.
> * ne gubite vrijeme na dogovore na koji će grupa rješavati sporove primjenite standarde!
> * implicitno podrazmijevamo da će svi članovi grupe slijediti kodeks ponašanja.
>
> ### Prijava problema
>
> Najgore što se može dogoditi je da netko šuti kad postoje problemi. Postoji nekoliko stvari koje možete učiniti kako biste najbolje riješili sukobe i probleme:
>
> * Obratite mi se izravno [e-pošta](mailto:vlado.sruk@fer.hr) i  učinit ćemo sve što je u našoj moći da u punom povjerenju saznamo koje korake trebamo poduzeti kako bismo riješili problem.
> * Razgovarajte s vašim asistentom jer ima najbolji uvid u dinamiku tima. Zajedno ćete saznati kako riješiti sukob i kako izbjeći daljnje utjecanje u vašem radu.
> * Ako se osjećate ugodno neposredno razgovarajte o problemu. Manje incidente trebalo bi rješavati izravno. Odvojite vrijeme i privatno razgovarajte s pogođenim članom tima te vjerujte u iskrenost.

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
