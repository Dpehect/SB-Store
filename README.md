# SB Store

This is a professional-grade e-commerce platform built for high-end combat gear. The focus throughout development was on creating a fast, secure, and visually cohesive experience that mirrors the quality of the products themselves.

## Technical Implementation

The project is built on Next.js 15 and React 19, utilizing the App Router for efficient server-side rendering and routing. Type safety was a priority, so the entire codebase is written in TypeScript to handle complex product metadata and user states reliably.

For state management, I used Zustand with persistence middleware. This ensures that the shopping cart and authentication status remain consistent even if the user refreshes the page or returns later, which is a key part of a smooth UX.

## Security and Authentication

A major part of the development was focused on securing the user and admin environments. I implemented a mandatory email OTP verification system to validate new accounts and ensure a clean user database. 

On the administrative side, there is a secondary layer of protection. Even after a standard login, the admin dashboard requires an additional access password (similar to a 2FA flow) before any inventory or product data can be modified. This prevents unauthorized CRUD operations even in the event of a compromised session.

## UI/UX and Performance

The design follows a minimalist editorial aesthetic inspired by premium brands. I used Framer Motion to handle advanced animations, specifically the horizontal scroll storytelling on the About page and fluid transitions between categories. 

The backend logic is handled through server-side route handlers that manage the inventory, dynamic brand filtering, and real-time categorization. The current architecture uses a structured JSON-based storage for speed, but it's designed to be easily migrated to a relational database like PostgreSQL as the inventory scales.

The overall goal was to build a system that is as robust on the backend as it is polished on the frontend.
