# 🚀 AI Forge - Full Stack AI SaaS Platform

AI Forge is a modern AI-powered SaaS platform that provides multiple productivity tools powered by Artificial Intelligence. Users can generate articles, create blogs, analyze resumes, summarize PDF documents, remove image backgrounds, and manage credits through a subscription-based system.

Built with React, Node.js, Express, PostgreSQL (Neon), Prisma ORM, Stripe, and Google Gemini AI, AI Forge demonstrates a complete SaaS architecture including authentication, billing, AI integration, and cloud deployment.

---

## 📸 Preview

![AI Forge Dashboard](./screenshots/dashboard.png)

---

## ✨ Features

### 🤖 AI-Powered Tools

* AI Article Generator
* AI Blog Generator
* Resume Analyzer
* PDF Summarizer
* Background Remover

### 👤 User Management

* Secure User Registration & Login
* JWT Authentication
* Protected Routes
* User Profile Management

### 💳 Subscription & Billing

* Stripe Checkout Integration
* Credit-Based Usage System
* Multiple Subscription Plans
* Automatic Credit Updates via Webhooks
* Billing & Credit History

### 📊 Dashboard

* Remaining Credits Tracking
* Current Subscription Plan
* Tool Usage Monitoring
* Generated Content Statistics

### ☁️ Cloud Deployment

* Frontend deployed on Vercel
* Cloud-hosted Backend APIs
* Neon PostgreSQL Database
* Production-ready Architecture

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* React Router DOM
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* JWT Authentication
* Multer

### Database

* PostgreSQL (Neon)
* Prisma ORM

### Artificial Intelligence

* Google Gemini API
* Resume Analysis AI
* Content Generation AI
* PDF Summarization AI

### Payments

* Stripe Checkout
* Stripe Webhooks

### Deployment

* Vercel
* Render / Railway

---

## 📂 Project Structure

```bash
AI-Forge/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── config/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
├── screenshots/
│
├── README.md
└── package.json
```

---

## 🔑 Core Functionalities

### AI Article Generator

Generate detailed, high-quality articles from user prompts using AI.

### AI Blog Generator

Create SEO-friendly blog content instantly.

### Resume Analyzer

Upload resumes and receive AI-generated feedback, improvement suggestions, and ATS optimization tips.

### PDF Summarizer

Extract and summarize important information from PDF documents.

### Background Remover

Remove image backgrounds automatically using AI.

### Credit Management

Each AI operation consumes credits. Users can purchase additional credits through Stripe subscriptions.

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/ai-forge.git

cd ai-forge
```

### Install Frontend Dependencies

```bash
cd client

npm install

npm run dev
```

### Install Backend Dependencies

```bash
cd server

npm install

npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000

DATABASE_URL=your_neon_postgresql_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key

STRIPE_SECRET_KEY=your_stripe_secret_key

STRIPE_WEBHOOK_SECRET=your_webhook_secret

BACKGROUND_REMOVE_API_KEY=your_background_removal_api_key
```

---

## 💳 Stripe Webhook Setup

### Local Development

```bash
stripe listen --forward-to localhost:5000/api/webhook
```

### Production Webhook URL

```text
https://your-backend-domain.com/api/webhook
```

Stripe webhooks automatically update user credits after successful payments.

---

## 🚀 Deployment

### Frontend

Deploy frontend on Vercel:

```bash
npm run build
```

### Backend

Deploy backend on:

* Render
* Railway
* VPS

### Database

Configure PostgreSQL database using Neon.

---

## 🎯 Learning Outcomes

This project helped me gain hands-on experience in:

* Full Stack Web Development
* SaaS Product Development
* Authentication & Authorization
* REST API Development
* PostgreSQL Database Design
* Prisma ORM
* Stripe Payment Integration
* Webhook Handling
* AI API Integration
* Cloud Deployment
* Production Architecture

---

## 🏆 Key Highlights

* Built a complete SaaS application from scratch
* Integrated multiple AI-powered productivity tools
* Implemented secure authentication and authorization
* Designed a credit-based subscription model
* Integrated Stripe payments and webhooks
* Used PostgreSQL with Prisma ORM
* Deployed a production-ready application

---

## 👨‍💻 Author

### Aavati Siva Sankar

Full Stack Developer | AI Enthusiast | Software Engineering Student

### Connect With Me

* GitHub: https://github.com/aavati-sivasankar
* LinkedIn: www.linkedin.com/in/sivasankar-aavati-2884b927a

---

## ⭐ Support

If you found this project useful, please consider giving it a ⭐ on GitHub.

---

## 📄 Resume Description

Built a production-ready AI SaaS platform featuring AI Article Generation, Blog Generation, Resume Analysis, PDF Summarization, and Background Removal. Implemented JWT authentication, Stripe payment integration, credit-based subscriptions, PostgreSQL database management using Prisma ORM, and deployed the application using modern cloud infrastructure.
