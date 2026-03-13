import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const rocketImages = {
  "PSLV-XL":    "/images/pslv-xl.avif",
  "GSLV Mk-II": "/images/gslv-ii.jpg",
  "GSLV Mk-III":"/images/gslv-mk3.webp",
  "SSLV":       "/images/sslv_1.jpg",
  "SLV-3":      "/images/slv3.jpg",
};

const rocketSpecs = {
  "PSLV-XL":    { height: "44 m", stages: "4", firstFlight: "1994", successRate: "95%", description: "India's most reliable workhorse rocket. Used for Chandrayaan-1 and Mangalyaan." },
  "GSLV Mk-II": { height: "49 m", stages: "3", firstFlight: "2001", successRate: "80%", description: "Designed to launch heavier communication satellites into GTO." },
  "GSLV Mk-III":{ height: "43.5 m", stages: "3", firstFlight: "2014", successRate: "100%", description: "ISRO's most powerful rocket. Launched Chandrayaan-2 and Chandrayaan-3." },
  "SSLV":       { height: "34 m", stages: "3", firstFlight: "2022", successRate: "50%", description: "Small Satellite Launch Vehicle for rapid, low-cost launches into LEO." },
  "SLV-3":      { height: "22 m", stages: "4", firstFlight: "1979", successRate: "50%", description: "India's first experimental satellite launch vehicle." },
};

const typeColor = (type) => {
  const map = { "PSLV": "#00d4ff", "GSLV": "#a855f7", "Heavy Lift": "#f97316", "Mini LV": "#22c55e" };
  return map[type] || "#00d4ff";
};

const emptyForm = { rocket_name: "", type: "", capacity_kg: "", manufacturer: "" };

