# SB Store | Premium Combat Gear Hub 🥊

SB Store is a high-performance, editorial e-commerce platform designed for professional combat sports enthusiasts. Built with a minimalist "Lean Performance" philosophy, it merges cutting-edge full-stack technology with a premium Apple-inspired user experience.

## ✨ Key Features

- **Next.js 15 & TypeScript:** Built on the latest App Router architecture for lightning-fast performance and full type safety.
- **Dynamic UX/UI:** Fluid, high-end animations powered by **Framer Motion**, including horizontal scroll storytelling on the About page.
- **Advanced Authentication:** Features a secure email verification flow and a secondary "Access Password" (2FA-style) layer for the administrative dashboard.
- **Full-Scale Admin Hub:** A dedicated secure portal for real-time inventory management with full CRUD capabilities.
- **State Management:** Sophisticated client-side state handling using **Zustand** with persistence middleware.
- **Responsive & Minimalist:** A custom-engineered design system focused on typography and white space, optimized for all devices.

## 🛠️ Tech Stack

- **Frontend:** Next.js 15, React 19, Tailwind CSS, Framer Motion
- **State:** Zustand (Auth & Cart Persistence)
- **Security:** Email OTP Verification, Admin Access Vault
- **API:** Next.js Route Handlers (Server-side CRUD)

## 🔐 Security Notice

This repository uses a dual-layer security model. While the public-facing store is open to all, the **Inventory Hub** is protected by both standard authentication and a secondary hardware/password-based access key. Sensitive data and private inventory files are excluded from this repository via `.gitignore`.

## 🚀 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Dpehect/SB-Store.git
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env.local` file based on `.env.example` (if applicable) and configure your secrets.

4. **Run development server:**
   ```bash
   npm run dev
   ```

---

*This project was developed with precision to demonstrate high-end web engineering standards. 2026*
