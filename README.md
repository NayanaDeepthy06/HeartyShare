
# 🍽️ HeartShare – Food Donation Web Application

> **Connecting Hearts. Sharing Food. Reducing Waste.**

HeartShare is a full-stack web application designed to connect individuals and organizations willing to donate surplus food with people in need. Inspired by the goal of minimizing food waste and maximizing community impact, HeartShare bridges the gap between food donors and beneficiaries through a secure, accessible, and real-time platform.

---

## 🌟 Features

- 🔐 **Authentication**  
  Secure user login and registration using **Firebase Authentication** (Email/Password and Google OAuth).

- 🗃️ **Real-time Database**  
  Donation posts are stored and updated dynamically using **Firebase Firestore**.

- 🧑‍🍳 **Role-based Access**  
  Authenticated users can donate food, while the public can browse available donations without login.

- 💡 **Modern UI/UX**  
  Responsive interface with real-time form validation, show/hide password toggle, and mobile-friendly design.

- 🔎 **Donation Feed**  
  Instantly view food availability from various donors in a clean and organized layout.

---

## 🛠️ Tech Stack

| Frontend         | Backend           | Authentication    | Database         | Hosting        |
|------------------|-------------------|--------------------|------------------|----------------|
| HTML, CSS, JavaScript | Node.js (modular JS) | Firebase Auth (OAuth + Email) | Firebase Firestore | Netlify |

---

## 🚀 How to Run Locally

Follow the steps below to run the **HeartShare** application on your local machine:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/nayanadeepthy/Heartyshare
   cd Heartyshare
   ```

2. **Open `index.html` in Your Browser**

   Since this is a Firebase-powered static web application, you can directly open the `index.html` file in your preferred browser.

3. **Set Up Firebase Configuration**

   - Navigate to your Firebase project.
   - Enable **Authentication** (Email/Password and Google).
   - Enable **Firestore Database**.
   - In your project files, locate `firebase-config.js`.
   - Replace the placeholder values with your actual Firebase config:

     ```javascript
     const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID"
     };
     ```

4. **You're Ready!**  
   The app will now be functional and can be accessed via `index.html` with real-time Firestore database connectivity and authentication.

---

## 🎯 Use Case & Impact

- **Students** and **families** can share leftover food from events or households.
- **Restaurants** and **cafeterias** can avoid food waste and support local communities.
- Enables NGOs to **track available resources** and connect with donors efficiently.

> 💬 _"A small effort to share a meal could make a big difference in someone’s life."_  

---

## 📸 Screenshots

<!-- Add real screenshots later -->
- 👤 Login / Signup Page  
- 📦 Donate Food Form  
- 🗂️ View Donations Page  
- 🔒 Secure Authentication Flow

---

## 🧑‍💻 Developed By

**Nayana Deepthy**  
[LinkedIn](https://www.linkedin.com/in/nayana-deepthy/) • [GitHub](https://github.com/NayanaDeepthy06/)  
B.Tech CSE, Matrusri Engineering College  
_Actively seeking Software Engineering Internships (Summer 2026)_

---

## 📫 Feedback & Contributions

Feel free to **fork**, **star**, or **contribute** via pull requests.  
If you'd like to collaborate or provide feedback, reach out via [nayanadeepthyr@gmail.com](mailto:nayanadeepthyr@gmail.com).

---

## 🏁 Future Enhancements

- 📍 Geolocation-based donation discovery  
- 📱 Progressive Web App (PWA) support  
- 🔔 Email/SMS alerts for food availability  
- 🧾 Admin dashboard for NGOs/volunteers

---
