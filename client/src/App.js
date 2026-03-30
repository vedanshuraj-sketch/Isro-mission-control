import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Missions from "./pages/Missions";
import Rockets from "./pages/Rockets";
import Satellites from "./pages/Satellites";
import Scientists from "./pages/Scientists";
import Astronauts from "./pages/Astronauts";
import LaunchSites from "./pages/Launchsites";
import Access from "./pages/Access";
import AdminDashboard from "./pages/Admindashboard";
import "./styles/style.css";

function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const click = () => { setClicked(true); setTimeout(() => setClicked(false), 300); };
    window.addEventListener("mousemove", move);
    window.addEventListener("click", click);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("click", click); };
  }, []);

  useEffect(() => {
    let frame;
    const animate = () => {
      setTrail(prev => ({
        x: prev.x + (pos.x - prev.x) * 0.08,
        y: prev.y + (pos.y - prev.y) * 0.08,
      }));
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [pos]);

  return (
    <>
      <div style={{
        position: "fixed", zIndex: 99999, pointerEvents: "none",
        left: pos.x, top: pos.y,
        width: clicked ? "12px" : "6px",
        height: clicked ? "12px" : "6px",
        background: "#00d4ff", borderRadius: "50%",
        transform: "translate(-50%, -50%)",
        transition: "width 0.2s, height 0.2s",
        boxShadow: "0 0 10px #00d4ff",
      }} />
      <div style={{
        position: "fixed", zIndex: 99998, pointerEvents: "none",
        left: trail.x, top: trail.y,
        width: clicked ? "50px" : "36px",
        height: clicked ? "50px" : "36px",
        border: "1px solid rgba(0,212,255,0.5)",
        borderRadius: "50%",
        transform: "translate(-50%, -50%)",
        transition: "width 0.3s, height 0.3s",
        background: "rgba(0,212,255,0.03)",
      }} />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <CustomCursor />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/missions" element={<Missions />} />
          <Route path="/rockets" element={<Rockets />} />
          <Route path="/satellites" element={<Satellites />} />
          <Route path="/scientists" element={<Scientists />} />
          <Route path="/astronauts" element={<Astronauts />} />
          <Route path="/launch-sites" element={<LaunchSites />} />
          <Route path="/access" element={<Access />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;