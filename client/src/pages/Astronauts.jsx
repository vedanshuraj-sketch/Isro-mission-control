import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const astronautImages = {
  "Rakesh Sharma":   "/images/rakesh-sharma.jpg",
  "Sunita Williams": "/images/sunita-williams.jpg",
  "Kalpana Chawla":  "/images/kalpana-chawla.jpg",
};

const astronautBio = {
  "Rakesh Sharma":   "First Indian to travel in space. Flew aboard Soviet spacecraft Soyuz T-11 in 1984. When asked how India looked from space, he replied — 'Saare Jahan Se Accha'.",
  "Sunita Williams": "Indian-American NASA astronaut. Holds records for total spacewalks by a woman. Has completed two long-duration missions aboard the ISS.",
  "Kalpana Chawla":  "First woman of Indian origin in space. Flew on Space Shuttle Columbia in 1997. Tragically lost in the Columbia disaster in 2003. A true pioneer.",
};

const roleColor = (role) => {
  const map = { "Commander": "#f97316", "Scientist-Astronaut": "#00d4ff", "Mission Specialist": "#a855f7" };
  return map[role] || "#00d4ff";
};

const emptyForm = { name: "", role: "", nationality: "", mission_id: "" };

function AstronautModal({ isOpen, onClose, onSubmit, initial, isLoading }) {
  const [form, setForm] = useState(initial || emptyForm);
  useEffect(() => { setForm(initial || emptyForm); }, [initial]);
  if (!isOpen) return null;
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="modal show" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ width: "460px" }}>
        <span className="close-btn" onClick={onClose}>&times;</span>
        <h2 style={{ marginBottom: "20px", color: "#00d4ff" }}>
          {initial?.astronaut_id ? "EDIT ASTRONAUT" : "ADD ASTRONAUT"}
        </h2>
        {[
          { label: "Full Name",    name: "name",       placeholder: "e.g. Shubhanshu Shukla" },
          { label: "Role",         name: "role",       placeholder: "e.g. Mission Specialist" },
          { label: "Nationality",  name: "nationality",placeholder: "e.g. Indian" },
          { label: "Mission ID",   name: "mission_id", placeholder: "e.g. 3", type: "number" },
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
          {isLoading ? "SAVING..." : (initial?.astronaut_id ? "UPDATE" : "ADD ASTRONAUT")}
        </button>
      </div>
    </div>
  );
}

