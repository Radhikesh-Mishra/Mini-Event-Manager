# 🗓️ Mini Event Manager App

A full-stack event management application where users can register, view, and manage events. Built with the **MERN Stack**, JWT authentication, and styled using **Tailwind CSS**.

---

## 🚀 Features

- 🔐 **User Authentication**  
  Users can sign up or log in using JWT-based authentication.

- 🏠 **Home Page**  
  Once logged in, users are navigated to the home page featuring:
  - A navbar with a **Logout** button (logs the user out and redirects to the login/register page).
  - A **Welcome Message**.
  - A button to **Add New Event** (opens a modal to submit new events).
  - A **View Toggle Button** to switch between:
    - **Card View** (default)
    - **Table View**

- 📋 **Event Interactions**  
  Users can:
  - **Register** for events.
  - **View Details** of any event.

- 📄 **Event Details Page**  
  Each event has a dedicated page showing:
  - Event Title, Location, Time, and Description.
  - A **table listing all users** registered for the event (including their name, email, and contact info).

---

## 🛠 Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)

---

## 📦 Installation & Running the App

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/mini-event-manager.git
   cd mini-event-manager```
2. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev```
3. **Setup Backend**
   ```bash
   cd frontend
   npm install
   npm run dev```

## 📁 Project Structure

```plaintext
appointment-app/
├── public/
├── src/
│   ├── components/
│   │   ├── AppointmentForm.jsx
│   │   └── AppointmentList.jsx
│   ├── redux/
│   │   ├── store.js
│   │   └── userSlice.js
│   ├── App.js
│   ├── App.css
│   └── main.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
 ```

## Screenshots
![WhatsApp Image 2025-06-11 at 6 24 57 PM](https://github.com/user-attachments/assets/ce43c519-6260-47c5-8211-4044f4d465ce)
![WhatsApp Image 2025-06-11 at 6 25 35 PM](https://github.com/user-attachments/assets/bcc90c3e-759e-492a-957c-e2a275e2c9f1)
![WhatsApp Image 2025-06-11 at 6 25 50 PM](https://github.com/user-attachments/assets/806b978a-3866-4250-8ab8-7b3bf8c2acb1)
![WhatsApp Image 2025-06-11 at 6 24 21 PM](https://github.com/user-attachments/assets/be803e14-bab8-4742-b59f-d08ebc347530)
![WhatsApp Image 2025-06-11 at 6 25 18 PM](https://github.com/user-attachments/assets/7af92d18-379d-4579-b724-fee5e7ea40a9)
