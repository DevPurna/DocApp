# 🏥 Doctor Appointment Booking App

A responsive, user-friendly Doctor Appointment Booking web app built with React and Tailwind CSS. Users can browse doctor profiles and book appointments by selecting available slots and submitting basic contact information.

---

## 🛠 Tools & Libraries Used

| Technology                          | Purpose                                        |
| ----------------------------------- | ---------------------------------------------- |
| **React.js**                        | Frontend framework for building UI components  |
| **React Router DOM**                | Handles routing between pages                  |
| **Tailwind CSS**                    | Utility-first CSS framework for styling        |
| **JavaScript (ES6)**                | Scripting language for logic and interactivity |
| **HTML5**                           | Markup language for creating the app structure |
| **CSS3**                            | Base styles (enhanced by Tailwind)             |
| **useState, useMemo (React Hooks)** | Manage component state and memoized logic      |
| **Vite / CRA**                      | React development environment                  |

---

## 🚀 Features

- Fully responsive across mobile, tablet, and desktop.
- Doctor profile page with booking slots and real-time date-based time filtering.
- Simple form validation with required fields.
- Confirmation message on booking.
- Scrollable time slots for better UX.
- Optimized image display with fallback responsiveness.

---

## 💡 Improvements with More Time

If given more time, I would implement the following:

1. **Backend Integration**

   - Replace hardcoded doctor data with a real-time **Node.js + Express** backend or integrate with Firebase.
   - Store appointments in a database like MongoDB or MySQL.

2. **Authentication**

   - Add login/logout functionality for users to manage their appointments.

3. **Form Enhancements**

   - Add validation for email format using regex or validation libraries (like Yup or Formik).

4. **Accessibility Enhancements**

   - Implement ARIA roles and keyboard navigation for improved accessibility.

5. **Calendar Integration**

   - Use a third-party library (like `react-calendar`) for smoother date selection and time blocking.

6. **Email Notifications**
   - Trigger confirmation emails using services like EmailJS or NodeMailer.

---

## 🧠 Challenges Faced & Solutions

| Challenge                                                      | Solution                                                                                                                         |
| -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Responsive Design Issues (Image Cutting on Medium Devices)** | Used `object-cover` with `overflow-hidden` and adjusted container sizes with Tailwind responsive utilities.                      |
| **Managing Time Slots for Current Date Only**                  | Used `useMemo` to calculate time slots based on the current date and restricted them using JS logic to show only upcoming slots. |
| **Handling Overlapping States (Date, Time, Form)**             | Used `useState` carefully with conditional rendering and reset logic after submission.                                           |
| **Initial Image Scaling & Clipping on Larger Devices**         | Applied fixed container heights, consistent `w-full` & `h-full` on `img`, and tested with multiple screen widths.                |

---

## 📂 Folder Structure (Optional)

```
src/
│
├── assets/           # Doctor images and data (hardcoded)
├── components/       # Header, Slot, Form etc.
├── pages/            # DoctorProfile.jsx and other main pages
├── App.jsx
├── main.jsx
└── index.css
```

---

## ⚙️ Setup Instructions

```bash
# Clone the repository
git clone https://github.com/yourusername/doctor-appointment-app

# Navigate into the directory
cd doctor-appointment-app

# Install dependencies
npm install

# Start the development server
npm start
```

---

## 📌 Important Notes

- This app is fully client-side. All doctor data is currently hardcoded in `/assets/assets.js`.
- Booking is visual-only and does not persist data unless a backend is added.
