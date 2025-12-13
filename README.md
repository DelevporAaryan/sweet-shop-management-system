# Sweet Shop Management System

A full-stack Sweet Shop Management System built as part of the Incubyte TDD Kata assessment.  
The application allows users to browse and purchase sweets, while admins can manage inventory.

---

## 🚀 Tech Stack

### Backend
- Node.js
- TypeScript
- Express
- MongoDB (Mongoose)
- JWT Authentication
- Jest + Supertest (Testing)

### Frontend
- React
- Vite
- Tailwind CSS
- Axios

---

## ✨ Features

### Authentication
- User registration
- User login using JWT
- Role-based access (User / Admin)

### Sweets Management (Protected)
- Add a new sweet (Admin)
- View all sweets
- Search sweets by name or category
- Update sweet details (Admin)
- Delete sweet (Admin)

### Inventory Management
- Purchase a sweet (decreases quantity)
- Restock a sweet (Admin only)
- Purchase disabled when stock is zero

---

## 🧪 Test-Driven Development (TDD)

Backend functionality was developed following TDD principles:
- Tests written first (Red)
- Implementation added (Green)
- Code refactored for clarity (Refactor)

Test coverage focuses on:
- Authentication
- Sweet CRUD operations
- Inventory logic

---

## ⚙️ Local Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB running locally

---

### Backend Setup

```bash
git clone https://github.com/DelevporAaryan/sweet-shop-management-system.git
cd sweet-shop-management-system/backend

npm install
copy .env.example .env   # Windows CMD
# or
cp .env.example .env     # Git Bash

npm run dev
