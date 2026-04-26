# 🌍 Smart Tourism AI

A **full-stack MERN web application** designed to enhance tourism experiences by combining **AI-powered recommendations, real-time communication, interactive maps, and secure online ticket booking**.

This platform allows users to explore destinations, interact with AI assistants, chat in real-time, and purchase tickets seamlessly.

---

# 🚀 Features

## 🔐 Authentication System

* User registration and login
* JWT-based authentication
* Protected routes
* Email OTP verification for secure signup

---

## 👤 Role-Based Access (Admin/User)

* Admin can add, update, and delete places
* Users can browse and book tickets
* Conditional UI rendering based on role

---

## 🏝 Tourist Place Management (CRUD)

* Add tourist places (Admin only)
* Edit and update place details
* Delete places (Admin controlled)
* Upload images using Multer
* Dynamic location coordinates (latitude & longitude)

---

## 📍 Interactive Maps

* Built with **Leaflet + OpenStreetMap**
* Click-to-select location (auto latitude/longitude)
* Marker-based visualization
* Real-time coordinate mapping

---

## 🤖 AI Travel Assistant

Powered by **Groq AI API**

Provides:

* Travel tips
* Best time to visit
* Nearby attractions
* Context-based recommendations

---

## 💬 Real-Time Chat System

* Implemented using **Socket.IO**
* User-to-user communication
* Instant message broadcasting
* Live connection tracking

---

## 🤖 AI Chatbot

* Separate from live chat
* REST API-based interaction
* Answers tourism-related queries

---

## 💳 Online Ticket Booking System

* Integrated with **Razorpay**
* Secure order creation and payment verification
* Supports real-time payment flow

---

## 🎟 My Tickets Dashboard

* View purchased tickets
* Payment details and status tracking
* Linked to authenticated user

---

## 🔔 Notification System (Basic)

* Alerts for actions (login, payment, delete, etc.)
* Extendable for real-time notifications

---

## 🎨 Modern UI/UX

* Built with **Material UI**
* Glassmorphism design
* Smooth animations (Framer Motion)
* Responsive layout
* Background image + gradient overlay

---

## 🔒 Security Features

* Password hashing using bcrypt
* JWT authentication
* OTP verification
* Razorpay signature validation
* Basic admin access control

---

# 🏗 Tech Stack

## Frontend

* React (Vite)
* Material UI
* React Router
* Axios
* React Leaflet
* Framer Motion

## Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

## Real-Time

* Socket.IO

## APIs & Services

* Groq AI API
* Razorpay
* OpenStreetMap

---

# 📂 Project Structure

smart-tourism-ai
│
├── backend
│   ├── controller
│   ├── models
│   ├── routes
│   ├── uploads
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── pages
│   │   ├── utils
│   │   ├── App.jsx
│   │   └── index.css
│   │
│   └── package.json
│
└── README.md

---

# ⚙️ Installation Guide

## 1️⃣ Clone Repository

git clone https://github.com/Suupratik/smart-tourism-ai.git
cd smart-tourism-ai

---

# 🔧 Backend Setup

cd backend
npm install

Create `.env` file:

PORT=5600
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret

EMAIL_USER=your_email
EMAIL_PASS=your_app_password

RAZORPAY_KEY=your_key
RAZORPAY_SECRET=your_secret

GROQ_API_KEY=your_groq_api_key

Run server:

npm start

---

# 🎨 Frontend Setup

cd frontend
npm install
npm run dev

---

# 🌐 Deployment

## Backend (Render)

* Hosted on Render
* Environment variables configured
* Public API endpoint available

## Frontend (Vercel)

* Deployed using Vercel
* Connected to Render backend
* Uses environment-based API URL

---

# 🧪 API Endpoints

## Authentication

POST /api/auth/register
POST /api/auth/login

## OTP

POST /api/otp/send
POST /api/otp/verify

## Places

POST /api/places
GET /api/places
GET /api/places/:id
PUT /api/places/:id
DELETE /api/places/:id

## Payments

POST /api/payments/create-order
POST /api/payments/verify
GET /api/payments/my-tickets

## Chat

POST /api/chat

---

# 📸 Suggested Screenshots

Create `/screenshots` folder:

* home.png
* map.png
* payment.png
* chat.png
* ai-guide.png
* tickets.png

---

# 🏗 System Architecture

React Frontend
│
▼
Node.js + Express Backend
│
▼
MongoDB Database
│
├── Groq AI
├── Razorpay
├── Socket.IO
└── OpenStreetMap

---

# 🎯 Future Improvements

* Advanced admin dashboard
* Hotel booking integration
* AI itinerary planner
* Private chat (rooms)
* Push notifications
* Role-based API security middleware

---

# 👨‍💻 Author

**Supratik Mitra**
Computer Science Student
Full Stack Developer
