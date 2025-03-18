import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateUnit from "./pages/CreateUnit";
// import SwappyHub from "./pages/SwappyHub"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:unit" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-unit" element={<CreateUnit />} />
        {/* <Route path="/swappy-hub" element={<SwappyHub />} />  */}
      </Routes>
    </Router>
  );
}

export default App;
