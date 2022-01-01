# Base information
Lacuisine Broadcast service untuk handle long process yang enggak bisa di tunggu lama

# Spesifikasi Minimal "Local"
Processor : 1 core
Ram : 256MB

# Spesifikasi Production
Processor : 2 core -> "Ekslusif"
Ram : 512MB

# Langkah install 
- Desktop
  - yarn install
  - ubah env port 3000 -> "Sesuaikan"
  - npm run dev -> "Compile"
  - npm run start-dev -> "Running"

- Docker
  ```
  # docker-compose.yaml
  lacuisine_socket_app:
    image : lacuisine_socket_app
    build: ./image_node
    working_dir : '/opt/app'
    command: >
      bash -c "
        tail -f > /dev/null"
    deploy:
      resources:
        limits:
          cpus: 2
          memory: 256M
    expose: 
      - "3000"
    volumes:
      - ".:/opt/app"
  ```
