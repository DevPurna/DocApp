Doctor Appointment Booking App

In this project, let's build a Doctor Appointment Booking App using React by applying concepts such as routing, dynamic rendering, conditional views, component-based architecture, responsive design, and form validation.

📽️ Demo Videos

Desktop View

Failure View Example 


📁 Project Structure

src/components/ – Contains all component folders such as Header, DoctorProfile, etc.

src/assets/ – Contains hardcoded JSON data for doctor profiles and local assets


💡 Features Implemented

View detailed doctor profiles

Dynamic routing with React Router for individual doctor pages

Display booking slots for the next 7 days

Dynamic time slots (changes based on selected date & current time)

Form to enter user name and email for booking

Form validation for required fields

Success message on booking

Responsive design for mobile, tablet, and desktop


📱 Responsive Design

The app is fully responsive:

Hidden sections on smaller screens using sm:hidden and similar classes

Flexible image containers and inputs using Tailwind width utilities like w-full sm:w-2/3 md:w-1/2 lg:w-[35%]

Buttons and inputs adjust size based on screen width


✅ Form Validation

The booking form uses basic client-side validation:

Requires name and email to be non-empty

type="email" ensures valid email format

Displays success confirmation after successful booking


🛠️ Technologies Used

React JS (Functional Components)

React Router

Tailwind CSS for styling and responsiveness

useState and useMemo for state management

Static JSON data (mock backend)


🖥️ Design Considerations

Desktop view includes side-by-side doctor image and information

Mobile view stacks the layout for readability

Scrollable time slot section for better accessibility


⚙️ How to Run the App

Clone the repo

Run npm install to install dependencies

Run npm start to launch the development server

App runs at http://localhost:3000


🔄 Optional Enhancements (Future Scope)

Integrate Express backend to manage doctor data dynamically

Persist appointment bookings

User authentication and profile management


📝 Notes

Doctor data is currently hardcoded in /src/assets/assets.js

No external APIs are used in this version

Focus of this project is on frontend logic and interactivity