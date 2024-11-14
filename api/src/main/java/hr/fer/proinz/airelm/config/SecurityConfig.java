package hr.fer.proinz.airelm.config;


import org.springframework.boot.autoconfigure.security.servlet.SecurityFilterAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    SecurityFilterChain securityFilterChain (HttpSecurity http) throws Exception{
        configureOAuth2Login(http);
        configureLogout(http);
        return http
                .build();
    }


    private void configureOAuth2Login(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests( auth -> {
                    auth.requestMatchers("/").permitAll();
                    auth.anyRequest().authenticated()
                    ;
                })
                .oauth2Login(oauth -> oauth.defaultSuccessUrl("/secured", true));
    }

    private void configureLogout(HttpSecurity http) throws Exception {
        http.logout()
                .logoutUrl("/logout") // Default logout URL
                .logoutSuccessUrl("/")
                .clearAuthentication(true)
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
                .permitAll();
    }


}
