# 🌍 ImpactHub: Real-Time Community Response Platform

> **Empowering local communities to act fast during crises.**
> Built for the community, powered by real-time connection.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![Status](https://img.shields.io/badge/Status-Hackathon_Prototype-FF6F00?style=for-the-badge)

## 📌 Elevator Pitch
When local disasters or community needs arise, fragmented communication slows down response times. **ImpactHub** is a centralized, real-time dashboard that bridges the gap between people in need, willing local volunteers, and registered NGOs. 

Whether it's severe waterlogging, a weekend food drive, or structural damage, ImpactHub routes the right people to the right place, instantly.

---

## ✨ Key Features

* **🚨 Live Active Alerts Dashboard:** Real-time feed of community issues, categorized by urgency (Critical, High, Medium) and need type.
* **📍 Geo-Aware Smart Filtering:** Bulletproof, case-insensitive location search allows users to instantly filter crises nearest to their neighborhood (e.g., "Kurukshetra").
* **🤝 "My Impact" Volunteer Profile:** A personalized tracking dashboard where users can manage their accepted missions, view their live volunteer metrics, and resolve completed tasks.
* **🏢 NGO Discovery (Connect Nearby):** A localized search engine connecting users with verified NGOs and relief foundations operating in their immediate area.
* **📸 Proof-of-Need Uploads:** Secure image uploading for issue reporting, handled seamlessly via Multer integration.
* **📊 Live Analytics:** Real-time calculation of active alerts, critical situations, and fulfilled community requests.

---

## 🛠️ Tech Stack

**Frontend:**
* React.js (Vite)
* Tailwind CSS (for rapid, responsive, and modern UI)
* Axios (API Integration)
* Hosted on **Vercel**

**Backend:**
* Node.js & Express.js
* MongoDB & Mongoose (NoSQL Database)
* JSON Web Tokens (JWT) for secure authentication
* Multer (Image handling & storage)
* Hosted on **Render**

---

## 🗺️ Current Scope & Future Roadmap

**Phase 1: Web-Optimized Prototype (Current)**
Currently, **ImpactHub** is deployed as a responsive web prototype. For this hackathon, our primary focus was engineering a robust, real-time backend, implementing secure authentication, and perfecting the geo-aware search algorithms. 

**Phase 2: The Mobile Evolution (Next Steps)**
Because community crises happen on the ground, mobile accessibility is our immediate next priority. Our roadmap includes:
* **📱 Native App Launch:** Developing a dedicated mobile application (iOS & Android) to unlock advanced, life-saving features.
* **🚨 Instant Push Notifications:** Bypassing the need to refresh a web page by sending immediate lock-screen alerts to nearby volunteers when a "Critical" event is raised.
* **📍 Live GPS Tracking:** Allowing users to share live locations during emergency rescues to guide responders directly to them.
* **📶 Offline-First Capabilities:** Enabling users to draft alert requests even when cellular networks go down during disasters, which will automatically sync the moment a signal is restored.


---