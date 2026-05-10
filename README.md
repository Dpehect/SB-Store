# SB Store

A high-end e-commerce platform for professional combat sports gear. The project focuses on creating a seamless shopping experience using a minimalist editorial design and a solid technical foundation.

## Technical Stack

The application is built with Next.js 15 and TypeScript, using React 19 for the UI. The architecture is designed for performance and clean separation of concerns.

- **Frontend:** Next.js 15 (App Router), Tailwind CSS.
- **State Management:** Zustand with persistent storage for auth and cart data.
- **Animations:** Framer Motion for custom transitions and horizontal scroll behaviors.
- **Security:** Multi-layer authentication including email OTP verification and a protected admin gateway.
- **API Logic:** Server-side route handlers for inventory CRUD operations and dynamic metadata filtering.

## Features

The store includes a fully functional shopping cart, secure checkout with member-specific discount logic, and a dedicated admin dashboard for real-time stock management.

On the design side, I've prioritized typography and layout to create an Apple-style aesthetic. This includes a dynamic homepage that showcases various products and a specialized About page with fluid storytelling elements.

## Development

I developed this platform to address specific challenges in e-commerce, such as maintaining state persistence across sessions and ensuring secure administrative access without compromising UX.

### Getting Started

1. Install dependencies: `npm install`
2. Set up environment variables for authentication.
3. Start the dev server: `npm run dev`

The code is modular and type-safe, making it ready for scaling or migrating to a relational database if needed.
