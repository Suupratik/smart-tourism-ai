# 🌍 Smart Tourism AI

A **full-stack MERN web application** that helps users explore tourist destinations, view detailed information, get AI-powered travel guidance, and purchase entry tickets online.

The system integrates **AI travel recommendations, interactive maps, and secure online payments**, providing a modern tourism platform experience.

---

# 🚀 Features

## 🔐 Authentication
- User registration and login
- JWT based authentication
- Protected routes

## 🏝 Tourist Place Management
- Add tourist places
- Upload images
- View place details
- Delete places

## 📍 Interactive Maps
- Displays place location using **Leaflet + OpenStreetMap**
- Uses **dynamic coordinates from database**

## 🤖 AI Travel Assistant
Powered by **Groq AI**

Generates:
- travel tips
- best time to visit
- nearby attractions

## 💳 Online Ticket Booking
Secure payment using **Razorpay**

Flow:
Create order → payment → verification → ticket saved

## 🎟 My Tickets Dashboard
Users can view purchased tickets including:
- place ID
- amount
- payment status

## 🖼 Image Upload
Image upload for places using **Multer**

---

# 🏗 Tech Stack

## Frontend
- React (Vite)
- Material UI
- React Router
- Axios
- React Leaflet

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## APIs & Services
- Groq AI
- Razorpay
- OpenStreetMap

---

# 📂 Project Structure


smart-tourism-ai
│
├── backend
│ ├── controller
│ │ ├── authController.js
│ │ ├── placeController.js
│ │ ├── paymentController.js
│ │ └── chatController.js
│ │
│ ├── models
│ │ ├── User.js
│ │ ├── Place.js
│ │ └── Payment.js
│ │
│ ├── routes
│ │ ├── authRoutes.js
│ │ ├── placeRoutes.js
│ │ ├── paymentRoutes.js
│ │ └── chatRoutes.js
│ │
│ ├── uploads
│ │ └── places
│ │
│ ├── server.js
│ └── package.json
│
├── frontend
│ ├── src
│ │ ├── api
│ │ │ └── api.js
│ │ │
│ │ ├── components
│ │ │ ├── Appnavbar.jsx
│ │ │ └── Chatbot.jsx
│ │ │
│ │ ├── pages
│ │ │ ├── Home.jsx
│ │ │ ├── AddPlace.jsx
│ │ │ ├── PlaceDetails.jsx
│ │ │ ├── Login.jsx
│ │ │ ├── Register.jsx
│ │ │ └── MyTickets.jsx
│ │ │
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── index.css
│ │
│ └── package.json
│
└── README.md


---

# ⚙️ Installation Guide

## 1️⃣ Clone the Repository


git clone https://github.com/yourusername/smart-tourism-ai.git

cd smart-tourism-ai


---

# 🔧 Backend Setup


cd backend
npm install


Create `.env` file


PORT=5600

MONGO_URI=mongodb://127.0.0.1:27017/smarttourism

JWT_SECRET=your_secret_key

RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret

GROQ_API_KEY=your_groq_api_key


Start backend server


npm start


Backend runs at


http://localhost:5600


---

# 🎨 Frontend Setup


cd frontend
npm install
npm run dev


Frontend runs at


http://localhost:5173


---

# 💳 Razorpay Test Card

Use this test card for payment testing


Card Number: 4111 1111 1111 1111
Expiry: Any future date
CVV: 123
OTP: 1234


---

# 🗺 Example Place Document


{
"name": "Science City",
"location": "Kolkata",
"description": "Science museum and park",
"ticketPrice": 60,
"latitude": 22.5390,
"longitude": 88.3960
}


---

# 🧠 AI Travel Recommendation Example

User clicks:


Get AI Travel Tips


AI generates:

- Best time to visit
- Travel tips
- Nearby attractions

---

# 🧪 API Endpoints

## Places


POST /api/places
GET /api/places
GET /api/places/:id
DELETE /api/places/:id


---

## Payments


POST /api/payments/create-order
POST /api/payments/verify
GET /api/payments/my-tickets


---

## AI Chat


POST /api/chat


---

# 📸 Suggested Screenshots

Add a folder


/screenshots


Recommended images:


home.png
map.png
payment.png
ai-guide.png
tickets.png


---

# 🏗 System Architecture


React Frontend
│
│ REST API
▼
Node.js + Express Backend
│
▼
MongoDB Database
│
├── Groq AI
├── Razorpay
└── OpenStreetMap


---

# 🎯 Future Improvements

Possible upgrades:

- Admin dashboard
- Hotel booking integration
- AI itinerary generator
- Travel recommendation system
- QR ticket validation

---

# 👨‍💻 Author

**Supratik Mitra**

Computer Science Student  
Full Stack Developer

---