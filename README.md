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

## 📌 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Folder Structure](#folder-structure)
- [Screenshots](#screenshots)
- [Author](#author)
- [License](#license)

## 🚀 Features

- [x] User registration & login with JWT
- [x] Secure password hashing with bcryptjs
- [x] Request logging using Winston
- [ ] Protected routes with middleware
- [ ] Error handling and validation
- [x] MongoDB integration via Mongoose
- [x] React frontend with Zustand for state management
- [ ] Optional UI features like toasts, form validation, etc.

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

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/masmoud/mern-auth-app.git
cd mern-auth-app
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

You can find the API documentation in progress hosted on Postman:

[API Documentation](https://documenter.getpostman.com/view/31062366/2sB2cX91qP)

### 4. Create environment files

Create a `.env` file in the `backend` folder with the following variables:

```
PORT=5000
MONGO_URI=your_mongo_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
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
```

**Frontend**

```bash
npm run dev     # Starts the React app
npm run build   # Builds the React app
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

## 📸 Screenshots

| Register Page                         | Login Page                      |
| ------------------------------------- | ------------------------------- |
| ![Register](screenshots/register.png) | ![Login](screenshots/login.png) |

---

## 👨‍💻 Author

**Mohamed Amoussa**  
🔗 [Portfolio](https://amoussamohamed.fr) • [GitHub](https://github.com/masmoud)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
