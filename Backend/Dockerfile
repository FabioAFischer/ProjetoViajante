FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY . .
RUN mvn dependency:go-offline
RUN mvn package -DskipTests -e

 
FROM openjdk:21-jdk-slim
WORKDIR /app
COPY --from=build /app/target/projetoViajante-0.0.1-SNAPSHOT.jar /app/projetoViajante.jar
EXPOSE 8080
CMD ["java", "-jar", "projetoViajante.jar"]
