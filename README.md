
# 📡 Inventory Buddy – API & Documentation

<p align="left">
  <img src="https://img.shields.io/badge/MERN-Stack-00ff00?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Maintained%3F-yes-007acc?style=for-the-badge&logo=github" />
</p>

---

## 🔐 Authentication

| Method | Endpoint            | Description              |
|--------|---------------------|--------------------------|
| POST   | `/api/auth/signup`  | Register new user        |
| POST   | `/api/auth/login`   | Login user & return JWT  |

---

## 📦 Product Management

| Method | Endpoint               | Description        |
|--------|------------------------|--------------------|
| GET    | `/api/products`        | Fetch all products |
| POST   | `/api/products`        | Add new product    |
| PUT    | `/api/products/:id`    | Update product     |
| DELETE | `/api/products/:id`    | Delete product     |

---

## 📊 Dashboard

| Method | Endpoint                   | Description              |
|--------|----------------------------|--------------------------|
| GET    | `/api/products/dashboard`  | Get inventory statistics |

---

## 💳 Payments

| Method | Endpoint                          | Description                  |
|--------|-----------------------------------|------------------------------|
| POST   | `/api/payment/create-checkout-session` | Create Stripe checkout |
| GET    | `/payment-success`                | Payment success redirect     |

---

## 📄 Reports

| Method | Endpoint            | Description        |
|--------|---------------------|--------------------|
| GET    | `/api/reports/csv`  | Export CSV report  |
| GET    | `/api/reports/pdf`  | Export PDF report  |

---

## 🚀 Getting Started

### 1️⃣ Clone Repository
```bash
git clone https://github.com/yourusername/inventory-buddy.git
cd inventory-buddy
2️⃣ Install Dependencies
Frontend

bash
cd client
npm install
Backend

bash
cd server
npm install
3️⃣ Setup Environment Variables
Create .env file inside server:

env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=your_stripe_secret
4️⃣ Run Backend
bash
npm run dev
Server runs on: http://localhost:5000

5️⃣ Run Frontend
bash
cd client
npm start
Frontend runs on: http://localhost:3000

🌐 Deployment
Inventory Buddy can be deployed easily using cloud platforms:

Service	Purpose
Vercel	Frontend Deployment
Render	Backend API Hosting
MongoDB Atlas	Cloud Database
Production Architecture:

Code
React Frontend (Vercel)
        │
        ▼
Node.js Backend (Render)
        │
        ▼
MongoDB Atlas
📊 Project Highlights
✔ Full MERN stack implementation
✔ Authentication with JWT
✔ Inventory management system
✔ Real-time dashboard analytics
✔ Stripe payment integration
✔ Export reports (PDF / CSV)
✔ AI assistant support
✔ Modern Tailwind UI dashboard

🎯 Future Improvements
Planned features for next versions:

📱 Mobile responsive UI improvements

🔔 Real-time stock notifications

🏢 Multi-warehouse support

📊 Advanced analytics & forecasting

🤖 AI-powered demand prediction

🤝 Contributing
Contributions are welcome!
Workflow: fork → clone → create branch → commit → pull request
