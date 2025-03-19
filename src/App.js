import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Browse from "./pages/Browse";
import AddSwappy from "./pages/AddSwappy";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage"; // Import new landing page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} /> {/* Landing Page as default */}
        <Route path="/:unit" element={<Browse />} />
        <Route path="/xuj8sg25sq/:unit" element={<AddSwappy />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
