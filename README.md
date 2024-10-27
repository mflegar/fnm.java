# Programsko inženjerstvo

> Ime projekta u naslovu ima cilj opisati namjenu projekta te pomoći u podizanju početnog interesa za projekt prezentirajući osnovnu svrhu projekta.
> Isključivo ovisi o Vama!
>
> Naravno, nijedan predložak nije idealan za sve projekte jer su potrebe i ciljevi različiti. Ne bojte se naglasiti Vaš cilj u ovoj početnoj stranici projekta, podržat ćemo ga bez obzira usredotočili se Vi više na tenologiju ili marketing.
>
> Zašto ovaj dokument? Samo manji dio timova je do sada propoznao potrebu (a i meni je lakše pratiti Vaš rad).

# Opis projekta
Ovaj projekt je reultat timskog rada u sklopu projeknog zadatka kolegija [Programsko inženjerstvo](https://www.fer.unizg.hr/predmet/proinz) na Fakultetu elektrotehnike i računarstva Sveučilišta u Zagrebu.

Kratko opisati cilj Vašeg projekta. Vaša motivacija?  (Napomena: odgovor nije »Zato što je to bio zadatak i nismo imali ideje za drugo.«). Koji problem rješavate?
> Obzirom da je ovo zadani projekt navedite i što želite/jeste novo  naučili.

> Dobro izrađen opis omogućuje vam da pokažete svoj rad drugim programerima, kao i potencijalnim poslodavcima. Ne samo da prvi dojam na stranici opisa često razlikuje dobar projekt od lošeg projekta već i predstavlja dobru praksu koju morate savladati.

# Functional Requirements

1. **Project Proposal Management**
Description: Researchers can submit project proposals, which the institution can then review, approve, or reject.
Backend (Spring):
Create a REST API endpoint (/projects/proposals) for submitting proposals, where users can send project data.
Implement service logic to save proposals to the database and update the proposal’s status to approved or rejected.
Create an endpoint to display all proposals, including filters for status (approved, rejected, pending).
Frontend (React):
Form for submitting proposals, with fields such as project title, description, objectives, and resources.
On the admin page, display a list of proposals with options to approve or reject.
Use React state to update the display based on backend responses.
2. **Project Status Review**
Description: Display the current status of projects (e.g., ongoing, completed, pending).
Backend (Spring):
Endpoint (/projects/status) to retrieve the status of all projects.
Schedule periodic status updates for projects nearing their end dates or those marked as completed.
Frontend (React):
Component displaying the project list with status tags using different colors (e.g., green for completed, yellow for ongoing, grey for pending).
Ability to filter projects by status using React state and effects (useEffect) to fetch updated data from the backend.
3. **Expense Tracking and Reporting**
Description: Track and generate reports on project expenses, which can be exported as PDFs.
Backend (Spring):
Create a model and endpoint (/projects/expenses) for entering and displaying expenses related to each project.
Implement report generation (e.g., using the iText library for PDF generation) which can be downloaded via the frontend.
Frontend (React):
Form for expense entry with fields like expense category, amount, and date.
Real-time display of total expenses per project.
Button to generate and download a PDF report, triggering backend generation and download of the document.
4. **Notification System**
Description: Notify users via email or push notifications about project status updates and new projects.
Backend (Spring):
Create a notification service using Spring Mail for email notifications and add push notifications with WebSocket for real-time alerts.
Endpoint (/notifications) allowing users to select their preferred notification method.
Frontend (React):
Notification management component allowing users to choose between email and push notifications.
Display real-time notifications within the user interface using React Context for global notification state management.
5. **Integration with Research Paper Databases**
Description: Connect with external research paper databases (e.g., arXiv, PubMed) to display relevant papers when opening a project and, if possible, calculate the project’s relevance to existing research in the field.
Backend (Spring):
Use external REST APIs like arXiv or PubMed to fetch data on relevant papers based on project topics.
Algorithm to calculate relevance based on project keywords and the retrieved papers.
Endpoint (/projects/research-papers) to retrieve and display relevant papers.
Frontend (React):
Component to display a list of relevant papers with relevance tags.
Option for users to open links to the papers in a new window for detailed reading.
Use React state to update and display fetched paper data from the backend.
6. **Authentication and Authorization**
Description: User login and registration using external services like Google or GitHub (OAuth2).
Backend (Spring):
Integrate Spring Security with OAuth2 for user authentication through external services.
Endpoint (/auth/login) for OAuth2-based authentication, allowing users to securely access the application.
Frontend (React):
Implement login interface with options for signing in via Google, GitHub, or other services.
Display user data (e.g., name, profile image) after login and allow for logout.
Manage user session and state using React Context or Redux.
7. **Responsive Design**
Description: Adapt the user interface for various device types (desktop, laptop, mobile).
Frontend (React):
Use a CSS framework like Bootstrap or Material-UI for responsive design.
Utilize CSS Flexbox and Grid for flexible layouts suited to different screen sizes.
Test across various devices and adjust layout as needed for clear and functional displays.
Add mobile navigation to enhance user experience on smaller screens.
# Non-Functional Requirements
1. **Security**: The application should ensure the confidentiality, integrity, and availability of user data.
2. **Usability**: The application should be easy to use for all intended users.
3. **Scalability**: The application should be able to handle a large number of users and projects without compromising performance.
4. **Performance**: The application should respond quickly to user interactions and load times should be minimized.

# Tehnologije

#Instalcija

# Članovi tima
> Popis članova tima/linkovi/ glavni doprinos
>

# Kontribucije
>Pravila ovise o organizaciji tima i su često izdvojena u CONTRIBUTING.md

# 📝 Kodeks ponašanja [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md)
Kao studenti sigurno ste upoznati s minimumom prihvatljivog ponašanja definiran u [KODEKS PONAŠANJA STUDENATA FAKULTETA ELEKTROTEHNIKE I RAČUNARSTVA SVEUČILIŠTA U ZAGREBU](https://www.fer.hr/_download/repository/Kodeks_ponasanja_studenata_FER-a_procisceni_tekst_2016%5B1%5D.pdf), te dodatnim naputcima za timski rad na predmetu [Programsko inženjerstvo](https://wwww.fer.hr).
Očekujemo da ćete poštovati [etički kodeks IEEE-a](https://www.ieee.org/about/corporate/governance/p7-8.html) koji ima važnu obrazovnu funkciju sa svrhom postavljanja najviših standarda integriteta, odgovornog ponašanja i etičkog ponašanja u profesionalnim aktivnosti. Time profesionalna zajednica programskih inženjera definira opća načela koja definiranju  moralni karakter, donošenje važnih poslovnih odluka i uspostavljanje jasnih moralnih očekivanja za sve pripadnike zajenice.

Kodeks ponašanja skup je provedivih pravila koja služe za jasnu komunikaciju očekivanja i zahtjeva za rad zajednice/tima. Njime se jasno definiraju obaveze, prava, neprihvatljiva ponašanja te  odgovarajuće posljedice (za razliku od etičkog kodeksa). U ovom repozitoriju dan je jedan od široko prihvačenih kodeks ponašanja za rad u zajednici otvorenog koda.
>### Poboljšajte funkcioniranje tima:
>* definirajte načina na koji će rad biti podijeljen među članovima grupe
>* dogovorite kako će grupa međusobno komunicirati.
>* ne gubite vrijeme na dogovore na koji će grupa rješavati sporove primjenite standarde!
>* implicitno podrazmijevamo da će svi članovi grupe slijediti kodeks ponašanja.

>###  Prijava problema
>Najgore što se može dogoditi je da netko šuti kad postoje problemi. Postoji nekoliko stvari koje možete učiniti kako biste najbolje riješili sukobe i probleme:
>* Obratite mi se izravno [e-pošta](mailto:vlado.sruk@fer.hr) i  učinit ćemo sve što je u našoj moći da u punom povjerenju saznamo koje korake trebamo poduzeti kako bismo riješili problem.
>* Razgovarajte s vašim asistentom jer ima najbolji uvid u dinamiku tima. Zajedno ćete saznati kako riješiti sukob i kako izbjeći daljnje utjecanje u vašem radu.
>* Ako se osjećate ugodno neposredno razgovarajte o problemu. Manje incidente trebalo bi rješavati izravno. Odvojite vrijeme i privatno razgovarajte s pogođenim članom tima te vjerujte u iskrenost.

# 📝 Licenca
Važeča (1)
[![CC BY-NC-SA 4.0][cc-by-nc-sa-shield]][cc-by-nc-sa]

Ovaj repozitorij sadrži otvoreni obrazovni sadržaji (eng. Open Educational Resources)  i licenciran je prema pravilima Creative Commons licencije koja omogućava da preuzmete djelo, podijelite ga s drugima uz
uvjet da navođenja autora, ne upotrebljavate ga u komercijalne svrhe te dijelite pod istim uvjetima [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License HR][cc-by-nc-sa].
>
> ### Napomena:
>
> Svi paketi distribuiraju se pod vlastitim licencama.
> Svi upotrijebleni materijali  (slike, modeli, animacije, ...) distribuiraju se pod vlastitim licencama.

[![CC BY-NC-SA 4.0][cc-by-nc-sa-image]][cc-by-nc-sa]

[cc-by-nc-sa]: https://creativecommons.org/licenses/by-nc/4.0/deed.hr
[cc-by-nc-sa-image]: https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png
[cc-by-nc-sa-shield]: https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg

Orginal [![cc0-1.0][cc0-1.0-shield]][cc0-1.0]
>
>COPYING: All the content within this repository is dedicated to the public domain under the CC0 1.0 Universal (CC0 1.0) Public Domain Dedication.
>
[![CC0-1.0][cc0-1.0-image]][cc0-1.0]

[cc0-1.0]: https://creativecommons.org/licenses/by/1.0/deed.en
[cc0-1.0-image]: https://licensebuttons.net/l/by/1.0/88x31.png
[cc0-1.0-shield]: https://img.shields.io/badge/License-CC0--1.0-lightgrey.svg

### Reference na licenciranje repozitorija
