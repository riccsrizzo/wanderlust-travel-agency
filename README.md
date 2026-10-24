# 🌍 Wanderlust - Travel Agency Web Application

Wanderlust is a modern, full-stack web application for a travel agency where users can browse featured travel packages, filter destinations by categories/continents, plan custom itineraries, read client testimonials, and manage user authentication/favorites.

---

## 🚀 Tech Stack

### **Frontend**
* **React** (Vite)
* **Tailwind CSS** (Styling & Responsive Layouts)
* **React Router DOM** (Client-side Navigation & Smooth Scrolling)
* **Lucide React / SVG Icons** (UI Elements)

### **Backend**
* **Node.js** & **Express**
* **Better Auth** (User Authentication & Session Management)
* **Drizzle ORM** (TypeScript-first ORM)
* **PostgreSQL** (Hosted on Neon Database)
* **CORS** & **Static File Serving** (Express Middleware)

---

## ✨ Features

- 📱 **Fully Responsive UI:** Optimized for desktop, tablet, and mobile devices (includes a custom mobile hamburger menu).
- 🔐 **User Authentication:** Sign up, sign in, and session persistence powered by Better Auth.
- 🏝️ **Dynamic Travel Packages:** Fetch and display curated holiday packages filtered by category or continent.
- 📖 **Detailed Destination Pages:** Dedicated views for individual package details accessible via URL slugs.
- 📝 **Custom Trip Planner (`PlanTrip`):** Interactive itinerary planning form with automated backend request handling and user pre-filling.
- 💬 **Client Testimonials:** Dynamic reviews section backed by PostgreSQL database records.
- 🖼️ **Local Image Hosting:** Optimized static image assets served directly via Express (`/uploads` route).

---

## 📁 Project Structure

```text
wanderlust-travel-agency/
├── client/                     # React Frontend (Vite)
│   ├── src/
│   │   ├── components/         # Header, AuthModal, PlanTrip, MainContent, etc.
│   │   ├── services/           # api.js & auth-client.js
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
└── server/                     # Express Backend
    ├── uploads/                # Local static images (Hero, Packages, Testimonials)
    ├── src/
    │   ├── db/                 # Drizzle schema, migrations, and seed scripts
    │   ├── routes/             # API routes (packages, testimonials, plan-trip)
    │   ├── auth.js             # Better Auth configuration
    │   └── index.js            # Server entry point
    ├── .env                    # Environment variables (git-ignored)
    └── package.json
```

---

## 🛠️ Getting Started Locally

### **Prerequisites**
- Node.js (v18 or higher)
- PostgreSQL database instance (e.g., [Neon](https://neon.tech))

---

### **1. Clone the Repository**

```bash
git clone https://github.com/your-username/wanderlust-travel-agency.git
cd wanderlust-travel-agency
```

---

### **2. Configure Environment Variables**

Create a `.env` file inside the `server/` directory:

```env
PORT=5000
DATABASE_URL=postgresql://user:password@ep-sample-pooler.neon.tech/neondb
BETTER_AUTH_SECRET=your_32_byte_secret_key_here
BETTER_AUTH_URL=http://localhost:5000
```

> **Tip:** You can generate a random 32-byte secret using Node.js:
> ```bash
> node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
> ```

---

### **3. Install Dependencies & Seed Database**

#### **Backend Setup**
```bash
cd server
npm install
npm run db:push   # Push Drizzle schema to PostgreSQL
npm run db:seed   # (Optional) Seed initial package and testimonial data
```

#### **Frontend Setup**
```bash
cd ../client
npm install
```

---

### **4. Running the Application**

Open two separate terminal windows:

* **Terminal 1 (Backend):**
  ```bash
  cd server
  npm start
  # Server will run at http://localhost:5000
  ```

* **Terminal 2 (Frontend):**
  ```bash
  cd client
  npm run dev
  # Frontend will run at http://localhost:5173
  ```

---

## 🌐 Database Management Studio

To launch Drizzle Studio and inspect database tables visually:

```bash
cd server
npm run db:studio
```

---

## 🚢 Deployment Strategy

- **Database:** Hosted on **Neon Database** (PostgreSQL).
- **Backend:** Deployed on **Railway** with `DATABASE_URL`, `BETTER_AUTH_SECRET`, and `BETTER_AUTH_URL` variables configured.
- **Frontend:** Deployed on **Vercel** with `VITE_API_URL` pointing to the Railway API endpoint.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
