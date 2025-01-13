package hr.fer.proinz.airelm.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Autowired
    private Environment env;
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // Endpoint on which frontend connects
        registry.addEndpoint("/ws").setAllowedOrigins(env.getProperty("spring.application.url")).withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // Prefix where the message will be broadcasted
        // Example : /topic/cricket , /topic/orders
        config.enableSimpleBroker("/topic");
        // Endpoint URL to work with Sockets
        // From frontend : --> /app/<url>
        config.setApplicationDestinationPrefixes("/app");
    }
}
