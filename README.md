# MERN Authentication App

## 📝 Description

A complete authentication application built with the MERN stack (MongoDB, Express, React, Node.js) and TypeScript. This application provides a robust authentication system with registration, login, logout, and token refresh functionality.

### Key Features

- **Secure Authentication**: Registration and login with JWT (JSON Web Tokens)
- **Role Management**: Distinction between regular users and administrators
- **Enhanced Security**: Password hashing with bcryptjs
- **Access and Refresh Tokens**: Dual token system for better security
- **Advanced Logging**: Request logging with Winston
- **Modular Architecture**: Clean and maintainable code structure
- **RESTful API**: Well-defined endpoints for all authentication operations
- **API Documentation**: Interactive Swagger documentation
- **Route Protection**: Middleware-based authentication and authorization

## 📌 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Folder Structure](#folder-structure)
- [API Documentation](#api-documentation)
- [Security Features](#security-features)
- [Testing](#testing)
- [Project Status](#project-status)
- [Screenshots](#screenshots)
- [Author](#author)
- [License](#license)

## 🚀 Features

- [x] User registration & login with JWT
- [x] Secure password hashing with bcryptjs
- [x] Request logging using Winston
- [x] Protected routes with middleware
- [x] Error handling
- [x] MongoDB integration via Mongoose
- [x] Swagger API documentation
- [x] Role-based access control
- [x] React frontend with Zustand for state management
- [x] toast notifications
- [ ] Validation backend and frontend
- [ ] Unit and integration tests
- [ ] Social authentication (Google, GitHub)
- [ ] Email verification
- [ ] Password reset
- [ ] Rate limiting

---

## 🧰 Tech Stack

**Frontend**:

- React
- TypeScript
- React Router
- Axios
- Zustand (state management)
- Tailwind CSS

**Backend**:

- Node.js
- Express
- TypeScript
- MongoDB with Mongoose
- bcryptjs
- jsonwebtoken
- Winston + Pino
- Swagger UI Express
- Helmet (security)

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/masmoud/mern-auth.git
cd mern-auth
```

### 2. Install dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. API Documentation

The API documentation is available through Swagger UI at http://localhost:3000/api-docs. This interactive documentation allows you to:

- Explore all available endpoints
- View request and response schemas
- Test API endpoints directly from the browser
- See authentication requirements for each endpoint
- View example requests and responses

### 4. Create environment files

Create a `.env` file in the `backend` folder with the following variables:

```
PORT=3000
MONGODB_URI=your_mongo_connection_string
ACCESS_TOKEN_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_jwt_refresh_secret
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=1d
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

---

## 🧪 Scripts

**Backend**

```bash
npm run dev     # Starts the backend in development mode
npm run build   # Compiles TypeScript
npm test        # Runs tests (to be implemented)
```

**Frontend**

```bash
npm run dev     # Starts the React app
npm run build   # Builds the React app
npm test        # Runs tests (to be implemented)
```

---

## 📁 Folder Structure

```
mern-auth-app/
│
├── frontend/            # React frontend (to be implemented)
│   ├── src/
│   │   ├── store/       # Zustand store for state management
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Application pages
│   │   ├── hooks/       # Custom hooks
│   │   └── App.tsx      # Application entry point
│
├── backend/             # Express backend with TypeScript
│   ├── src/
│   │   ├── config/      # Application configuration
│   │   ├── controllers/ # Route controllers
│   │   ├── middlewares/ # Express middlewares
│   │   ├── models/      # Mongoose models
│   │   ├── routes/      # API route definitions
│   │   ├── services/    # Business logic
│   │   ├── utils/       # Utilities and helpers
│   │   ├── validations/ # Data validation
│   │   ├── types/       # TypeScript types
│   │   ├── app.ts       # Express configuration
│   │   └── server.ts    # Server entry point
├── screenshots/         # Screenshots for README
├── README.md
└── LICENSE
```

---

## 📚 API Documentation

The API documentation is available through Swagger UI at http://localhost:3000/api-docs. This interactive documentation allows you to:

- Explore all available endpoints
- View request and response schemas
- Test API endpoints directly from the browser
- See authentication requirements for each endpoint
- View example requests and responses

### Authentication Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login with email and password
- `POST /api/auth/logout` - Logout the current user (requires authentication)
- `POST /api/auth/refresh-token` - Refresh the access token

### User Management Endpoints

- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get a user by ID (Admin or owner only)
- `PUT /api/users/:id` - Update a user (Admin or owner only)
- `DELETE /api/users/:id` - Delete a user (Admin only)

---

## 🔒 Security Features

The application implements several security measures:

- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access Control**: Different permissions for admin and regular users (to be implemented)
- **Password Hashing**: Passwords are hashed using bcrypt
- **HTTP-Only Cookies**: Tokens are stored in HTTP-only cookies to prevent XSS attacks
- **CORS Protection**: Cross-Origin Resource Sharing is configured for security
- **Helmet**: HTTP headers are secured using Helmet
- **Input Validation**: All inputs are validated before processing (to be implemented)
- **Error Handling**: Consistent error responses without exposing sensitive information
- **Rate Limiting**: Protection against brute force attacks (to be implemented)

---

## 🧪 Testing

The project will include comprehensive testing:

- **Unit Tests**: Testing individual components and functions
- **Integration Tests**: Testing API endpoints and database interactions
- **End-to-End Tests**: Testing the complete user flow

To run tests (once implemented):

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

---

## 📊 Project Status

### Completed

- ✅ Backend API with authentication
- ✅ JWT-based authentication with refresh tokens
- ✅ Role-based access control
- ✅ Swagger API documentation
- ✅ Error handling and validation
- ✅ Route protection with middleware

### In Progress

- 🔄 Frontend development
- 🔄 Testing implementation

### Planned

- 📋 User profile management
- 📋 Password reset functionality
- 📋 Email verification
- 📋 Social authentication (Google, GitHub)
- 📋 Rate limiting

---

## 📸 Screenshots

_Screenshots will be added once the frontend is implemented._

---

## 👨‍💻 Author

**Mohamed Amoussa**  
🔗 [Portfolio](https://amoussamohamed.fr) • [GitHub](https://github.com/masmoud)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
