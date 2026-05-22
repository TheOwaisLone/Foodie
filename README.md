# Foodie: Full-Stack Food Delivery Ecosystem (Monorepo)

Foodie is an enterprise-grade, cross-platform food delivery application built using the **MERN** stack. This monorepo architecture integrates a customer web client, a native cross-platform mobile application, an administrative management panel, and a scalable, real-time backend engine equipped with production payment infrastructure.

---

## 🏗️ Monorepo Architecture

The ecosystem uses a unified workspace layer for zero-friction local development:

```text
.
├── admin/         # Business & Inventory Management Dashboard (React + Vite)
├── backend/       # Core REST API & Real-Time WebSocket Server (Node.js + Express)
├── foodie-app/    # Cross-Platform Native Mobile Client (Expo Go + TypeScript/JS)
├── frontend/      # Customer-Facing Web Marketplace (React + Vite)
└── start-all.sh   # Automated multi-process orchestration engine initialization script
