package hr.fer.proinz.airelm.config;

import hr.fer.proinz.airelm.service.TokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class CustomTokenFilter extends OncePerRequestFilter {

    @Autowired private TokenService tokenService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String requestURI = request.getRequestURI();

        // Ignore these 3 routes for now
        if (requestURI.startsWith("/generate-token") || requestURI.startsWith("/login/oauth2")
        || requestURI.startsWith("/user-info")) {
            filterChain.doFilter(request, response); // Continue with the request
            return;
        }

        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 401 Unauthorized
            response.getWriter().write("Authorization token is missing or invalid");
            return;
        }

        String token = authHeader.substring(7);

        // Check validation of the token
        if(!tokenService.validateToken(token)){
            // If token is invalid, return 401 Unauthorized
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Invalid or expired token");
            return;
        }

        // continue with the request
        filterChain.doFilter(request, response);

    }
}
