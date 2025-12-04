# Usa uma imagem com Maven e Java 11 prontos
FROM maven:3.8.6-openjdk-11

# Copia os arquivos do projeto para o container
COPY . .

# Compila o projeto (Pula testes para ser rápido)
RUN mvn clean package -DskipTests

# Expõe a porta 8080
EXPOSE 8080

# Comando para iniciar o Backend
CMD ["java", "-jar", "target/helpdeskturmaa-0.0.1-SNAPSHOT.jar"]