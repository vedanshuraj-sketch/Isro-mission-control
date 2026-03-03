import React, { useEffect, useState } from "react";

const orbitColor = (orbit) => {
  const map = {
    "LEO":         "#00d4ff",
    "GEO":         "#a855f7",
    "GTO":         "#f97316",
    "SSO":         "#22c55e",
    "Lunar Orbit": "#facc15",
    "Mars Orbit":  "#ef4444",
    "L1 Orbit":    "#ec4899",
  };
  return map[orbit] || "#00d4ff";
};

const purposeIcon = (purpose) => {
  if (purpose.includes("Communication")) return "📡";
  if (purpose.includes("Earth") || purpose.includes("Imaging")) return "🌍";
  if (purpose.includes("Lunar") || purpose.includes("Moon")) return "🌕";
  if (purpose.includes("Mars")) return "🔴";
  if (purpose.includes("Solar") || purpose.includes("Sun")) return "☀️";
  if (purpose.includes("Astronomy")) return "🔭";
  if (purpose.includes("Radar")) return "📻";
  if (purpose.includes("Technology") || purpose.includes("Test")) return "🛰️";
  return "🛰️";
};

function SatelliteCard({ satellite }) {
  const [hovered, setHovered] = useState(false);
  const badgeColor = orbitColor(satellite.orbit_type);

  return (
    <div
      className="rocket-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* FRONT */}
      <div className={`rocket-card-front ${hovered ? "faded" : ""}`}>
        <div style={{ fontSize: "3rem", marginBottom: "12px" }}>
          {purposeIcon(satellite.purpose)}
        </div>

        <h2 className="rocket-card-name" style={{ fontSize: "1.1rem" }}>
          {satellite.satellite_name}
        </h2>

        <span className="mission-type" style={{ background: badgeColor, marginBottom: "15px" }}>
          {satellite.orbit_type}
        </span>

        <div className="rocket-card-basic">
          <p><span className="label">Purpose</span><span className="value" style={{ fontSize: "0.82rem" }}>{satellite.purpose}</span></p>
          <p><span className="label">Weight</span><span className="value" style={{ color: badgeColor }}>{satellite.weight_kg} kg</span></p>
          <p><span className="label">Mission</span><span className="value" style={{ fontSize: "0.8rem", color: "#aaa" }}>{satellite.mission_name}</span></p>
        </div>

        <p className="hover-hint">Hover for details →</p>
      </div>

      {/* BACK */}
      <div className={`rocket-card-back ${hovered ? "visible" : ""}`}>
        <div style={{ fontSize: "2rem", marginBottom: "8px" }}>{purposeIcon(satellite.purpose)}</div>
        <h3 style={{ color: badgeColor, marginBottom: "16px", fontSize: "1rem" }}>
          {satellite.satellite_name}
        </h3>

        <div className="specs-grid">
          <div className="spec-item">
            <span className="spec-label">Satellite ID</span>
            <span className="spec-value">#{satellite.satellite_id}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Weight</span>
            <span className="spec-value">{satellite.weight_kg} kg</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Orbit</span>
            <span className="spec-value" style={{ color: badgeColor }}>{satellite.orbit_type}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Purpose</span>
            <span className="spec-value" style={{ fontSize: "0.8rem" }}>{satellite.purpose}</span>
          </div>
        </div>

        <div style={{ marginTop: "12px", background: "rgba(255,255,255,0.04)", borderRadius: "8px", padding: "12px" }}>
          <p style={{ fontSize: "0.75rem", color: "#888", letterSpacing: "1px", marginBottom: "6px" }}>LAUNCHED WITH</p>
          <p style={{ color: "#fff", fontWeight: "bold", fontSize: "0.95rem" }}>{satellite.mission_name}</p>
        </div>
      </div>
    </div>
  );
}

