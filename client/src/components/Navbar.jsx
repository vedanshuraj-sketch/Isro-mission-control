import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <div className="logo-container">
        <span className="logo-text">ISRO</span>
      </div>

      <nav>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/missions">Missions</Link></li>
          <li><Link to="/rockets">Rockets</Link></li>
          <li><Link to="/satellites">Satellites</Link></li>
          <li><Link to="/scientists">Scientists</Link></li>
          <li><Link to="/astronauts">Astronauts</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
