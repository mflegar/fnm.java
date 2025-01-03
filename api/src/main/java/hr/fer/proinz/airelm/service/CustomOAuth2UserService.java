package hr.fer.proinz.airelm.service;

import hr.fer.proinz.airelm.entity.Actor;
import hr.fer.proinz.airelm.repository.ActorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.core.ParameterizedTypeReference;

import java.util.List;
import java.util.Map;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired private ActorRepository actorRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(userRequest);

        String username = oAuth2User.getAttribute("login");

        // Provjeri postoji li korisnik u bazi podataka prema username-u
        Actor actor = actorRepository.findByActorUsername(username)
                .orElseGet(() -> {
                    // Ako korisnik ne postoji, pokušaj dohvatiti email
                    String email = oAuth2User.getAttribute("email");

                    if (email == null) {
                        email = getEmailFromGitHub(userRequest);
                    }

                    if (email == null) {
                        throw new OAuth2AuthenticationException("Email not found");
                    }

                    // Create new user
                    Actor newActor = new Actor();
                    newActor.setActorEmail(email);
                    newActor.setActorUsername(username);
                    return actorRepository.save(newActor);
                });

        // Ako je korisnik pronađen, ažuriraj ga s najnovijim podacima
        if (!actor.getActorUsername().equals(username)) {
            actor.setActorUsername(username);
            actorRepository.save(actor);
        }

        // Vrati korisnika Spring Securityju
        return oAuth2User;
    }

    private String getEmailFromGitHub(OAuth2UserRequest userRequest) {
        OAuth2AccessToken accessToken = userRequest.getAccessToken();
        String url = "https://api.github.com/user/emails";

        WebClient webClient = WebClient.create();

        // Parametriziramo tip podataka za vraćanje odgovora s WebClient
        List<Map<String, Object>> emails = webClient.get()
                .uri(url)
                .headers(headers -> headers.setBearerAuth(accessToken.getTokenValue()))
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<Map<String, Object>>>() {})
                .block();

        // Ispisivanje svih emailova za dijagnostiku
        System.out.println("Svi emailovi za korisnika:");
        for (Map<String, Object> emailData : emails) {
            String email = (String) emailData.get("email");
            boolean primary = (boolean) emailData.get("primary");
            System.out.println("Email: " + email + ", Primarni: " + primary);
        }

        // Provjera primarnog emaila
        for (Map<String, Object> emailData : emails) {
            boolean primary = (boolean) emailData.get("primary");
            if (primary) {
                return (String) emailData.get("email");
            }
        }

        return null; // Ako nije pronađen primarni email
    }
}
