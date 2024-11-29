## NewMind AI Backend Task  -> Node.js / Redis / Dockerized Application - Mert Topcu
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)

This is a Node.js application built with Docker that integrates MongoDB for database storage and Redis for caching.

### Technologies Used

- **Node.js** -> (v20)
- **Express.js** -> web server
- **MongoDB** -> data storage
- **Redis** -> caching
- **Docker** -> container building

### Structre of project

```
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
```

### :incoming_envelope: Contact Information :incoming_envelope:

For any questions or further information, please don't hesitate to contact me :pray:

Email: merttopcu.dev@gmail.com

LinkedIn: https://www.linkedin.com/in/mert-topcu/

Happy Coding ❤️