function AstronautCard({ astronaut, canEdit, onEdit, onDelete }) {
  const [hovered, setHovered] = useState(false);
  const imgSrc = astronautImages[astronaut.name] || null;
  const badgeColor = roleColor(astronaut.role);
  const bio = astronautBio[astronaut.name] || "";

  return (
    <div className="sci-card" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>

      {/* CRUD buttons */}
      {canEdit && (
        <div style={{ position: "absolute", top: "10px", right: "10px", display: "flex", gap: "6px", zIndex: 10 }}>
          <button onClick={(e) => { e.stopPropagation(); onEdit(astronaut); }} style={{
            padding: "4px 10px", background: "rgba(0,212,255,0.15)",
            border: "1px solid #00d4ff", color: "#00d4ff",
            borderRadius: "4px", cursor: "pointer",
            fontSize: "0.7rem", fontFamily: "monospace",
          }}>EDIT</button>
          <button onClick={(e) => { e.stopPropagation(); onDelete(astronaut.astronaut_id); }} style={{
            padding: "4px 10px", background: "rgba(239,68,68,0.15)",
            border: "1px solid #ef4444", color: "#ef4444",
            borderRadius: "4px", cursor: "pointer",
            fontSize: "0.7rem", fontFamily: "monospace",
          }}>DEL</button>
        </div>
      )}

      {/* FRONT */}
      <div className={`sci-front ${hovered ? "faded" : ""}`}>
        <div className="sci-avatar">
          {imgSrc
            ? <img src={imgSrc} alt={astronaut.name} className="sci-img" />
            : <div className="sci-placeholder">👨‍🚀</div>
          }
        </div>
        <h2 className="sci-name">{astronaut.name}</h2>
        <span className="mission-type" style={{ background: badgeColor }}>{astronaut.role}</span>
        <div className="sci-info">
          <p><span className="label">Nationality</span><span className="value" style={{ color: badgeColor }}>{astronaut.nationality}</span></p>
          <p><span className="label">Mission</span><span className="value" style={{ color: "#aaa", fontSize: "0.82rem" }}>{astronaut.mission_name}</span></p>
        </div>
        {astronaut.added_by && (
          <p style={{ marginTop: "10px", fontSize: "0.7rem", color: "#555", letterSpacing: "1px" }}>
            ✦ Added by {astronaut.added_by}
          </p>
        )}
        <p className="hover-hint">Hover for bio →</p>
      </div>

      {/* BACK */}
      <div className={`sci-back ${hovered ? "visible" : ""}`}>
        <h3 style={{ color: badgeColor, marginBottom: "6px" }}>{astronaut.name}</h3>
        <span className="mission-type" style={{ background: badgeColor, marginBottom: "16px", display: "inline-block" }}>
          {astronaut.role}
        </span>
        <div className="specs-grid" style={{ marginBottom: "16px" }}>
          <div className="spec-item">
            <span className="spec-label">Nationality</span>
            <span className="spec-value" style={{ fontSize: "0.82rem", color: badgeColor }}>{astronaut.nationality}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Mission</span>
            <span className="spec-value" style={{ fontSize: "0.78rem" }}>{astronaut.mission_name}</span>
          </div>
        </div>
        {bio && <p className="rocket-desc">{bio}</p>}
        {astronaut.added_by && (
          <p style={{ marginTop: "auto", fontSize: "0.7rem", color: "#555", letterSpacing: "1px" }}>
            ✦ Added by {astronaut.added_by}
          </p>
        )}
      </div>
    </div>
  );
}

