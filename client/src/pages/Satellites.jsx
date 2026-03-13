import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const orbitColor = (orbit) => {
  const map = {
    "LEO": "#00d4ff", "GEO": "#a855f7", "GTO": "#f97316",
    "SSO": "#22c55e", "Lunar Orbit": "#facc15",
    "Mars Orbit": "#ef4444", "L1 Orbit": "#ec4899",
  };
  return map[orbit] || "#00d4ff";
};

const purposeIcon = (purpose) => {
  if (!purpose) return "🛰️";
  if (purpose.includes("Communication")) return "📡";
  if (purpose.includes("Earth") || purpose.includes("Imaging")) return "🌍";
  if (purpose.includes("Lunar") || purpose.includes("Moon")) return "🌕";
  if (purpose.includes("Mars")) return "🔴";
  if (purpose.includes("Solar") || purpose.includes("Sun")) return "☀️";
  if (purpose.includes("Astronomy")) return "🔭";
  if (purpose.includes("Radar")) return "📻";
  return "🛰️";
};

const emptyForm = { satellite_name: "", purpose: "", orbit_type: "", weight_kg: "", mission_id: "" };

function SatelliteModal({ isOpen, onClose, onSubmit, initial, isLoading }) {
  const [form, setForm] = useState(initial || emptyForm);
  useEffect(() => { setForm(initial || emptyForm); }, [initial]);
  if (!isOpen) return null;
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="modal show" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ width: "460px" }}>
        <span className="close-btn" onClick={onClose}>&times;</span>
        <h2 style={{ marginBottom: "20px", color: "#00d4ff" }}>
          {initial?.satellite_id ? "EDIT SATELLITE" : "ADD SATELLITE"}
        </h2>
        {[
          { label: "Satellite Name", name: "satellite_name", placeholder: "e.g. INSAT-3D" },
          { label: "Purpose", name: "purpose", placeholder: "e.g. Communication" },
          { label: "Orbit Type", name: "orbit_type", placeholder: "e.g. GEO" },
          { label: "Weight (kg)", name: "weight_kg", placeholder: "e.g. 1200", type: "number" },
          { label: "Mission ID", name: "mission_id", placeholder: "e.g. 4", type: "number" },
        ].map(field => (
          <div key={field.name} style={{ marginBottom: "14px" }}>
            <label style={{ color: "#888", fontSize: "0.7rem", letterSpacing: "2px", display: "block", marginBottom: "6px" }}>
              {field.label.toUpperCase()}
            </label>
            <input
              type={field.type || "text"}
              name={field.name}
              value={form[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              style={{
                width: "100%", padding: "10px 14px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(0,212,255,0.3)",
                borderRadius: "6px", color: "#fff",
                fontFamily: "monospace", fontSize: "0.9rem",
                outline: "none", boxSizing: "border-box",
              }}
            />
          </div>
        ))}
        <button onClick={() => onSubmit(form)} disabled={isLoading} style={{
          width: "100%", padding: "12px",
          background: isLoading ? "rgba(0,212,255,0.3)" : "#00d4ff",
          color: "#000", border: "none", borderRadius: "6px",
          fontFamily: "monospace", fontWeight: "bold",
          fontSize: "0.85rem", letterSpacing: "2px",
          cursor: isLoading ? "not-allowed" : "pointer", marginTop: "8px",
        }}>
          {isLoading ? "SAVING..." : (initial?.satellite_id ? "UPDATE" : "ADD SATELLITE")}
        </button>
      </div>
    </div>
  );
}

