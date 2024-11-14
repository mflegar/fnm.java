FROM eclipse-temurin:21-jre-alpine

EXPOSE 80/tcp

COPY build/libs/airelm-*.*.*.jar /airelm.jar

ENTRYPOINT ["java", "-jar", "/airelm.jar"]
