# 📊 Full-Stack CRM Application

A production-style **Customer Relationship Management (CRM)** system built with a **Node.js / Express backend** and a **React (Vite) frontend**.  
The application is designed to manage **leads, tasks, interactions, users**, and provide **dashboard analytics** with **role-based access control** and **automated reminders**.


---

## 🚀 Project Overview

This CRM helps organizations:
- Track leads and their lifecycle
- Assign and manage follow-up tasks
- Log customer interactions
- Monitor sales performance via dashboards
- Automate overdue follow-up reminders via email
- Enforce role-based access (Admin vs Sales)

---

## ✨ Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access control (RBAC)

### 👥 User Management
- Admin can:
  - Create users
  - Assign roles (Admin / Sales)
  - Enable or disable users
- Sales users can access only assigned data

### 📇 Lead Management
- Create, view, update leads
- Lead status pipeline:
  
  `new → contacted → qualified → won / lost`

- Assign leads to sales representatives

### 📝 Task / Follow-Up Management
- Create follow-up tasks for leads
- Assign tasks:
  - Admin → any user
  - Sales → self only
- Task states:
  - `pending`
  - `completed`
  - `missed`
- Only assigned users can complete tasks

### 💬 Interaction Management
- Log interactions for leads:
  - Call
  - Email
  - Meeting
- Maintain interaction history per lead

### ⏰ Automated Reminders
- Background cron job checks overdue tasks
- Sends email reminders automatically
- Prevents duplicate reminders using flags

### 📊 Dashboard Analytics (Admin)
- KPI cards:
  - Total leads
  - Qualified leads
  - Revenue
- Charts:
  - Leads by status
  - Monthly revenue
  - Sales performance
- Overdue follow-ups table

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Nodemailer (Email)
- node-cron (Scheduled jobs)

### Frontend
- React (Vite)
- React Router
- Axios
- Recharts (Charts)
- CSS Modules

---

## 📁 Project Structure

### Backend
```bash
backend/
├── src/
│   ├── controllers/       # Route handlers
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API routes
│   ├── middleware/       # Auth & role middleware
│   ├── utils/           # Email utility
│   ├── cron/            # Scheduled jobs
│   └── index.js         # Entry point
├── .env                 # Environment variables
└── package.json
```

### Frontend
```bash
frontend/
 ├── src/
 │   ├── pages/          # Route components
 │   ├── components/     # Reusable UI components
 │   ├── api/           # Axios API calls
 │   ├── context/       # React context (Auth)
 │   ├── Layout/        # App layout (Sidebar, Header)
 │   └── main.jsx       # Entry point
 ├── package.json
 └── vite.config.js
```

---

## ✅ Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local or Atlas)
- npm or yarn
- Gmail account (for email notifications)

---

## ⚙️ Installation

### 1️⃣ Clone the Repository
```bash
git clone <repo-url>
cd CRM_Project
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```

Create `.env` file in `backend/` directory:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/crm_db
JWT_SECRET=supersecretkey

EMAIL_USER=yourgmail@gmail.com
EMAIL_PASS=your_gmail_app_password
```

Start backend:
```bash
npm run dev
```

### 3️⃣ Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 🗄 Database Models

### User
- `name` - Full name
- `email` - Unique email
- `password` - Hashed password
- `role` - `admin` / `sales`
- `isActive` - Account status

### Lead
- `name` - Lead name
- `email` - Contact email
- `phone` - Phone number
- `source` - `website` / `referral` / `ads` / `cold-call`
- `status` - `new` / `contacted` / `qualified` / `won` / `lost`
- `expectedValue` - Estimated deal value
- `assignedTo` - Assigned sales rep
- `isActive` - Lead status

### Task
- `lead` - Associated lead
- `assignedTo` - Responsible user
- `dueDate` - Task due date
- `status` - `pending` / `completed` / `missed`
- `reminderSent` - Email reminder flag

### Interaction
- `lead` - Associated lead
- `type` - `call` / `email` / `meeting`
- `notes` - Interaction details
- `createdBy` - User who logged

### Deal
- `lead` - Associated lead
- `amount` - Deal value
- `stage` - `proposal` / `negotiation` / `closed`
- `status` - `open` / `won` / `lost`

---

## 🔌 API Endpoints (Overview)

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/register` | User registration |
| GET | `/api/auth/me` | Current user info |

### Users (Admin only)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| POST | `/api/users` | Create new user |
| PATCH | `/api/users/:id/status` | Toggle user status |

### Leads
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/leads` | Get all leads |
| POST | `/api/leads` | Create new lead |
| GET | `/api/leads/:id` | Get lead details |
| PATCH | `/api/leads/:id` | Update lead |
| DELETE | `/api/leads/:id` | Delete lead |

### Tasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get tasks |
| POST | `/api/tasks` | Create task |
| PATCH | `/api/tasks/:id` | Update task |
| PATCH | `/api/tasks/:id/complete` | Complete task |
| GET | `/api/tasks/lead/:id` | Tasks for lead |

### Interactions
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/interactions` | Get interactions |
| POST | `/api/interactions` | Log interaction |

### Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard/stats` | KPI statistics |
| GET | `/api/dashboard/leads-by-status` | Lead distribution |
| GET | `/api/dashboard/revenue` | Monthly revenue |
| GET | `/api/dashboard/sales-performance` | Sales rep metrics |
| GET | `/api/dashboard/overdue-tasks` | Overdue tasks |

---

## 👤 User Roles & Permissions

### Admin
- Full system access
- Manage users
- Assign leads & tasks
- View analytics dashboard
- Access all data

### Sales
- View assigned leads
- Create interactions
- Complete assigned tasks
- Cannot manage users
- View only own data

---

## 🌱 Seeding Demo Data

The backend includes a seed script to populate demo data:

```bash
cd backend
npm run seed
```

This will create:
- 1 Admin user
- 1 Sales user
- 2 Sample leads
- 1 Interaction
- 1 Task
- 1 Deal

---

## ▶️ Running the Application

### Backend
```bash
cd backend
npm run dev
```
Runs on: `http://localhost:5000`

### Frontend
```bash
cd frontend
npm run dev
```
Runs on: `http://localhost:5173`

---

## 🔐 Default Test Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@test.com | admin123 |
| Sales | sales@test.com | sales123 |

---

## 📧 Email Configuration

For automated reminders to work, configure Gmail SMTP:

1. Enable 2-Factor Authentication on Gmail
2. Generate an App Password:
   - Go to Google Account → Security → 2-Step Verification → App passwords
3. Use the 16-character password in `EMAIL_PASS`

Or use any other SMTP provider by modifying `backend/src/utils/email.js`.

---

## 🧪 Future Improvements

- Add unit and integration tests
- Set up CI/CD pipeline
- Docker Compose for fullstack local dev
- Deploy scripts for production
- Email template customization
- Lead import/export functionality
- Advanced analytics and reporting
- Mobile-responsive design improvements

---

## 📝 License

ISC License

---

## 🤝 Contributing

This is a demo/interview project, but suggestions are welcome:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

**Built with ❤️ using Node.js, Express, React, and MongoDB**

