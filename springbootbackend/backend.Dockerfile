# ===========================
# Stage 1: Build the project
# ===========================
FROM eclipse-temurin:17-jdk AS builder

WORKDIR /app

# Copy Maven wrapper files
COPY mvnw .
COPY .mvn .mvn

# Give execute permissions to mvnw (IMPORTANT FIX)
RUN chmod +x mvnw

# Copy project files
COPY pom.xml .
COPY src ./src

# Build the application
RUN ./mvnw clean package -DskipTests


# ===========================
# Stage 2: Run the application
# ===========================
FROM eclipse-temurin:17-jre

WORKDIR /app

# Copy jar file from builder stage
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
