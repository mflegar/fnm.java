package hr.fer.proinz.airelm.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import hr.fer.proinz.airelm.config.CustomTokenFilter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired private CustomTokenFilter customTokenFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests((authorize) -> authorize
                        .requestMatchers(HttpMethod.GET,"/oauth2/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/oauth2/**").permitAll()
                        .requestMatchers(HttpMethod.GET,"/login/oauth2/**").permitAll()
                        .requestMatchers(HttpMethod.OPTIONS, "login/oauth2/**").permitAll()

                        .requestMatchers(HttpMethod.GET, "/generate-token/**").permitAll()

                        .requestMatchers(HttpMethod.GET,"/**").authenticated()
                        .requestMatchers(HttpMethod.POST,"/**").authenticated()
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        .requestMatchers(HttpMethod.GET,"/auth/**").permitAll()
                        .requestMatchers(HttpMethod.POST,"/auth/**").permitAll()

                        .anyRequest().denyAll() // Sve ostale zahtjeve blokiraj
                )
                .oauth2Login(oauth2 -> oauth2
                        .defaultSuccessUrl("http://localhost:5780", true)
                )
                .addFilterBefore(customTokenFilter, OAuth2LoginAuthenticationFilter.class); // Validate token before oauth2

        return http.build();
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:5780")  // React frontend
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
