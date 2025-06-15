<p align="center">
  <img src="https://yourcdn.com/outsmart-logo.png" alt="OutSmart Logo" height="100" />
</p>

<h1 align="center">🧠 OutSmart – Career Optimization Platform</h1>

<p align="center">
  Leverage Generative AI to transform resumes, boost interview readiness, and build skill-driven roadmaps.
</p>

<p align="center">
  <img alt="Build" src="https://img.shields.io/github/actions/workflow/status/yourusername/outsmart-backend/ci.yml?label=Backend%20Build&logo=springboot&style=flat-square">
  <img alt="Frontend Build" src="https://img.shields.io/github/actions/workflow/status/yourusername/outsmart-frontend/deploy.yml?label=Frontend%20Build&logo=react&style=flat-square">
  <img alt="License" src="https://img.shields.io/github/license/yourusername/outsmart?style=flat-square">
  <img alt="OpenAI Powered" src="https://img.shields.io/badge/Powered%20By-OpenAI-11A37F?logo=openai&logoColor=white&style=flat-square">
</p>

---

## 🚀 Features

- ✅ **AI Resume Analyzer** – Get feedback on ATS-friendliness, formatting, keywords, and grammar.
- 📊 **Interview Readiness Score** – Instant AI-evaluated score tailored to job-seeking strength.
- 🧠 **AI-Powered Learning Roadmaps** – Personalized upskilling plans with OpenAI integration.
- 📈 **Progress Tracker** – Monitor improvements across resumes and readiness metrics.
- 🔐 **Secure Authentication** – Email/password, Google & GitHub OAuth with JWT.
- 💼 **Plan Management** – Free, Basic, and Pro tiers with usage limits enforced by backend logic.
- 🛠️ **Admin Dashboard** – Tools for managing users, plans, tickets, and audit trails.
- 📋 **Audit Logging** – Records all sensitive admin actions with IP and user-agent logging.

---

## 🧱 Tech Stack

**Frontend:**  
- React + Tailwind CSS  
- React Router  
- Context API  

**Backend:**  
- Spring Boot + Spring Security  
- MySQL  
- JWT Authentication  
- Role-Based Access Control  

**AI Integration:**  
- OpenAI (for resume analysis & roadmap generation)

---

## 🛠️ Setup Instructions

### 🔧 Backend (Spring Boot)

```bash
git clone https://github.com/yourusername/outsmart-backend.git
cd outsmart-backend
```


2. Add config to application.properties:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/outsmart
spring.datasource.username=yourusername
spring.datasource.password=yourpassword
jwt.secret=yourSecretKey
openai.api.key=yourOpenAIKey
```


3.Run the backend:
```bash
./mvnw spring-boot:run

```

### 🌐 Frontend Setup (React)
1. Navigate and install:

```bash
cd outsmart-frontend
npm install
```

2.Add .env:

```ini
VITE_API_BASE_URL=http://localhost:8080
```

3.Start the frontend:

```bash
npm run dev
```

###🤝 Contributing
Contributions are welcome!

1. Fork this repo

2. Create a feature branch

3. Submit a pull request

📄 License
MIT License © 2025 Deepak Jeena


---

Just replace `https://github.com/deepak2250/...` with your actual repo links before publishing.


