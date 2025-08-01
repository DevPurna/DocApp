import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DoctorProfile from "./pages/DoctorProfile";

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/doctor/:id" element={<DoctorProfile />} />
  </Routes>
);

export default App;
