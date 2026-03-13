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

function App() {
  return (
    <AuthProvider>  {/* ← wrap everything */}
      <Router>
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
          <Route path="/admin" element={<AdminDashboard />}/>
        </Routes>
      </Router>
    </AuthProvider> 
  );
}

export default App;