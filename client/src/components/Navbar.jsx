import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/missions", label: "Missions" },
  { to: "/rockets", label: "Rockets" },
  { to: "/satellites", label: "Satellites" },
  { to: "/scientists", label: "Scientists" },
  { to: "/astronauts", label: "Astronauts" },
  { to: "/launch-sites", label: "Launch Sites" },
];

function Navbar() {
  const location = useLocation();
  const { auth, logout } = useAuth();
  return (
    <header className="navbar">
      {/* Logo */}
      <div className="logo-container">
        <img src="/images/isro-logo.png" alt="ISRO" className="logo-img" />
        <span className="logo-text">ISRO</span>
      </div>

      <nav>
        <ul className="nav-links">
          {navLinks.map(link => (
            <li key={link.to}>
              <Link
                to={link.to}
                style={{
                  color: location.pathname === link.to ? "#00d4ff" : "white",
                  borderBottom: location.pathname === link.to ? "2px solid #00d4ff" : "2px solid transparent",
                  paddingBottom: "4px",
                  transition: "all 0.2s ease",
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            {auth
              ? <span style={{ color: "#00d4ff", cursor: "pointer" }} onClick={logout}>
                {auth.role} | LOGOUT
              </span>
              : <Link to="/access" style={{ color: "#00d4ff" }}>LOGIN</Link>
            }
          </li>
          <li>
            {auth?.permissions === "all" && (
  <li>
    <Link to="/admin" style={{ color: "#f97316" }}>ADMIN</Link>
  </li>
)}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;