<img src="https://cdn-icons-png.flaticon.com/512/2845/2845705.png" width="32">  
# BudgetBuddy – Finance Manager

<p align="left">
  <img src="https://img.shields.io/badge/MERN-Stack-00ff00?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Maintained%3F-yes-007acc?style=for-the-badge&logo=github" />
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" />
</p>

---

## 📌 Overview
**BudgetBuddy** is an end-to-end financial ecosystem built to bridge the gap between spending and saving.  
It empowers users with real-time tracking, automated budget alerts, and professional-grade reporting.

---

## 🌟 Key Features

| Feature              | Capabilities                                                                 |
|----------------------|-------------------------------------------------------------------------------|
| 💳 Transaction CRUD  | Effortlessly manage income/expenses with category tagging.                    |
| 📊 Smart Analytics   | Interactive charts and monthly spending heatmaps.                            |
| ⚠️ Budget Guards     | Set monthly thresholds; receive visual alerts on overspending.                |
| 🔄 Auto-Log          | Automate recurring bills and subscriptions.                                   |
| 📄 Professional Reports | One-click exports to PDF and CSV for tax or audit purposes.               |

---

## 🛠️ Tech Stack & Tools

<details open>
<summary><b>View Implementation Details</b></summary>

**Frontend**
- React.js (Hooks)  
- Redux Toolkit  
- Tailwind CSS  
- Chart.js  
- Axios  

**Backend**
- Node.js  
- Express.js  
- Mongoose  
- JWT & Bcrypt  

**Infrastructure**
- MongoDB Atlas  
- Vercel / Render  
- Postman / Compass  

</details>

---

## 🏗️ Architecture & Folder Structure

```plaintext
📁 budgetbuddy-root
 ├── 📂 client            # Frontend (React + Vite/CRA)
 │    ├── 📂 src/hooks    # Custom Logic
 │    └── 📂 src/store    # Redux State Management
 ├── 📂 server            # Backend (Node + Express)
 │    ├── 📂 models       # Mongoose Data Schemas
 │    ├── 📂 middleware   # Auth Guards & Error Handling
 │    └── 📂 routes       # API Endpoints
 └── 📄 .env.example      # Environment Configuration
