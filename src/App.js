import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateUnit from "./pages/CreateUnit";
import LandingPage from "./pages/LandingPage"; // Import new landing page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} /> {/* Landing Page as default */}
        <Route path="/:unit" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-unit" element={<CreateUnit />} />
      </Routes>
    </Router>
  );
}

export default App;