function SatelliteCard({ satellite, canEdit, onEdit, onDelete }) {
  const [hovered, setHovered] = useState(false);
  const badgeColor = orbitColor(satellite.orbit_type);

  return (
    <div className="rocket-card" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>

      {/* CRUD buttons */}
      {canEdit && (
        <div style={{ position: "absolute", top: "10px", right: "10px", display: "flex", gap: "6px", zIndex: 10 }}>
          <button onClick={(e) => { e.stopPropagation(); onEdit(satellite); }} style={{
            padding: "4px 10px", background: "rgba(0,212,255,0.15)",
            border: "1px solid #00d4ff", color: "#00d4ff",
            borderRadius: "4px", cursor: "pointer",
            fontSize: "0.7rem", fontFamily: "monospace",
          }}>EDIT</button>
          <button onClick={(e) => { e.stopPropagation(); onDelete(satellite.satellite_id); }} style={{
            padding: "4px 10px", background: "rgba(239,68,68,0.15)",
            border: "1px solid #ef4444", color: "#ef4444",
            borderRadius: "4px", cursor: "pointer",
            fontSize: "0.7rem", fontFamily: "monospace",
          }}>DEL</button>
        </div>
      )}

      {/* FRONT */}
      <div className={`rocket-card-front ${hovered ? "faded" : ""}`}>
        <div style={{ fontSize: "3rem", marginBottom: "12px" }}>{purposeIcon(satellite.purpose)}</div>
        <h2 className="rocket-card-name" style={{ fontSize: "1.1rem" }}>{satellite.satellite_name}</h2>
        <span className="mission-type" style={{ background: badgeColor, marginBottom: "15px" }}>{satellite.orbit_type}</span>
        <div className="rocket-card-basic">
          <p><span className="label">Purpose</span><span className="value" style={{ fontSize: "0.82rem" }}>{satellite.purpose}</span></p>
          <p><span className="label">Weight</span><span className="value" style={{ color: badgeColor }}>{satellite.weight_kg} kg</span></p>
          <p><span className="label">Mission</span><span className="value" style={{ fontSize: "0.8rem", color: "#aaa" }}>{satellite.mission_name}</span></p>
        </div>
        {satellite.added_by && (
          <p style={{ marginTop: "10px", fontSize: "0.7rem", color: "#555", letterSpacing: "1px" }}>
            ✦ Added by {satellite.added_by}
          </p>
        )}
        <p className="hover-hint">Hover for details →</p>
      </div>

      {/* BACK */}
      <div className={`rocket-card-back ${hovered ? "visible" : ""}`}>
        <div style={{ fontSize: "2rem", marginBottom: "8px" }}>{purposeIcon(satellite.purpose)}</div>
        <h3 style={{ color: badgeColor, marginBottom: "16px", fontSize: "1rem" }}>{satellite.satellite_name}</h3>
        <div className="specs-grid">
          <div className="spec-item"><span className="spec-label">Satellite ID</span><span className="spec-value">#{satellite.satellite_id}</span></div>
          <div className="spec-item"><span className="spec-label">Weight</span><span className="spec-value">{satellite.weight_kg} kg</span></div>
          <div className="spec-item"><span className="spec-label">Orbit</span><span className="spec-value" style={{ color: badgeColor }}>{satellite.orbit_type}</span></div>
          <div className="spec-item"><span className="spec-label">Purpose</span><span className="spec-value" style={{ fontSize: "0.8rem" }}>{satellite.purpose}</span></div>
        </div>
        <div style={{ marginTop: "12px", background: "rgba(255,255,255,0.04)", borderRadius: "8px", padding: "12px" }}>
          <p style={{ fontSize: "0.75rem", color: "#888", letterSpacing: "1px", marginBottom: "6px" }}>LAUNCHED WITH</p>
          <p style={{ color: "#fff", fontWeight: "bold", fontSize: "0.95rem" }}>{satellite.mission_name}</p>
        </div>
        {satellite.added_by && (
          <p style={{ marginTop: "auto", fontSize: "0.7rem", color: "#555", letterSpacing: "1px" }}>
            ✦ Added by {satellite.added_by}
          </p>
        )}
      </div>
    </div>
  );
}

function Satellites() {
  const [satellites, setSatellites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [saving, setSaving] = useState(false);
  const { auth } = useAuth();

  const canEdit = auth && (auth.permissions === "all" || auth.permissions === "satellites");
  const orbitTypes = ["All", ...new Set(satellites.map(s => s.orbit_type))];
  const filtered = filter === "All" ? satellites : satellites.filter(s => s.orbit_type === filter);

  const fetchSatellites = () => {
    fetch("https://isro-backend-6tlj.onrender.com/api/satellites")
      .then(res => res.json())
      .then(data => { setSatellites(data); setTimeout(() => setIsLoading(false), 500); })
      .catch(err => { console.error(err); setIsLoading(false); });
  };

  useEffect(() => { fetchSatellites(); }, []);

  const handleAdd = () => { setEditTarget(null); setModalOpen(true); };
  const handleEdit = (satellite) => { setEditTarget(satellite); setModalOpen(true); };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this satellite?")) return;
    await fetch(`https://isro-backend-6tlj.onrender.com/api/satellites/${id}`, { method: "DELETE" });
    fetchSatellites();
  };

  const handleSubmit = async (form) => {
    setSaving(true);
    const isEdit = !!editTarget?.satellite_id;
    const url = isEdit
      ? `https://isro-backend-6tlj.onrender.com/api/satellites/${editTarget.satellite_id}`
      : "https://isro-backend-6tlj.onrender.com/api/satellites";
    await fetch(url, {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, added_by: auth?.role }),
    });
    setSaving(false);
    setModalOpen(false);
    fetchSatellites();
  };

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

          {canEdit && (
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <button onClick={handleAdd} style={{
                padding: "10px 28px", background: "rgba(0,212,255,0.1)",
                border: "1px solid #00d4ff", color: "#00d4ff",
                borderRadius: "6px", fontFamily: "monospace",
                fontWeight: "bold", fontSize: "0.85rem",
                letterSpacing: "2px", cursor: "pointer",
              }}>+ ADD SATELLITE</button>
            </div>
          )}

          {/* Filter buttons */}
          <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap", marginBottom: "40px" }}>
            {orbitTypes.map(orbit => (
              <button key={orbit} onClick={() => setFilter(orbit)} style={{
                padding: "6px 16px", borderRadius: "20px",
                border: `1px solid ${filter === orbit ? orbitColor(orbit) : "rgba(255,255,255,0.15)"}`,
                background: filter === orbit ? `${orbitColor(orbit)}22` : "transparent",
                color: filter === orbit ? orbitColor(orbit) : "#888",
                cursor: "pointer", fontFamily: "monospace",
                fontSize: "0.8rem", fontWeight: "bold",
                letterSpacing: "1px", transition: "all 0.2s ease",
              }}>{orbit}</button>
            ))}
          </div>

          {filtered.length === 0 && !isLoading ? (
            <p style={{ color: "#888", textAlign: "center" }}>No satellites found.</p>
          ) : (
            <div className="rockets-grid">
              {filtered.map(satellite => (
                <SatelliteCard
                  key={satellite.satellite_id}
                  satellite={satellite}
                  canEdit={canEdit}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <SatelliteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initial={editTarget}
        isLoading={saving}
      />

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