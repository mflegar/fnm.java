package hr.fer.proinz.airelm.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {


    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .authorizeHttpRequests(auth -> {
                    auth.requestMatchers("/").permitAll(); // Ne treba autentikacija za pocetnu stranicu
                    auth.anyRequest().authenticated(); // za ostale stranice TREBA
                })
                .oauth2Login(oauth2 -> oauth2
                        .defaultSuccessUrl("/home", true) // preusmjerava na "/login2" nakon prijave
                )
                .logout(logout -> logout
                        .logoutUrl("/logout") // Definiraj URL za logout akciju
                        .logoutSuccessUrl("/") // Preusmjerava na početnu stranicu nakon logouta
                        .invalidateHttpSession(true)  // Brise sesiju u tvojoj aplikaciji
                        .clearAuthentication(true)  // Brise autentifikacijske podatke
                        .deleteCookies("JSESSIONID") // Brise kolacice povezane s OAuth2 sesijom
                )
                .build();
    }

}
