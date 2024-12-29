package hr.fer.proinz.airelm.service;

import hr.fer.proinz.airelm.entity.Actor;
import hr.fer.proinz.airelm.repository.ActorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.Instant;
import java.util.Base64;
import java.util.Optional;

@Service
public class TokenService {

    private static final String SECRET_KEY = "AireLMapp";

    @Autowired private ActorRepository actorRepository;

    public String generateToken(Integer userID){

        long issuedAt = Instant.now().getEpochSecond(); // Current timestamp
        long expiresAt = issuedAt + 3600; // Token valid for 1 hour

        String payload = String.format("{\"userId\":%d,\"issuedAt\":%d,\"expiresAt\":%d}", userID, issuedAt, expiresAt);

        //System.out.println("Payload: " + payload);

        String signature = createHash(payload, SECRET_KEY);
        //System.out.println("Generated Signature: " + signature);

        String token = Base64.getEncoder().encodeToString(payload.getBytes(StandardCharsets.UTF_8)) + "." + signature;
        System.out.println("Generated Token: " + token);

        return token;
    }

    public boolean validateToken(String token) {
        try {
            //System.out.println("Token to validate: " + token);

            // Seperate token on payload and signature
            String[] parts = token.split("\\.");
            if (parts.length != 2) {
                System.out.println("Invalid token structure");
                return false;
            }

            // Decode payload
            String payloadJson = new String(Base64.getDecoder().decode(parts[0]), StandardCharsets.UTF_8);
            String signature = parts[1];

            //System.out.println("Decoded Payload: " + payloadJson);
            //System.out.println("Decoded Signature: " + signature);

            // Check signature
            String recalculatedHash = createHash(payloadJson, SECRET_KEY);
            //System.out.println("Recalculated Signature: " + recalculatedHash);

            if (!recalculatedHash.equals(signature)) {
                System.out.println("Signature mismatch");
                return false;
            }

            // Parsiranje i validacija vremena
            String[] payloadParts = payloadJson.replace("{", "").replace("}", "").split(",");
            int userId = Integer.parseInt(payloadParts[0].split(":")[1]);
            long issuedAt = Long.parseLong(payloadParts[1].split(":")[1]);
            long expiresAt = Long.parseLong(payloadParts[2].split(":")[1]);
            long currentTimestamp = Instant.now().getEpochSecond();

            // Check UserID if he exists in the database
            /*Optional<Actor> actor = actorRepository.findById(userId);
            if (actor.isEmpty()) {
                System.out.println("User with ID " + userId + " not found");
                return false;
            }*/

            //System.out.println("Issued At: " + issuedAt);
            //System.out.println("Expires At: " + expiresAt);
            //System.out.println("Current Timestamp: " + currentTimestamp);

            return currentTimestamp >= issuedAt && currentTimestamp <= expiresAt;
        } catch (Exception e) {
            System.out.println("Error validating token: " + e.getMessage());
            return false; // Token invalid
        }
    }

    private String createHash(String data, String secretKey) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            String combined = data + secretKey;
            byte[] hashBytes = digest.digest(combined.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(hashBytes);
        } catch (Exception e) {
            throw new RuntimeException("Error generating hash", e);
        }
    }

}
