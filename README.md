<img src="https://cdn-icons-png.flaticon.com/512/2845/2845705.png" width="32"> BudgetBuddy – Finance Manager<p align="left"><img src="https://img.shields.io/badge/MERN-Stack-00ff00?style=for-the-badge&logo=mongodb&logoColor=white" /><img src="https://img.shields.io/badge/Maintained%3F-yes-007acc?style=for-the-badge&logo=github" /><img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" /></p>BudgetBuddy is an end-to-end financial ecosystem built to bridge the gap between spending and saving. It empowers users with real-time tracking, automated budget alerts, and professional-grade reporting.🌟 Key FeaturesFeatureCapabilities💳 Transaction CRUDEffortlessly manage income/expenses with category tagging.📊 Smart AnalyticsInteractive charts and monthly spending heatmaps.⚠️ Budget GuardsSet monthly thresholds; receive visual alerts on overspending.🔄 Auto-LogSet it and forget it—automate recurring bills and subscriptions.📄 Professional ReportsOne-click exports to PDF and CSV for tax or audit purposes.🛠️ Tech Stack & Tools<details open><summary><b>View Implementation Details</b></summary>FrontendBackendInfrastructureReact.js (Hooks)Node.jsMongoDB AtlasRedux ToolkitExpress.jsMongooseTailwind CSSJWT & BcryptPostman / CompassChart.jsAxiosVercel / Render</details>🏗️ Architecture & Folder StructurePlaintext📁 budgetbuddy-root
 ├── 📂 client            # Frontend (React + Vite/CRA)
 │    ├── 📂 src/hooks    # Custom Logic
 │    └── 📂 src/store    # Redux State Management
 ├── 📂 server            # Backend (Node + Express)
 │    ├── 📂 models       # Mongoose Data Schemas
 │    ├── 📂 middleware   # Auth Guards & Error Handling
 │    └── 📂 routes       # API Endpoints
 └── 📄 .env.example      # Environment Configuration
⚙️ Quick Start Guide<details><summary><b>1. Server Setup</b></summary>Bashcd server
npm install
npm start
</details><details><summary><b>2. Client Setup</b></summary>Bashcd client
npm install
npm run dev
</details>[!IMPORTANT]Ensure your server/.env contains your MONGO_URI and JWT_SECRET. Without these, authentication and database persistence will fail.📈 Future Roadmap[ ] Plaid API – Real-time bank synchronization.[ ] AI Insights – Machine learning to predict end-of-month savings.[ ] Dark Mode – High-contrast UI for late-night budgeting.
