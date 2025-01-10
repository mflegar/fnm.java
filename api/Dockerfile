FROM eclipse-temurin:21-jre-alpine AS github-actions-api

COPY build/libs/airelm-*.*.*.jar /airelm.jar

EXPOSE 80/tcp

ENTRYPOINT ["java", "-jar", "/airelm.jar"]
