import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import DoctorProfile from "./pages/DoctorProfile"
import Appointment from "./pages/Appointment"

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/doctor/:id" element={<DoctorProfile />} />
    <Route path="/appointment" element={<Appointment />} />
  </Routes>
)

export default App