function RocketModal({ isOpen, onClose, onSubmit, initial, isLoading }) {
  const [form, setForm] = useState(initial || emptyForm);
  useEffect(() => { setForm(initial || emptyForm); }, [initial]);
  if (!isOpen) return null;
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="modal show" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ width: "460px" }}>
        <span className="close-btn" onClick={onClose}>&times;</span>
        <h2 style={{ marginBottom: "20px", color: "#00d4ff" }}>
          {initial?.rocket_id ? "EDIT ROCKET" : "ADD ROCKET"}
        </h2>
        {[
          { label: "Rocket Name", name: "rocket_name", placeholder: "e.g. PSLV-C60" },
          { label: "Type", name: "type", placeholder: "e.g. PSLV" },
          { label: "Capacity (kg)", name: "capacity_kg", placeholder: "e.g. 1750", type: "number" },
          { label: "Manufacturer", name: "manufacturer", placeholder: "e.g. ISRO" },
        ].map(field => (
          <div key={field.name} style={{ marginBottom: "16px" }}>
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
          {isLoading ? "SAVING..." : (initial?.rocket_id ? "UPDATE" : "ADD ROCKET")}
        </button>
      </div>
    </div>
  );
}

function RocketCard({ rocket, canEdit, onEdit, onDelete }) {
  const [hovered, setHovered] = useState(false);
  const specs = rocketSpecs[rocket.rocket_name] || {};
  const imgSrc = rocketImages[rocket.rocket_name] || null;
  const badgeColor = typeColor(rocket.type);

  return (
    <div className="rocket-card" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>

      {imgSrc && <img src={imgSrc} alt={rocket.rocket_name} className="rocket-bg-img" />}
      <div className="rocket-overlay" />

      {/* CRUD buttons */}
      {canEdit && (
        <div style={{ position: "absolute", top: "10px", right: "10px", display: "flex", gap: "6px", zIndex: 10 }}>
          <button onClick={(e) => { e.stopPropagation(); onEdit(rocket); }} style={{
            padding: "4px 10px", background: "rgba(0,212,255,0.2)",
            border: "1px solid #00d4ff", color: "#00d4ff",
            borderRadius: "4px", cursor: "pointer",
            fontSize: "0.7rem", fontFamily: "monospace",
          }}>EDIT</button>
          <button onClick={(e) => { e.stopPropagation(); onDelete(rocket.rocket_id); }} style={{
            padding: "4px 10px", background: "rgba(239,68,68,0.2)",
            border: "1px solid #ef4444", color: "#ef4444",
            borderRadius: "4px", cursor: "pointer",
            fontSize: "0.7rem", fontFamily: "monospace",
          }}>DEL</button>
        </div>
      )}

      <div className={`rocket-card-front ${hovered ? "faded" : ""}`}>
        <h2 className="rocket-card-name" style={{ color: "#fff", textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}>{rocket.rocket_name}</h2>
        <span className="mission-type" style={{ background: badgeColor }}>{rocket.type}</span>
        <div className="rocket-card-basic">
          <p><span className="label">Capacity</span><span className="value" style={{ color: badgeColor }}>{rocket.capacity_kg?.toLocaleString()} kg</span></p>
          <p><span className="label">Manufacturer</span><span className="value">{rocket.manufacturer}</span></p>
        </div>
        {rocket.added_by && (
          <p style={{ marginTop: "10px", fontSize: "0.7rem", color: "#aaa", letterSpacing: "1px" }}>
            ✦ Added by {rocket.added_by}
          </p>
        )}
        <p className="hover-hint">Hover for specs →</p>
      </div>

      <div className={`rocket-card-back ${hovered ? "visible" : ""}`}>
        <h3 style={{ color: badgeColor, marginBottom: "12px" }}>{rocket.rocket_name}</h3>
        <div className="specs-grid">
          <div className="spec-item"><span className="spec-label">Height</span><span className="spec-value">{specs.height || "—"}</span></div>
          <div className="spec-item"><span className="spec-label">Stages</span><span className="spec-value">{specs.stages || "—"}</span></div>
          <div className="spec-item"><span className="spec-label">First Flight</span><span className="spec-value">{specs.firstFlight || "—"}</span></div>
          <div className="spec-item"><span className="spec-label">Success Rate</span><span className="spec-value" style={{ color: "#22c55e" }}>{specs.successRate || "—"}</span></div>
          <div className="spec-item"><span className="spec-label">Payload</span><span className="spec-value">{rocket.capacity_kg?.toLocaleString()} kg</span></div>
          <div className="spec-item"><span className="spec-label">Type</span><span className="spec-value" style={{ color: badgeColor }}>{rocket.type}</span></div>
        </div>
        {specs.description && <p className="rocket-desc">{specs.description}</p>}
        {rocket.added_by && (
          <p style={{ marginTop: "auto", fontSize: "0.7rem", color: "#555", letterSpacing: "1px" }}>
            ✦ Added by {rocket.added_by}
          </p>
        )}
      </div>
    </div>
  );
}

function Rockets() {
  const [rockets, setRockets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [saving, setSaving] = useState(false);
  const { auth } = useAuth();

  const canEdit = auth && (auth.permissions === "all" || auth.permissions === "rockets");

  const fetchRockets = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/rockets");
      const data = await res.json();
      setRockets(data);
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  useEffect(() => { fetchRockets(); }, []);

  const handleAdd = () => { setEditTarget(null); setModalOpen(true); };
  const handleEdit = (rocket) => { setEditTarget(rocket); setModalOpen(true); };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this rocket?")) return;
    await fetch(`http://localhost:5000/api/rockets/${id}`, { method: "DELETE" });
    fetchRockets();
  };

  const handleSubmit = async (form) => {
    setSaving(true);
    const isEdit = !!editTarget?.rocket_id;
    const url = isEdit
      ? `http://localhost:5000/api/rockets/${editTarget.rocket_id}`
      : "http://localhost:5000/api/rockets";
    await fetch(url, {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, added_by: auth?.role }),
    });
    setSaving(false);
    setModalOpen(false);
    fetchRockets();
  };

  return (
    <>
      <div className="twinkle-layer"></div>
      <div className="nebula"></div>

      <div className={`loader ${!isLoading ? "hidden" : ""}`}>
        <div className="rocket-container">
          <div className="rocket">🚀</div>
          <p style={{ color: "#00d4ff", marginTop: "15px", letterSpacing: "2px", fontWeight: "bold" }}>
            LOADING LAUNCH VEHICLES...
          </p>
        </div>
      </div>

      <section className="mission-section">
        <div className="container">
          <h1 style={{ textAlign: "center", marginBottom: "10px", textShadow: "0 0 15px rgba(0,212,255,0.5)" }}>
            ISRO Launch Vehicles
          </h1>
          <p style={{ textAlign: "center", color: "#888", marginBottom: "30px", letterSpacing: "1px" }}>
            ROCKET REGISTRY — hover a card to see full specs
          </p>

          {canEdit && (
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <button onClick={handleAdd} style={{
                padding: "10px 28px", background: "rgba(0,212,255,0.1)",
                border: "1px solid #00d4ff", color: "#00d4ff",
                borderRadius: "6px", fontFamily: "monospace",
                fontWeight: "bold", fontSize: "0.85rem",
                letterSpacing: "2px", cursor: "pointer",
              }}>+ ADD ROCKET</button>
            </div>
          )}

          {rockets.length === 0 && !isLoading
            ? <p style={{ color: "#888", textAlign: "center" }}>No rockets found.</p>
            : <div className="rockets-grid">
                {rockets.map(rocket => (
                  <RocketCard
                    key={rocket.rocket_id}
                    rocket={rocket}
                    canEdit={canEdit}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
          }
        </div>
      </section>

      <RocketModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initial={editTarget}
        isLoading={saving}
      />

      <style>{`
        .rockets-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 320px)); gap: 40px; justify-content: center; padding-bottom: 80px; }
        .rocket-card { position: relative; min-height: 420px; border-radius: 16px; background: rgba(255,255,255,0.04); backdrop-filter: blur(10px); border: 1px solid rgba(0,212,255,0.15); overflow: hidden; transition: transform 0.3s ease, box-shadow 0.3s ease; cursor: pointer; }
        .rocket-card:hover { transform: translateY(-8px); box-shadow: 0 0 30px rgba(0,212,255,0.25); border-color: rgba(0,212,255,0.4); }
        .rocket-bg-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; }
        .rocket-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 60%); z-index: 1; }
        .rocket-card-front { position: absolute; inset: 0; padding: 24px; display: flex; flex-direction: column; justify-content: flex-start; z-index: 2; transition: opacity 0.4s ease; }
        .rocket-card-front.faded { opacity: 0; pointer-events: none; }
        .rocket-card-name { font-size: 1.3rem; margin-bottom: 10px; }
        .rocket-card-basic { margin-top: 16px; width: 100%; text-align: left; }
        .rocket-card-basic p { display: flex; justify-content: space-between; margin: 8px 0; font-size: 0.9rem; }
        .label { color: #ddd; }
        .value { font-weight: bold; color: #fff; }
        .hover-hint { margin-top: 16px; font-size: 0.75rem; color: #aaa; letter-spacing: 1px; }
        .rocket-card-back { position: absolute; inset: 0; padding: 24px; background: rgba(11,15,26,0.97); opacity: 0; pointer-events: none; transition: opacity 0.4s ease; display: flex; flex-direction: column; z-index: 2; }
        .rocket-card-back.visible { opacity: 1; pointer-events: all; }
        .specs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px; }
        .spec-item { background: rgba(255,255,255,0.05); border-radius: 8px; padding: 10px 12px; display: flex; flex-direction: column; gap: 4px; }
        .spec-label { font-size: 0.7rem; color: #888; letter-spacing: 1px; text-transform: uppercase; }
        .spec-value { font-size: 1rem; font-weight: bold; color: #fff; }
        .rocket-desc { font-size: 0.85rem; color: #aaa; line-height: 1.6; margin-top: auto; }
      `}</style>
    </>
  );
}

export default Rockets;