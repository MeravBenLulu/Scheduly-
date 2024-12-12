# Scheduly-

Scheduly הוא פרויקט מערכת ניהול פגישות לעסקים קטנים. המערכת מספקת פתרון נוח ויעיל למנהלים לקביעת פגישות, ניהול שירותים, וניהול לקוחות.npm install swagger-ui-express cors

# Server Side

## Project Overview
This project is the server-side implementation of a small business management system, built as part of a full-stack development course. The system supports functionalities for managing a business, including handling users, products, and appointments. It is built using **Node.js** with a RESTful architecture and adheres to modern coding standards.

## Features
- **Business Management**: Get, Create, update, and delete business details.
- **Product Management**: Get, Create, update, and delete services offered by the business.
- **Meetings Management**: Get,Create, update, and delete meetings, ensuring no overlapping schedules.
- **User Authentication and Authorization**:
  - JWT-based authentication.
  - Password hashing using `bcrypt`.
  - Middleware to protect routes and ensure user permissions.
- **Error Handling**:
  - Global error handling with meaningful messages.
  - HTTP status code conventions.
  - by new class AppError and ErrorConstants to maintain code consistency
- **Database Integration**:
  - MongoDB with Mongoose ORM.
  - Support for relational database integration with Sequelize.
- **RESTful Routes**:
  - Resource-based route naming conventions.
  - Example: `GET /products` returns a list of products.
- **Additional Features**:
  - Automatic API documentation with Swagger.
  - Logging using `log4js`.
  - Support for environment variables for secure configurations.
  - using Prettier Eslint for maintain code consistency

## Technical Stack
- **Programming Language**: Node.js (ES6+)
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT with hashed passwords (`bcrypt`)
- **Documentation**: Swagger
- **Logging**: `log4js`
<!-- - **Testing**: Unit tests with at least three test cases. -->
- **Deployment**: Configured for GitHub with proper version control practices.

## Project Architecture
The project follows a modular architecture with the following structure:
```
src
├── controllers
│   ├── business.controller.ts
│   ├── services.controller.ts
│   ├── meetings.controller.ts
│   └── users.ontroller.ts
├── models
│   ├── Business.js
│   ├── Product.js
│   ├── Meeting.js
│   └── User.js
├── routers
│   ├── business.router.ts
│   ├── services.router.ts
│   ├── meetings.router.ts
│   └── users.router.ts
├── services
│   ├── business.service.ts
│   ├── services.service.ts
│   ├── meetings.service.ts
│   └── users.service.ts
├── repositories
│   ├── business.repository.ts
│   ├── services.repository.ts
│   ├── meetings.repository.ts
│   └── users.repository.ts
├── middlewares
│   ├── errorHandler.ts
│   ├── authorizeOwner.ts
│   ├── authenticateToken.ts
│   └── logWriter.ts
├── classes
│   ├── AppError.ts
|   ├── CheckPermission
│   └──dtos
│       ├── meetings.dto.ts
|       ├── business.dto.ts
│       └── users.dto.ts
├── utils
│   ├── connectToDB.ts
│   └── logger.ts
└── server.ts
.env 
README.md
tsConfig
```

## Installation and Usage

### Prerequisites
- Node.js (v14+)
- MongoDB database instance
- Git

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/small-business-management-system.git
   cd small-business-management-system
2. Install dependencies:
   ```bash
    sudo apt update
    sudo apt install nodejs
    sudo apt install npm
    npm install
    npm install typescript @types/express @types/mongoose @types/dotenv @types/bcrypt @types/jsonwebtoken @types/log4js @types/node @types/express ts-node nodemon --save-dev
    npm install express mongoose dotenv jsonwebtoken log4js bcryptjs typescript body-parser
    npm install --save-dev prettier eslint eslint-config-prettier eslint-plugin-prettier
    npm install swagger-ui-express @nestjs/swagger @types/swagger-ui-express
    npm install cors
    npm install @types/cors --save-dev


3. Create a .env file and add the following variables:
   ```bash
   PORT=5000
   MONGO_URI=your_mongo_uri
   JWT_SECRET_KEY=your_jwt_secret
4. Run the server:
   ```bash\
   sudo systemctl start mongod
   npm start