function Satellites() {
  const [satellites, setSatellites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  const orbitTypes = ["All", ...new Set(satellites.map(s => s.orbit_type))];

  const filtered = filter === "All"
    ? satellites
    : satellites.filter(s => s.orbit_type === filter);

  useEffect(() => {
    fetch("http://localhost:5000/api/satellites")
      .then(res => res.json())
      .then(data => {
        setSatellites(data);
        setTimeout(() => setIsLoading(false), 500);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="twinkle-layer"></div>
      <div className="nebula"></div>

      <div className={`loader ${!isLoading ? "hidden" : ""}`}>
        <div className="rocket-container">
          <div className="rocket">🛰️</div>
          <p style={{ color: "#00d4ff", marginTop: "15px", letterSpacing: "2px", fontWeight: "bold" }}>
            FETCHING ORBITAL ASSETS...
          </p>
        </div>
      </div>

      <section className="mission-section">
        <div className="container">
          <h1 style={{ textAlign: "center", marginBottom: "10px", textShadow: "0 0 15px rgba(0,212,255,0.5)" }}>
            ISRO Satellites
          </h1>
          <p style={{ textAlign: "center", color: "#888", marginBottom: "30px", letterSpacing: "1px" }}>
            ORBITAL ASSET REGISTRY — {satellites.length} satellites tracked
          </p>

          {/* Filter by orbit type */}
          <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap", marginBottom: "40px" }}>
            {orbitTypes.map(orbit => (
              <button
                key={orbit}
                onClick={() => setFilter(orbit)}
                style={{
                  padding: "6px 16px",
                  borderRadius: "20px",
                  border: `1px solid ${filter === orbit ? orbitColor(orbit) : "rgba(255,255,255,0.15)"}`,
                  background: filter === orbit ? `${orbitColor(orbit)}22` : "transparent",
                  color: filter === orbit ? orbitColor(orbit) : "#888",
                  cursor: "pointer",
                  fontFamily: "monospace",
                  fontSize: "0.8rem",
                  fontWeight: "bold",
                  letterSpacing: "1px",
                  transition: "all 0.2s ease",
                }}
              >
                {orbit}
              </button>
            ))}
          </div>

          {filtered.length === 0 && !isLoading ? (
            <p style={{ color: "#888", textAlign: "center" }}>No satellites found.</p>
          ) : (
            <div className="rockets-grid">
              {filtered.map(satellite => (
                <SatelliteCard key={satellite.satellite_id} satellite={satellite} />
              ))}
            </div>
          )}
        </div>
      </section>

      <style>{`
        .rockets-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 300px)); gap: 30px; justify-content: center; padding-bottom: 80px; }
        .rocket-card { position: relative; min-height: 380px; border-radius: 16px; background: rgba(255,255,255,0.04); backdrop-filter: blur(10px); border: 1px solid rgba(0,212,255,0.15); overflow: hidden; transition: transform 0.3s ease, box-shadow 0.3s ease; cursor: pointer; }
        .rocket-card:hover { transform: translateY(-8px); box-shadow: 0 0 30px rgba(0,212,255,0.2); border-color: rgba(0,212,255,0.4); }
        .rocket-card-front { padding: 24px; display: flex; flex-direction: column; align-items: center; text-align: center; transition: opacity 0.4s ease; }
        .rocket-card-front.faded { opacity: 0; pointer-events: none; }
        .rocket-card-name { font-size: 1.1rem; margin-bottom: 10px; }
        .rocket-card-basic { margin-top: 16px; width: 100%; text-align: left; }
        .rocket-card-basic p { display: flex; justify-content: space-between; margin: 8px 0; font-size: 0.85rem; gap: 8px; }
        .label { color: #888; white-space: nowrap; }
        .value { font-weight: bold; color: #fff; text-align: right; }
        .hover-hint { margin-top: 16px; font-size: 0.75rem; color: #555; letter-spacing: 1px; }
        .rocket-card-back { position: absolute; inset: 0; padding: 24px; background: rgba(11,15,26,0.97); opacity: 0; pointer-events: none; transition: opacity 0.4s ease; display: flex; flex-direction: column; }
        .rocket-card-back.visible { opacity: 1; pointer-events: all; }
        .specs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .spec-item { background: rgba(255,255,255,0.05); border-radius: 8px; padding: 10px 12px; display: flex; flex-direction: column; gap: 4px; }
        .spec-label { font-size: 0.7rem; color: #888; letter-spacing: 1px; text-transform: uppercase; }
        .spec-value { font-size: 0.95rem; font-weight: bold; color: #fff; }
      `}</style>
    </>
  );
}

export default Satellites;