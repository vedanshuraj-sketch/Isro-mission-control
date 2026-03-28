import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

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
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="navbar">
        {/* Logo */}
        <div className="logo-container" onClick={() => window.location.href = '/'}>
          <img src="/images/isro-logo.png" alt="ISRO" className="logo-img" />
          <span className="logo-text">ISRO</span>
        </div>

        {/* Desktop nav */}
        <nav className="desktop-nav">
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={location.pathname === link.to ? "active" : ""}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {auth?.permissions === "all" && (
              <li>
                <Link to="/admin" className="admin-link">ADMIN</Link>
              </li>
            )}
            <li>
              {auth ? (
                <span className="action-link" onClick={logout}>
                  {auth.role} | LOGOUT
                </span>
              ) : (
                <Link to="/access" className="action-link">LOGIN</Link>
              )}
            </li>
          </ul>
        </nav>

        {/* Hamburger button */}
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>

      {/* Mobile menu overlay */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`mobile-link ${location.pathname === link.to ? "active" : ""}`}
            onClick={closeMenu}
          >
            {link.label}
          </Link>
        ))}
        {auth?.permissions === "all" && (
          <Link to="/admin" className="mobile-link mobile-admin" onClick={closeMenu}>
            ADMIN
          </Link>
        )}
        {auth ? (
          <span className="mobile-link mobile-action" onClick={() => { logout(); closeMenu(); }}>
            {auth.role} | LOGOUT
          </span>
        ) : (
          <Link to="/access" className="mobile-link mobile-action" onClick={closeMenu}>
            LOGIN
          </Link>
        )}
      </div>
    </>
  );
}

export default Navbar;