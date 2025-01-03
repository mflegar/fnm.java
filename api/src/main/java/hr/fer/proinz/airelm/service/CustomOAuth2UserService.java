package hr.fer.proinz.airelm.service;

import hr.fer.proinz.airelm.entity.Actor;
import hr.fer.proinz.airelm.repository.ActorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired private ActorRepository actorRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(userRequest);

        String email = oAuth2User.getAttribute("email");
        String username = oAuth2User.getAttribute("login");

        // Check if user is in the database
        actorRepository.findByActorEmail(email).orElseGet(() -> {
            Actor newActor = new Actor();
            newActor.setActorEmail(email);
            newActor.setActorUsername(username);
            return actorRepository.save(newActor);
        });

        // Vrati korisnika Spring Securityju
        return oAuth2User;
    }
}
