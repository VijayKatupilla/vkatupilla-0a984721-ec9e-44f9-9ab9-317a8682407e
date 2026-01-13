# Turbovets Backend Assignment

This repository contains the backend API implementation for the Turbovets technical assignment.  
The project is built using **NestJS**, **Nx workspace**, **TypeORM**, and **SQLite**, with a focus on clean architecture, security, and role-based access control.

---

## 🚀 Tech Stack

- **Node.js**
- **NestJS**
- **Nx Monorepo**
- **TypeORM**
- **SQLite**
- **JWT Authentication**
- **Role-Based Authorization**

---

## 📁 Project Structure

api/
└── src/
├── app/ # Root app module
├── auth/ # Authentication & JWT logic
├── tasks/ # Task CRUD operations
├── audit/ # Audit logging
├── entities/ # Database entities
├── roles/ # Role decorators & guards
├── main.ts # Application entry point
└── seed.ts # Database seed script


Each feature is organized as a separate module following NestJS best practices.

---

## 🔐 Authentication

- Authentication is implemented using **JWT**
- Login endpoint returns an access token
- All protected routes require the token in the header

**Header format:**


---

## 👤 Roles & Authorization

The system supports role-based access control:

- **OWNER**
- **ADMIN**
- **VIEWER**

Access rules:
- OWNER & ADMIN → create, update, delete tasks
- VIEWER → read-only access
- Authorization is enforced using custom guards and decorators

---

## 📌 API Endpoints

### Auth
- `POST /api/auth/login` – User login, returns JWT token

### Tasks
- `POST /api/tasks` – Create task (OWNER, ADMIN)
- `GET /api/tasks` – Get tasks
- `PUT /api/tasks/:id` – Update task (OWNER, ADMIN)
- `DELETE /api/tasks/:id` – Delete task (OWNER, ADMIN)

### Audit Logs
- `GET /api/audit-log` – View audit logs

---

## 🗄 Database

- Uses **SQLite** for simplicity
- Managed via **TypeORM**
- Entities include:
  - User
  - Role
  - Organization
  - Task
  - AuditLog

All relationships are properly defined using TypeORM decorators.

---

## 📝 Audit Logging

Every important action is logged:
- CREATE_TASK
- UPDATE_TASK
- DELETE_TASK

Audit logs store:
- Action name
- User ID
- Role
- Task ID

This helps in tracking activity and debugging.

---

## ▶️ Running the Project

### 1. Install dependencies

### 2. Start the API

### 2. Start the API

### 3. API URL

http://localhost:3000/api


---

## 🧪 Testing with Thunder Client / Postman

1. Call `/api/auth/login` with email & password
2. Copy the returned JWT token
3. Add token to Authorization header
4. Test task and audit endpoints

---

## 🎥 Video Submission

A short explanation video (under 10 minutes) is included separately as per submission guidelines.  
The video explains architecture, authentication, authorization, and task flow.

---

## ✅ Notes

- No sensitive files are committed
- SQLite database file is excluded from GitHub
- Code follows clean and modular architecture
- Proper error handling and guards are implemented

---

## 🙌 Final Words

This project demonstrates backend fundamentals including authentication, authorization, modular design, and audit logging using NestJS.

Thank you for reviewing my submission.
