# 🌍 Wanderlust Travel Agency

<div align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-Frontend-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-Styling-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Git](https://img.shields.io/badge/Workflow-Feature_Branch-F05032?style=for-the-badge&logo=git&logoColor=white)

A modern, fully responsive web application for **Wanderlust Travel Agency**, successfully migrated from a static HTML/CSS template to a component-driven architecture using **React** and **Tailwind CSS v4**.

</div>

---

## 🚀 Overview & Objectives

This project elevates the original static assignment into a scalable, high-performance single-page application (SPA). Key achievements in this migration include:
* **Component Modularization:** Breaking down monolithic HTML structures into reusable, clean React components.
* **Design Fidelity:** Preserving 100% of the original visual identity, color palette, custom layouts, and typography.
* **Enhanced Interactivity:** Implementing dynamic state management for category filtering without full page reloads.

---

## 📂 Project Architecture

```text
src/
├── assets/images/        # Curated tour photos and traveler avatars
├── components/
│   ├── Header.jsx        # Navigation bar with responsive anchor links
│   ├── Hero.jsx          # Hero banner introducing the agency experience
│   ├── MainContent.jsx   # Interactive destination catalog with dynamic category filtering (useState)
│   ├── Testimonials.jsx  # Authentic traveler feedback and review cards
│   ├── PlanTrip.jsx      # Custom trip planning and booking form layout
│   └── Footer.jsx        # Professional footer with service navigation links
├── App.jsx               # Central layout orchestrator utilizing React fragments
├── index.css             # Tailwind CSS v4 imports and global smooth-scroll rules
└── main.jsx              # React DOM mounting point
```

## ✨ Key Features

* **Interactive Destination Filtering:** The catalog (MainContent) leverages React's useState hook to filter tour packages instantly by category.

* **Seamless Navigation:** Integrated CSS scroll-behavior: smooth for fluid transitions when navigating via anchor links (#hero, #testimonials, #plan-trip).

* **Tailwind CSS v4 Integration:** Modern utility-first styling utilizing @tailwindcss/vite for optimized build times and clean markup.

* **Authentic Design & Forms:** Faithful recreation of the custom booking form and traveler testimonial cards.

⚙️ Getting Started Locally
To run and evaluate this project locally:

Clone the repository:

```text

git clone <repository-url>
cd <project-folder>
Install dependencies:

npm install
Run the development server:


npm run dev
Open in your browser:
Navigate to http://localhost:5173 to view the application.

```

📌 Instructor Evaluation Notes
Code Quality: Clean separation of concerns with modular component design.

Version Control: Managed via feature branch (feature/react-migration) using professional Conventional Commits.

Performance: Blazing-fast asset bundling powered by Vite and Tailwind CSS v4.