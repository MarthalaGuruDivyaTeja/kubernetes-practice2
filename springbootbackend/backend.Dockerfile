# -----------------------------
# Stage 1: Build the application
# -----------------------------
FROM maven:3.9-eclipse-temurin-21 AS builder

# Set working directory
WORKDIR /app

# Copy Maven wrapper and project files
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn
COPY src ./src

# Grant execute permissions for mvnw
RUN chmod +x mvnw

# Build the application (skip tests to speed up CI)
RUN ./mvnw clean package -DskipTests


# -----------------------------
# Stage 2: Run the application
# -----------------------------
FROM eclipse-temurin-21-jdk

WORKDIR /app

# Copy the built JAR
COPY --from=builder /app/target/*.jar app.jar

# Expose port (change if your app uses different port)
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
