# Blockchain Attendance Management System

A secure 3-layer blockchain designed for recording academic attendance using tamper-proof blockchains at the **Department → Class → Student → Attendance** levels.  
Each layer uses **SHA-256 hashing**, **Proof of Work**, and **immutable block history**.

---

## 🚀 Features

### 🔗 Blockchain Architecture
- Department blockchain
- Class blockchain linked to parent department
- Student blockchain linked to parent class
- Attendance stored as mined blocks

### 🔒 Blockchain Security
- SHA-256 hashing
- Nonce-based Proof of Work (difficulty configurable)
- Immutable, append-only chain
- Full multi-chain validation engine

### 📦 CRUD Modules
- Add / Update / Delete Departments  
- Add / Update / Delete Classes  
- Add / Update / Delete Students  

### 📝 Attendance Module
- Mark attendance (Present / Absent / Leave)
- Student ledger displayed using mined blocks

### 🔍 Search System
Search across:
- Departments  
- Classes  
- Students  
- Roll numbers  

### 🧭 Blockchain Explorer
Views:
- List View  
- Table View  
- Diagram View (visual chain)

### 🛡 Validation Engine
Validates:
- Hash correctness  
- Previous hash linkage  
- Proof of Work  
- All three blockchain levels  

### 🎨 Frontend UI
- Clean navigation bar  
- CRUD pages  
- Attendance page  
- Explorer  
- Validation page  
- Fully styled in CSS  

---

## 📂 Project Structure

```
backend/
  blockchain/
  controllers/
  services/
  routes/
  storage/
  server.js

frontend/
  pages/
    home.html
    departments.html
    classes.html
    students.html
    attendance.html
    search.html
    explorer.html
    validate.html
  styles.css
  app.js
```

---

## 🔌 API Endpoints

### Departments
```
GET    /api/departments/all
POST   /api/departments/add
PUT    /api/departments/update/:id
DELETE /api/departments/delete/:id
```

### Classes
```
GET    /api/classes/all
POST   /api/classes/add
PUT    /api/classes/update/:id
DELETE /api/classes/delete/:id
```

### Students
```
GET    /api/students/all
POST   /api/students/add
PUT    /api/students/update/:id
DELETE /api/students/delete/:id
```

### Attendance
```
POST /api/attendance/mark
GET  /api/attendance/student/:id
```

### Search
```
GET /api/search?q=query
```

### Explorer
```
GET /api/explorer/departments
GET /api/explorer/classes
GET /api/explorer/students
GET /api/explorer/chain/:type/:id
```

### Validation
```
GET /api/validate/all
```

---

## 🛠 Run Locally

### Backend
```
cd backend
npm install
node server.js
```

### Frontend
Open:
```
frontend/pages/home.html
```

Or run:
```
cd frontend
npx live-server
```

---

## 📸 Screenshots
(Add after capturing)

```
![Home Page](screenshots/home.png)
![Departments](screenshots/departments.png)
![Explorer](screenshots/explorer.png)
![Attendance Ledger](screenshots/ledger.png)
![Validation](screenshots/validation.png)
```

---

## 📘 License
MIT License.

