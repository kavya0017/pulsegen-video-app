📹 Pulsegen – Video Processing Platform

A full-stack video upload, processing, and streaming platform built as part of the Pulsegen.io assignment.
The application enables users to securely upload videos, track real-time processing progress, classify content sensitivity, and stream processed videos efficiently.

🚀 Project Overview

Pulsegen is a multi-tenant video processing platform that demonstrates a complete end-to-end workflow:

User authentication & authorization

Secure video upload

Automated content sensitivity analysis

Real-time processing updates

Video streaming using HTTP range requests

Role-based access control (RBAC)

The project is designed with scalability, modularity, and clean architecture in mind.

🧩 Features Implemented
🔐 Authentication & Authorization

User registration and login using JWT

Secure password hashing with bcrypt

Token-based protected routes

User-level data isolation (multi-tenant architecture)

🎥 Video Management

Video upload using Multer

Secure server-side storage

Metadata stored in MongoDB

Video status tracking (processing, safe, flagged)

🧠 Sensitivity Processing

Simulated automated content sensitivity analysis

Background processing pipeline

Status updated after processing completes

⚡ Real-Time Updates

Socket.io integration

Live processing status updates pushed to the frontend

No page refresh required

▶️ Video Streaming

Video playback via backend

Efficient streaming using HTTP range requests

👥 Role-Based Access Control (RBAC)

Viewer: View assigned videos

Editor: Upload and manage videos

Admin: Full system access (architecture-ready)

🏗️ Architecture Overview
Pulsegen-video-app/
│
├── backend/
│   ├── models/        # Mongoose schemas (User, Video)
│   ├── routes/        # Auth & video APIs
│   ├── middleware/   # JWT auth & role checks
│   ├── uploads/       # Uploaded video files
│   └── server.js      # Express + Socket.io server
│
├── frontend/
│   ├── pages/         # Login, Register, Dashboard
│   ├── services/      # Axios API wrapper
│   ├── App.jsx        # Routing & auth guard
│   └── main.jsx       # React entry point
│
└── README.md

🛠️ Tech Stack
Backend

Node.js

Express.js

MongoDB Atlas

Mongoose

Socket.io

JWT Authentication

Multer

bcrypt

Frontend

React

Vite

Axios

CSS / Tailwind-ready structure

⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/kavya0017/pulsegen-video-app.git
cd pulsegen-video-app

2️⃣ Backend Setup
cd backend
npm install


Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


Run backend:

node server.js


Backend runs on:

http://localhost:5000

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev


Frontend runs on:

http://localhost:5173

🔄 Complete User Flow

User registers/logs in

JWT token stored securely

User uploads a video

Backend starts processing

Real-time progress updates via Socket.io

Video classified as safe or flagged

User streams processed video

User dashboard shows all uploaded videos

🔍 API Endpoints (Sample)

POST /api/auth/register

POST /api/auth/login

POST /api/videos/upload

GET /api/videos/my-videos

GET /api/videos/stream/:id

🧪 Testing

APIs tested using Thunder Client / Postman

Upload, auth, listing, and streaming verified locally

📌 Assumptions & Design Decisions

Sensitivity analysis is simulated to focus on architecture

Local storage used for videos (cloud-ready design)

Node modules included for ease of evaluation

Designed to be extendable for real ML models & cloud storage

🌱 Future Enhancements

Actual ML-based content moderation

Cloud storage (AWS S3 / GCP)

CDN-based streaming

Video compression & quality variants

Advanced filtering & analytics dashboard

👤 Author

Kavya
AI & ML Student
GitHub: https://github.com/kavya0017
