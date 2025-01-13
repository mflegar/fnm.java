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

    @Autowired
    private TokenService tokenService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String requestURI = request.getRequestURI();

        // Ignore these 3 routes for now
        if (requestURI.startsWith("/generate-token") || requestURI.startsWith("/login/oauth2")
                || requestURI.startsWith("/validate-token")
                || requestURI.startsWith("/user-info") || requestURI.startsWith("https://api.github.com/user/emails")
                || requestURI.startsWith("/actuator/health")) {
            filterChain.doFilter(request, response); // Continue with the request
            return;
        }

        // Ako je /ws rutu potrebno obraditi, dohvatiti token iz URL parametra
        if (requestURI.startsWith("/ws")) {
            // Dohvati token iz URL parametra (npr. /ws?token=someToken)
            String token = request.getParameter("token");
            System.out.println("token je : " + token);

            if (token == null || !tokenService.validateToken(token)) {
                // Ako token nije prisutan ili je nevažeći, odbiti zahtjev
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 401 Unauthorized
                response.getWriter().write("Invalid or expired token");
                return;
            }
        } else {
            // Za ostale rute, provjeri Authorization zaglavlje
            String authHeader = request.getHeader("Authorization");

            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 401 Unauthorized
                response.getWriter().write("Authorization token is missing or invalid");
                return;
            }

            String token = authHeader.substring(7);

            // Provjeri validnost tokena
            if (!tokenService.validateToken(token)) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 401 Unauthorized
                response.getWriter().write("Invalid or expired token");
                return;
            }
        }

        // Nastavi s obradom zahtjeva ako je token valjan
        filterChain.doFilter(request, response);
    }
}
