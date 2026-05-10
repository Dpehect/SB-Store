# SB Store | Technical Documentation

SB Store is a high-performance e-commerce application specialized in professional combat sports equipment. The platform is engineered to deliver an editorial shopping experience while maintaining rigorous technical standards in security, state management, and real-time inventory control.

## Technical Architecture

The application is built using Next.js 15 and the App Router, utilizing React 19 for efficient component rendering and advanced server-side capabilities. The primary goal of the architecture is to provide a seamless, high-speed interface that scales effectively.

### Framework and Core Technologies
- **Next.js 15:** Utilizes the latest App Router features for optimized routing and server-side logic.
- **TypeScript:** Implemented across the entire codebase to ensure strict type safety and maintainable architectural patterns.
- **Zustand:** Employed for client-side state management, utilizing persistence middleware to maintain session and cart data across page reloads.
- **Framer Motion:** Used to develop complex, high-end animations, including custom horizontal scroll storytelling and fluid UI transitions.
- **Tailwind CSS:** Configured for a minimalist, utility-first design system that emphasizes high-end typography and structured layouts.

### Authentication and Security Logic
The platform features a multi-layered security architecture designed to protect both user data and administrative operations:
- **Email Verification Flow:** A robust OTP-based system ensures that all registered users are verified before accessing personalized features.
- **Dual-Factor Admin Access:** The administrative dashboard is protected by a secondary "Access Vault" layer. Even with a standard login, administrative actions require a specific access password verified against a secure internal logic.
- **Secure Route Handlers:** API routes are designed with server-side validation to prevent unauthorized CRUD operations on the product database.

### Data Management and API
The system uses a custom-built API layer to manage product inventory:
- **Scalable CRUD System:** Supports full Create, Read, Update, and Delete operations for products, categories, and brands.
- **Dynamic Inventory Logic:** The inventory engine supports automated brand extraction and real-time filtering based on complex product metadata.
- **File-Based Persistence:** Currently utilizes a structured JSON-based storage for rapid data retrieval, with an architecture ready for migration to relational databases.

## Deployment and Infrastructure

The application is optimized for deployment on the Vercel platform, leveraging edge functions and image optimization for global delivery. 

### Local Installation

1. Clone the repository to your local environment.
2. Execute `npm install` to manage dependencies.
3. Configure necessary environment variables for authentication and security tokens.
4. Launch the development environment using `npm run dev`.

This project serves as a comprehensive demonstration of modern web engineering, prioritizing security, performance, and a premium user experience.