function Astronauts() {
  const [astronauts, setAstronauts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [saving, setSaving] = useState(false);
  const { auth } = useAuth();

  const canEdit = auth && (auth.permissions === "all" || auth.permissions === "astronauts");

  const fetchAstronauts = () => {
    fetch("http://localhost:5000/api/astronauts")
      .then(res => res.json())
      .then(data => { setAstronauts(data); setTimeout(() => setIsLoading(false), 500); })
      .catch(err => { console.error(err); setIsLoading(false); });
  };

  useEffect(() => { fetchAstronauts(); }, []);

  const handleAdd = () => { setEditTarget(null); setModalOpen(true); };
  const handleEdit = (astronaut) => { setEditTarget(astronaut); setModalOpen(true); };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this astronaut?")) return;
    await fetch(`http://localhost:5000/api/astronauts/${id}`, { method: "DELETE" });
    fetchAstronauts();
  };

  const handleSubmit = async (form) => {
    setSaving(true);
    const isEdit = !!editTarget?.astronaut_id;
    const url = isEdit
      ? `http://localhost:5000/api/astronauts/${editTarget.astronaut_id}`
      : "http://localhost:5000/api/astronauts";
    await fetch(url, {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, added_by: auth?.role }),
    });
    setSaving(false);
    setModalOpen(false);
    fetchAstronauts();
  };

  return (
    <>
      <div className="twinkle-layer"></div>
      <div className="nebula"></div>

      <div className={`loader ${!isLoading ? "hidden" : ""}`}>
        <div className="rocket-container">
          <div className="rocket">👨‍🚀</div>
          <p style={{ color: "#00d4ff", marginTop: "15px", letterSpacing: "2px", fontWeight: "bold" }}>
            LOADING CREW MANIFEST...
          </p>
        </div>
      </div>

      <section className="mission-section">
        <div className="container">
          <h1 style={{ textAlign: "center", marginBottom: "10px", textShadow: "0 0 15px rgba(0,212,255,0.5)" }}>
            ISRO Astronauts
          </h1>
          <p style={{ textAlign: "center", color: "#888", marginBottom: "30px", letterSpacing: "1px" }}>
            CREW MANIFEST — India's heroes of space
          </p>

          {canEdit && (
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <button onClick={handleAdd} style={{
                padding: "10px 28px", background: "rgba(0,212,255,0.1)",
                border: "1px solid #00d4ff", color: "#00d4ff",
                borderRadius: "6px", fontFamily: "monospace",
                fontWeight: "bold", fontSize: "0.85rem",
                letterSpacing: "2px", cursor: "pointer",
              }}>+ ADD ASTRONAUT</button>
            </div>
          )}

          {astronauts.length === 0 && !isLoading ? (
            <p style={{ color: "#888", textAlign: "center" }}>No astronauts found.</p>
          ) : (
            <div className="rockets-grid">
              {astronauts.map(a => (
                <AstronautCard
                  key={a.astronaut_id}
                  astronaut={a}
                  canEdit={canEdit}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <AstronautModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initial={editTarget}
        isLoading={saving}
      />

      <style>{`
        .rockets-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 300px)); gap: 36px; justify-content: center; padding-bottom: 80px; }
        .sci-card { position: relative; min-height: 380px; border-radius: 16px; background: rgba(255,255,255,0.04); backdrop-filter: blur(10px); border: 1px solid rgba(0,212,255,0.15); overflow: hidden; transition: transform 0.3s ease, box-shadow 0.3s ease; cursor: pointer; }
        .sci-card:hover { transform: translateY(-8px); box-shadow: 0 0 30px rgba(0,212,255,0.2); border-color: rgba(0,212,255,0.4); }
        .sci-front { padding: 28px 24px; display: flex; flex-direction: column; align-items: center; text-align: center; transition: opacity 0.4s ease; }
        .sci-front.faded { opacity: 0; pointer-events: none; }
        .sci-avatar { width: 100px; height: 100px; border-radius: 50%; overflow: hidden; border: 3px solid rgba(0,212,255,0.4); margin-bottom: 16px; display: flex; align-items: center; justify-content: center; background: rgba(0,212,255,0.08); }
        .sci-img { width: 100%; height: 100%; object-fit: cover; }
        .sci-placeholder { font-size: 3rem; }
        .sci-name { font-size: 1.15rem; margin-bottom: 10px; color: #fff; }
        .sci-info { margin-top: 16px; width: 100%; text-align: left; }
        .sci-info p { display: flex; justify-content: space-between; margin: 8px 0; font-size: 0.88rem; gap: 8px; }
        .label { color: #888; }
        .value { font-weight: bold; color: #fff; text-align: right; }
        .hover-hint { margin-top: 16px; font-size: 0.75rem; color: #555; letter-spacing: 1px; }
        .sci-back { position: absolute; inset: 0; padding: 24px; background: rgba(11,15,26,0.97); opacity: 0; pointer-events: none; transition: opacity 0.4s ease; display: flex; flex-direction: column; align-items: center; text-align: center; }
        .sci-back.visible { opacity: 1; pointer-events: all; }
        .specs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; width: 100%; }
        .spec-item { background: rgba(255,255,255,0.05); border-radius: 8px; padding: 10px 12px; display: flex; flex-direction: column; gap: 4px; text-align: left; }
        .spec-label { font-size: 0.7rem; color: #888; letter-spacing: 1px; text-transform: uppercase; }
        .spec-value { font-size: 0.95rem; font-weight: bold; color: #fff; }
        .rocket-desc { font-size: 0.85rem; color: #aaa; line-height: 1.7; text-align: left; margin-top: 8px; }
      `}</style>
    </>
  );
}

export default Astronauts;