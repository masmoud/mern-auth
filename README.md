You're absolutely right! I should have kept everything consistent in markdown format from the beginning. I appreciate your patience!

Here’s the full **updated README** template, keeping everything in markdown format:

---

````markdown
# 🔐 MERN Auth App (TypeScript)

> A full-stack authentication app built with the MERN stack using TypeScript. Features JWT-based authentication, password hashing with bcryptjs, and centralized logging with Winston.

---

## 📌 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Scripts](#-scripts)
- [Folder Structure](#-folder-structure)
- [Screenshots](#-screenshots)
- [Author](#-author)
- [License](#-license)

---

## 🚀 Features

- [x] User registration & login with JWT
- [x] Secure password hashing with bcryptjs
- [x] Request logging using Winston
- [ ] Protected routes with middleware
- [ ] Error handling and validation
- [x] MongoDB integration via Mongoose
- [x] React frontend with Zustand for state management
- [ ] Optional UI features like toasts, form validation, etc.

> **Note**: Some features are still under development, including logging, error handling, and additional UI components.

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
````

### 2. Install dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. API Docuementation

You can find the API documentation in progress hosted on Postman:

[API Docuementation](https://documenter.getpostman.com/view/31062366/2sB2cX91qP)

### 4. Create environment files

Create a `.env` file in the `backend` folder with the following variables:

```
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
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
├── client/              # React frontend
│   ├── src/
│   │   ├── store/       # Zustand store for state management
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── App.tsx
│
├── server/              # Express backend with TypeScript
│   ├── src/
│   │   ├── confing/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── validations/
│   │   ├── app.ts
│   │   └── server.ts
├── screenshots/         # UI screenshots for README
├── README.md
└── ...
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
