import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Missions from "./pages/Missions";
import Rockets from "./pages/Rockets";
import "./styles/style.css";
import Satellites from "./pages/Satellites";
import Scientists from "./pages/Scientists";
import Astronauts from "./pages/Astronauts";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/missions" element={<Missions />} />
        <Route path="/rockets" element={<Rockets />} />
        <Route path="/satellites" element={<Satellites />} />
        <Route path="/scientists" element={<Scientists />} />
        <Route path="/astronauts" element={<Astronauts />} />
      </Routes>
    </Router>
  );
}

export default App;
