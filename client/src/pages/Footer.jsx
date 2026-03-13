import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer style={{
      background: "#0a0e18",
      borderTop: "1px solid rgba(0,212,255,0.1)",
      padding: "40px 8% 24px",
      fontFamily: "monospace",
    }}>

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexWrap: "wrap",
        gap: "32px",
        marginBottom: "32px",
      }}>

        {/* Left — Branding */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
            <img src="/images/isro-logo.png" alt="ISRO" style={{ height: "32px", objectFit: "contain" }} />
            <span style={{ color: "#a1d0d9", fontWeight: "bold", fontSize: "1.2rem", letterSpacing: "2px" }}>ISRO</span>
          </div>
          <p style={{ color: "#555", fontSize: "0.8rem", lineHeight: "1.6", maxWidth: "280px" }}>
            ISRO Mission Control — An educational project built for academic credit. 
            All data, images and content are used for educational purposes only.
          </p>
          <p style={{ color: "#444", fontSize: "0.75rem", marginTop: "10px" }}>
            ⚠️ Not affiliated with the Indian Space Research Organisation (ISRO).
          </p>
        </div>

        {/* Right — Developer info */}
        <div>
          <p style={{ color: "#00d4ff", letterSpacing: "3px", fontSize: "0.7rem", marginBottom: "12px" }}>
            DEVELOPED BY
          </p>
          <p style={{ color: "#fff", fontWeight: "bold", fontSize: "1rem", marginBottom: "4px" }}>
            Vedanshu Raj
          </p>
          <p style={{ color: "#888", fontSize: "0.85rem", marginBottom: "4px" }}>
            BVM Engineering
          </p>
          <p style={{ color: "#888", fontSize: "0.85rem", marginBottom: "16px" }}>
            Web Technology — Academic Project
          </p>
          <a
            href="https://github.com/vedanshuraj-sketch"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 18px",
              border: "1px solid rgba(0,212,255,0.3)",
              color: "#00d4ff",
              textDecoration: "none",
              fontSize: "0.8rem",
              letterSpacing: "1px",
              transition: "all 0.2s ease",
              borderRadius: "4px",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,212,255,0.1)"; e.currentTarget.style.borderColor = "#00d4ff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(0,212,255,0.3)"; }}
          >
             View on GitHub
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        paddingTop: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "12px",
      }}>
        <p style={{ color: "#444", fontSize: "0.75rem" }}>
          © {new Date().getFullYear()} vedanshu — Made for educational purposes only. All rights belong to their respective owners.
        </p>
        <p style={{ color: "#333", fontSize: "0.75rem" }}>
          Built with React + Express + PostgreSQL
        </p>
      </div>

    </footer>
  );
}

export default Footer;