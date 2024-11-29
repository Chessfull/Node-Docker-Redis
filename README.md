# NewMind AI Backend Task - Node.js / Redis / Dockerized Application - Mert Topcu

This is a Node.js application built with Docker that integrates MongoDB for database storage and Redis for caching.

## Technologies Used

- **Node.js** (v20)
- **Express.js** for web server
- **MongoDB** for data storage
- **Redis** for caching
- **Docker** for containerization

## Structre of project
my-node-app/
├── Dockerfile               -> Dockerfile to build application container
├── docker-compose.yml       -> Docker Compose configuration file
├── .env                     -> Environment variables for MongoDB, Redis, and JWT
├── index.js                 -> Entry point for the application
├── config/
    ├── jwtConfig.js         -> Redis config here
    ├── redisClient.js       -> Jwt config here 
├── controllers/         
    ├── authController.js    -> Authentication logic here
    ├── productController.js -> Product CRUD operations as given task instructor
├── models/              
    ├── Product.js           -> Product schema definition
    ├── User.js              -> User schema definition
├── routes/                  -> API endpoints
    ├── authRoutes.js        -> Authentication routes (login, register)
    ├── productRoutes.js     -> Product routes (CRUD)
├── middleware/              
    ├── authMiddleware.js    -> I created my middlewares here. In this scenario or for now just auth middleware for checking jwt token processes
