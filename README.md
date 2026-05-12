# Edufence — Geolocation-Based Smart Attendance System

A full-stack web application for managing student attendance using GPS geofencing — preventing proxy attendance by verifying a student's physical presence within a defined campus boundary before allowing them to mark in.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Running the Server](#running-the-server)
- [User Roles](#user-roles)
- [Attendance Pipeline](#attendance-pipeline)
- [Views Overview](#views-overview)
- [Routes](#routes)
- [Known Issues & TODOs](#known-issues--todos)

---

## Overview

Edufence is a Node.js + Express web application built for educational institutions to automate and secure the attendance process. Teachers define geofenced class zones; students can only mark attendance when their GPS coordinates fall within the boundary. The system supports two roles — Teacher and Student — each with their own dashboard and workflow.

---

## Features

- **Geofence Verification** — Attendance is accepted only when the student's device GPS falls within the teacher-defined boundary for that class
- **Role-Based Access** — Separate registration, login, and dashboard flows for Teachers and Students
- **Teacher Dashboard** — View class metrics (total classes, today's classes, student count, active sessions) and manage class cards
- **Student Interface** — Simple one-tap attendance marking with live location check
- **Secure Authentication** — Email and password-based registration and login backed by MongoDB
- **EJS Templating** — Server-rendered pages with reusable layout components
- **Video Background UI** — Immersive login and register screens with looping background video

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express v5 |
| Templating | EJS |
| Database | MongoDB (Mongoose) |
| Dev Server | Nodemon |
| UI Framework | Bootstrap 5 |
| Geolocation | Browser Geolocation API (client-side) |

---

## Project Structure

```
Edufence/
├── src/
│   ├── index.js              # Express server entry point — routes and app config
│   ├── views/                # EJS templates (server-rendered pages)
│   │   ├── home.ejs          # Public landing page with feature overview
│   │   ├── login.ejs         # Login page with video background
│   │   └── register.ejs      # Teacher registration page
│   └── assets/               # Static files served publicly
│       ├── img/              # Logo and image assets
│       └── video/            # Background video files (equation.mp4)
├── temp/                     # UI prototypes (HTML, not yet integrated)
│   ├── home.html
│   ├── login2.html
│   ├── signin2.html
│   ├── tView.html
│   └── teacherView.html      # Teacher dashboard prototype (ready to convert)
├── package.json
└── README.md
```

---

## Installation & Setup

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [MongoDB](https://www.mongodb.com/) running locally or a MongoDB Atlas connection string

### 1. Clone the Repository

```bash
git clone https://github.com/Bhagathsurendran/Edufence.git
cd Edufence
```

### 2. Install Dependencies

```bash
npm install
```

---

## Running the Server

### Development (with auto-restart)

```bash
npm run dev
```

### Production

```bash
npm start
```

The app will be available at: `http://localhost:8010`

---

## User Roles

| Role | Description |
|---|---|
| Teacher | Register and log in to manage classes, configure geofences, and monitor attendance |
| Student | Log in to mark attendance using device GPS when within the class geofence |

---

## Attendance Pipeline

The platform guides a student through the following flow:

```
Register → Login → Select Class → GPS Check → Mark Attendance → View History
```

1. **Register** — Student or Teacher creates an account with name, email, and password
2. **Login** — Role-based login routes the user to the correct dashboard
3. **Class Selection** — Student selects the active class they wish to attend
4. **GPS Verification** — The browser Geolocation API captures the student's coordinates; the server checks if they fall within the class geofence boundary
5. **Attendance Marked** — If inside the boundary, attendance is recorded with a timestamp; if outside, the request is rejected
6. **History** — Students and Teachers can view attendance logs per class and date

---

## Views Overview

The main app handles:

- Teacher and Student registration
- Login and session management
- Home / landing page

**Current views:**

| File | Description |
|---|---|
| `home.ejs` | Public landing page with feature and role overview |
| `login.ejs` | Login form with looping video background |
| `register.ejs` | Teacher account registration form |

**Prototype views (in `/temp`, pending integration):**

| File | Description |
|---|---|
| `teacherView.html` | Teacher dashboard with metrics cards and class management |
| `tView.html` | Alternate teacher view layout |
| `login2.html` | Alternate login design |
| `signin2.html` | Student sign-in prototype |

---

## Routes

### Currently Implemented

| Method | URL | Description |
|---|---|---|
| GET | `/` | Public landing page |
| GET | `/login` | Login page |
| GET | `/register` | Teacher registration page |

### Planned (Not Yet Implemented)

| Method | URL | Description |
|---|---|---|
| POST | `/login` | Authenticate user and redirect by role |
| POST | `/register` | Create new Teacher account |
| GET | `/teacher/dashboard` | Teacher dashboard — classes and metrics |
| GET | `/student/dashboard` | Student dashboard |
| POST | `/attendance/mark` | Submit GPS coordinates and mark attendance |
| GET | `/attendance/history` | View attendance history |
| POST | `/class/create` | Teacher creates a new class with geofence config |

---

## Known Issues & TODOs

- **No backend logic yet** — `POST` routes for login and registration are not implemented; forms currently do nothing on submit
- **No database models** — Mongoose is installed but no schemas or connection code exist yet
- **Login page bug** — The login form includes a "Confirm Password" field, which belongs on the register form, not the login form
- **Missing asset** — `login.ejs` references `/img/white-Photoroom (1).png` which does not exist in `assets/img/`; only `logo.png` is present
- **No student registration** — The current `/register` route only creates Teacher accounts; no Student sign-up flow exists
- **Geofence logic not built** — The core feature (GPS boundary check) has not been implemented on the server side
- **No session or auth middleware** — There is no session management, JWT, or cookie-based auth in place
- **`/temp` folder not integrated** — Five HTML prototypes exist but have not been converted to EJS or wired to routes
- **No persistent state** — All data is lost on server restart until MongoDB is connected and models are defined

---

## Authors

Developed by **Bhagath & Ameera**

---

## License

This project does not currently include a license file. All rights reserved by the authors unless otherwise stated.
