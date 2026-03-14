import { useState } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="navbar" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", position: "relative", zIndex: 1000 }}>

        {/* Logo */}
        <div className="logo-container">
          <img src="/images/isro-logo.png" alt="ISRO" className="logo-img" />
          <span className="logo-text">ISRO</span>
        </div>

        {/* Desktop nav */}
        <nav className="desktop-nav">
          <ul className="nav-links">
            {navLinks.map(link => (
              <li key={link.to}>
                <Link to={link.to} style={{
                  color: location.pathname === link.to ? "#00d4ff" : "white",
                  borderBottom: location.pathname === link.to ? "2px solid #00d4ff" : "2px solid transparent",
                  paddingBottom: "4px", transition: "all 0.2s ease",
                }}>
                  {link.label}
                </Link>
              </li>
            ))}
            {auth?.permissions === "all" && (
              <li><Link to="/admin" style={{ color: "#f97316" }}>ADMIN</Link></li>
            )}
            <li>
              {auth
                ? <span style={{ color: "#00d4ff", cursor: "pointer", fontWeight: "bold" }} onClick={logout}>
                    {auth.role} | LOGOUT
                  </span>
                : <Link to="/access" style={{ color: "#00d4ff", fontWeight: "bold" }}>LOGIN</Link>
              }
            </li>
          </ul>
        </nav>

        {/* Hamburger button — mobile only */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none", flexDirection: "column", gap: "5px",
            background: "transparent", border: "none", cursor: "pointer",
            padding: "8px",
          }}
        >
          <span style={{ width: "24px", height: "2px", background: menuOpen ? "#00d4ff" : "#fff", display: "block", transition: "all 0.3s ease", transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
          <span style={{ width: "24px", height: "2px", background: "#fff", display: "block", transition: "all 0.3s ease", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ width: "24px", height: "2px", background: menuOpen ? "#00d4ff" : "#fff", display: "block", transition: "all 0.3s ease", transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
        </button>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 999,
          background: "rgba(0,8,20,0.98)", backdropFilter: "blur(10px)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: "32px",
        }} onClick={closeMenu}>
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} onClick={closeMenu} style={{
              color: location.pathname === link.to ? "#00d4ff" : "#fff",
              fontSize: "1.3rem", letterSpacing: "4px",
              fontFamily: "monospace", fontWeight: "bold",
              textDecoration: "none",
              borderBottom: location.pathname === link.to ? "2px solid #00d4ff" : "2px solid transparent",
              paddingBottom: "4px",
            }}>
              {link.label}
            </Link>
          ))}
          {auth?.permissions === "all" && (
            <Link to="/admin" onClick={closeMenu} style={{ color: "#f97316", fontSize: "1.3rem", letterSpacing: "4px", fontFamily: "monospace", fontWeight: "bold", textDecoration: "none" }}>
              ADMIN
            </Link>
          )}
          {auth
            ? <span style={{ color: "#00d4ff", cursor: "pointer", fontSize: "1rem", letterSpacing: "3px", fontFamily: "monospace" }} onClick={() => { logout(); closeMenu(); }}>
                {auth.role} | LOGOUT
              </span>
            : <Link to="/access" onClick={closeMenu} style={{ color: "#00d4ff", fontSize: "1.3rem", letterSpacing: "4px", fontFamily: "monospace", fontWeight: "bold", textDecoration: "none" }}>
                LOGIN
              </Link>
          }
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}

export default Navbar;