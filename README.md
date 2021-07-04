# **Node Docker**

This project is created from a freeCodeCamp tutorial by https://github.com/Sanjeev-Thiyagarajan. It is about containerizing a basic CRUD NodeJS app with Docker.

## How to run this project
1. Ensure you have installed `docker` in your machine.
2. Clone this repo.
3. Go to this project root directory.
4. Run `docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build`.
5. Check if the container is running by running the command `docker ps`.

Now, you should see the app running on `http://localhost:3000`.

## References
- "Learn Docker - DevOps with Node.js & Express" by freeCodeCamp.org - https://www.youtube.com/watch?v=9zUHg7xjIqQ