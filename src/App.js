import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateUnit from "./pages/CreateUnit";
import SwappyHub from "./pages/SwappyHub"; // Import the Swappy interface component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-unit" element={<CreateUnit />} />
        <Route path="/swappy-hub" element={<SwappyHub />} /> {/* New Route */}
      </Routes>
    </Router>
  );
}

export default App;
