# 📚 Student Data Management System

A simple and clean **CRUD web application** built using **Node.js, Express, MySQL, and EJS** to manage student data. The system allows you to **add, view, edit, delete, and search** student records with a beautiful UI.

---

## 🚀 Features

* ➕ Add new student data
* 📄 View all students in a table
* 📝 Edit student data
* ❌ Delete a student (with password + email verification)
* 🔍 Search a student by ID
* 🎨 Styled UI using **Bootstrap**
* 🧩 Clean routing using Express
* 🛢 MySQL database integration

---

## 🏗 Tech Stack

* **Node.js** (Backend runtime)
* **Express.js** (Routing & Server)
* **EJS** (Templating engine)
* **MySQL2** (Database driver)
* **Bootstrap** (UI styling)
* **Method-Override** (To handle PUT & DELETE through forms)

---

## 📂 Folder Structure

```
Student_Data-Management_system/
│── views/
│   ├── home.ejs
│   ├── showUsers.ejs
│   ├── addUser.ejs
│   ├── edit.ejs
│   ├── delete.ejs
│   └── show.ejs
│
│── public/ (optional for CSS, images)
│
│── app.js
│── package.json
│── README.md
```

---

## 🛢 Database Setup

Create a database:

```sql
CREATE DATABASE sigma_app;
```

Create a `user` table:

```sql
CREATE TABLE user (
    id VARCHAR(50) PRIMARY KEY,
    user VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(100)
);
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repo

```bash
git clone https://github.com/Anirudhakoskar/Student_Data-Managment_system.git
cd Student_Data-Managment_system
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Start the server

```bash
node app.js
```

The server runs on:
👉 `http://localhost:8080`

---

## 🧪 Main Routes

| Route              | Method | Description                   |
| ------------------ | ------ | ----------------------------- |
| `/`                | GET    | Home page showing total users |
| `/user`            | GET    | Show all users                |
| `/user/add`        | GET    | Add user form                 |
| `/user`            | POST   | Add user to DB                |
| `/user/:id/edit`   | GET    | Edit form                     |
| `/user/:id`        | PATCH  | Update user in DB             |
| `/user/:id/delete` | GET    | Delete confirmation page      |
| `/user/:id`        | DELETE | Delete user                   |
| `/user/search`     | GET    | Search page                   |
| `/user/searched`   | POST   | Show searched user            |

---

## 🛡 Security Notes

* Password is checked before edit/delete.
* Duplicate entry errors are handled.
* (Optional) Environment variables recommended for DB password.

---


## ⭐ Show Your Support

If you like this project, consider giving the repo a **star ⭐** on GitHub!

