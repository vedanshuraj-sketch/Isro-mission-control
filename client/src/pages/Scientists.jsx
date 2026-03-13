import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const scientistImages = {
  "Vikram Sarabhai": "/images/vikram-sarabhai.png",
  "APJ Abdul Kalam": "/images/apj-kalam.jpg",
  "K. Sivan":        "/images/k-sivan.jpg.webp",
  "S. Somnath":      "/images/s-somnath.jpg",
};

const departmentColor = (dept) => {
  const map = { "Space Science": "#00d4ff", "Launch Vehicles": "#f97316", "ISRO": "#a855f7" };
  return map[dept] || "#00d4ff";
};

const scientistBio = {
  "Vikram Sarabhai": "Father of the Indian Space Programme. Founded ISRO and pioneered space research in India.",
  "APJ Abdul Kalam": "Missile Man of India. Led the development of India's first satellite launch vehicle SLV-3.",
  "K. Sivan":        "Former Chairman of ISRO. Led Chandrayaan-2 and various satellite missions.",
  "S. Somnath":      "Current Chairman of ISRO. Led the successful Chandrayaan-3 lunar landing mission in 2023.",
};

// Empty form state
const emptyForm = { name: "", designation: "", department: "", contact: "" };

function ScientistCard({ scientist, canEdit, onEdit, onDelete }) {
  const [hovered, setHovered] = useState(false);
  const imgSrc = scientistImages[scientist.name] || null;
  const badgeColor = departmentColor(scientist.department);
  const bio = scientistBio[scientist.name] || "";

  return (
    <div className="sci-card" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>

      {/* CRUD buttons — only for authorized users */}
      {canEdit && (
        <div style={{
          position: "absolute", top: "10px", right: "10px",
          display: "flex", gap: "6px", zIndex: 10,
        }}>
          <button onClick={(e) => { e.stopPropagation(); onEdit(scientist); }} style={{
            padding: "4px 10px", background: "rgba(0,212,255,0.15)",
            border: "1px solid #00d4ff", color: "#00d4ff",
            borderRadius: "4px", cursor: "pointer", fontSize: "0.7rem",
            fontFamily: "monospace", letterSpacing: "1px",
          }}>EDIT</button>
          <button onClick={(e) => { e.stopPropagation(); onDelete(scientist.scientist_id); }} style={{
            padding: "4px 10px", background: "rgba(239,68,68,0.15)",
            border: "1px solid #ef4444", color: "#ef4444",
            borderRadius: "4px", cursor: "pointer", fontSize: "0.7rem",
            fontFamily: "monospace", letterSpacing: "1px",
          }}>DEL</button>
        </div>
      )}

      {/* FRONT */}
      <div className={`sci-front ${hovered ? "faded" : ""}`}>
        <div className="sci-avatar">
          {imgSrc
            ? <img src={imgSrc} alt={scientist.name} className="sci-img" />
            : <div className="sci-placeholder">👨‍🔬</div>
          }
        </div>
        <h2 className="sci-name">{scientist.name}</h2>
        <span className="mission-type" style={{ background: badgeColor }}>{scientist.designation}</span>
        <div className="sci-info">
          <p><span className="label">Department</span><span className="value" style={{ color: badgeColor }}>{scientist.department}</span></p>
          <p><span className="label">Missions</span><span className="value" style={{ color: "#22c55e" }}>{scientist.mission_count}</span></p>
        </div>
        {/* Added by tag */}
        {scientist.added_by && (
          <p style={{ marginTop: "10px", fontSize: "0.7rem", color: "#555", letterSpacing: "1px" }}>
            ✦ Added by {scientist.added_by}
          </p>
        )}
        <p className="hover-hint">Hover for bio →</p>
      </div>

      {/* BACK */}
      <div className={`sci-back ${hovered ? "visible" : ""}`}>
        <h3 style={{ color: badgeColor, marginBottom: "6px" }}>{scientist.name}</h3>
        <span className="mission-type" style={{ background: badgeColor, marginBottom: "16px", display: "inline-block" }}>
          {scientist.designation}
        </span>
        <div className="specs-grid" style={{ marginBottom: "16px" }}>
          <div className="spec-item">
            <span className="spec-label">Department</span>
            <span className="spec-value" style={{ fontSize: "0.82rem", color: badgeColor }}>{scientist.department}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Missions</span>
            <span className="spec-value" style={{ color: "#22c55e" }}>{scientist.mission_count}</span>
          </div>
        </div>
        {bio && <p className="rocket-desc">{bio}</p>}
        {scientist.added_by && (
          <p style={{ marginTop: "auto", fontSize: "0.7rem", color: "#555", letterSpacing: "1px" }}>
            ✦ Added by {scientist.added_by}
          </p>
        )}
      </div>
    </div>
  );
}

