# 🚀 AI Forge - Full Stack AI SaaS Platform

AI Forge is a modern AI-powered SaaS platform that provides multiple productivity tools powered by Artificial Intelligence. Users can generate articles, create blogs, analyze resumes, summarize PDFs, remove image backgrounds, and manage credits through a subscription-based system.

---

## 📸 Preview

![AI Forge Dashboard](./screenshots/dashboard.png)

---

## ✨ Features

### 🤖 AI Tools

* AI Article Generator
* AI Blog Generator
* Resume Analyzer
* PDF Summarizer
* Background Remover

### 👤 User Management

* User Authentication & Authorization
* Secure Login & Registration
* JWT-based Authentication
* User Profile Management

### 💳 Subscription & Billing

* Stripe Payment Integration
* Credit-Based Usage System
* Multiple Subscription Plans
* Automatic Credit Allocation
* Payment History Tracking

### 📊 Dashboard

* Credits Monitoring
* Usage Statistics
* Generated Content History
* Subscription Status

### ☁️ Deployment

* Frontend deployed on Vercel
* Cloud-hosted Backend APIs
* MongoDB Database Integration

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* React Router
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* JWT Authentication
* Multer

### Database

* MongoDB
* Mongoose

### AI Services

* OpenAI API / Gemini API
* PDF Processing APIs
* Background Removal APIs

### Payments

* Stripe Checkout
* Stripe Webhooks

### Deployment

* Vercel
* Render / Railway / VPS

---

## 📂 Project Structure

```bash
AI-Forge/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
├── screenshots/
│
├── README.md
└── package.json
```

---

## 🔑 Key Functionalities

### AI Article Generator

Generate high-quality articles from user prompts.

### AI Blog Generator

Create SEO-friendly blog content instantly.

### Resume Analyzer

Upload resumes and receive AI-generated feedback and improvement suggestions.

### PDF Summarizer

Extract and summarize key information from PDF documents.

### Background Remover

Remove image backgrounds automatically using AI.

### Credit System

Each AI operation consumes credits based on the selected plan.

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/ai-forge.git
cd ai-forge
```

### Frontend Setup

```bash
cd client

npm install

npm run dev
```

### Backend Setup

```bash
cd server

npm install

npm start
```

---

## 🔐 Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

STRIPE_SECRET_KEY=your_stripe_secret_key

STRIPE_WEBHOOK_SECRET=your_webhook_secret

OPENAI_API_KEY=your_openai_api_key

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```

---

## 💳 Stripe Webhook

Local Development:

```bash
stripe listen --forward-to localhost:5000/api/webhook
```

Production:

```bash
https://your-backend-domain.com/api/webhook
```

---

## 📈 Future Improvements

* AI Research Assistant
* AI Code Generator
* AI Chatbot
* Team Collaboration
* API Access for Developers
* Analytics Dashboard
* Usage Reports

---

## 🎯 Learning Outcomes

Through this project, I gained practical experience in:

* Full Stack Web Development
* SaaS Architecture
* REST API Design
* Authentication & Authorization
* Stripe Payment Integration
* AI API Integration
* MongoDB Database Management
* Deployment & DevOps

---

## 👨‍💻 Author

**Aavati Siva Sankar**

* B.Tech CSE Student
* Full Stack Developer
* AI & Machine Learning Enthusiast

---

## ⭐ Support

If you found this project useful, please consider giving it a ⭐ on GitHub.

---

### Resume Tagline

> Built a production-ready AI SaaS platform with authentication, Stripe subscriptions, credit management, AI-powered content generation, resume analysis, PDF summarization, and image background removal using React, Node.js, Express, MongoDB, and AI APIs.
