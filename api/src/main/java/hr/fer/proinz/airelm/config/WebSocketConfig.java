package hr.fer.proinz.airelm.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // Endpoint on which frontend connects
        registry.addEndpoint("/ws").setAllowedOrigins("http://localhost:5780").withSockJS();
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