function ScientistModal({ isOpen, onClose, onSubmit, initial, isLoading }) {
  const [form, setForm] = useState(initial || emptyForm);

  useEffect(() => { setForm(initial || emptyForm); }, [initial]);

  if (!isOpen) return null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="modal show" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ width: "460px" }}>
        <span className="close-btn" onClick={onClose}>&times;</span>
        <h2 style={{ marginBottom: "20px", color: "#00d4ff" }}>
          {initial?.scientist_id ? "EDIT SCIENTIST" : "ADD SCIENTIST"}
        </h2>

        {[
          { label: "Full Name", name: "name", placeholder: "Dr. Example Name" },
          { label: "Designation", name: "designation", placeholder: "e.g. Chairman" },
          { label: "Department", name: "department", placeholder: "e.g. Space Science" },
          { label: "Contact", name: "contact", placeholder: "10-digit number" },
        ].map(field => (
          <div key={field.name} style={{ marginBottom: "16px" }}>
            <label style={{ color: "#888", fontSize: "0.7rem", letterSpacing: "2px", display: "block", marginBottom: "6px" }}>
              {field.label.toUpperCase()}
            </label>
            <input
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

        <button
          onClick={() => onSubmit(form)}
          disabled={isLoading}
          style={{
            width: "100%", padding: "12px",
            background: isLoading ? "rgba(0,212,255,0.3)" : "#00d4ff",
            color: "#000", border: "none", borderRadius: "6px",
            fontFamily: "monospace", fontWeight: "bold",
            fontSize: "0.85rem", letterSpacing: "2px",
            cursor: isLoading ? "not-allowed" : "pointer",
            marginTop: "8px",
          }}
        >
          {isLoading ? "SAVING..." : (initial?.scientist_id ? "UPDATE" : "ADD SCIENTIST")}
        </button>
      </div>
    </div>
  );
}

function Scientists() {
  const [scientists, setScientists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [saving, setSaving] = useState(false);
  const { auth } = useAuth();

  // Can do CRUD if admin or scientist role
  const canEdit = auth && (auth.permissions === "all" || auth.permissions === "scientists");

  const fetchScientists = () => {
    fetch("http://localhost:5000/api/scientists")
      .then(res => res.json())
      .then(data => { setScientists(data); setIsLoading(false); })
      .catch(err => { console.error(err); setIsLoading(false); });
  };

  useEffect(() => { fetchScientists(); }, []);

  const handleAdd = () => { setEditTarget(null); setModalOpen(true); };
  const handleEdit = (scientist) => { setEditTarget(scientist); setModalOpen(true); };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this scientist?")) return;
    await fetch(`http://localhost:5000/api/scientists/${id}`, { method: "DELETE" });
    fetchScientists();
  };

  const handleSubmit = async (form) => {
    setSaving(true);
    const isEdit = !!editTarget?.scientist_id;
    const url = isEdit
      ? `http://localhost:5000/api/scientists/${editTarget.scientist_id}`
      : "http://localhost:5000/api/scientists";

    await fetch(url, {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, added_by: auth?.role }),
    });

    setSaving(false);
    setModalOpen(false);
    fetchScientists();
  };

  return (
    <>
      <div className="twinkle-layer"></div>
      <div className="nebula"></div>

      <div className={`loader ${!isLoading ? "hidden" : ""}`}>
        <div className="rocket-container">
          <div className="rocket">👨‍🔬</div>
          <p style={{ color: "#00d4ff", marginTop: "15px", letterSpacing: "2px", fontWeight: "bold" }}>
            LOADING SCIENTISTS...
          </p>
        </div>
      </div>

      <section className="mission-section">
        <div className="container">
          <h1 style={{ textAlign: "center", marginBottom: "10px", textShadow: "0 0 15px rgba(0,212,255,0.5)" }}>
            ISRO Scientists
          </h1>
          <p style={{ textAlign: "center", color: "#888", marginBottom: "30px", letterSpacing: "1px" }}>
            THE MINDS BEHIND THE MISSIONS — hover a card to read their story
          </p>

          {/* Add button — only for authorized */}
          {canEdit && (
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <button onClick={handleAdd} style={{
                padding: "10px 28px",
                background: "rgba(0,212,255,0.1)",
                border: "1px solid #00d4ff",
                color: "#00d4ff", borderRadius: "6px",
                fontFamily: "monospace", fontWeight: "bold",
                fontSize: "0.85rem", letterSpacing: "2px",
                cursor: "pointer",
              }}>
                + ADD SCIENTIST
              </button>
            </div>
          )}

          {scientists.length === 0 && !isLoading ? (
            <p style={{ color: "#888", textAlign: "center" }}>No scientists found.</p>
          ) : (
            <div className="rockets-grid">
              {scientists.map(s => (
                <ScientistCard
                  key={s.scientist_id}
                  scientist={s}
                  canEdit={canEdit}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <ScientistModal
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
        .sci-info p { display: flex; justify-content: space-between; margin: 8px 0; font-size: 0.88rem; }
        .label { color: #888; }
        .value { font-weight: bold; color: #fff; }
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

export default Scientists;