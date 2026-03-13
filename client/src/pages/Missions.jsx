import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const emptyForm = { mission_name: "", mission_type: "", status: "", launch_date: "" };

function MissionModal({ isOpen, onClose, onSubmit, initial, isLoading }) {
  const [form, setForm] = useState(initial || emptyForm);

  useEffect(() => { setForm(initial || emptyForm); }, [initial]);

  if (!isOpen) return null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="modal show" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ width: "460px" }}>
        <span className="close-btn" onClick={onClose}>&times;</span>
        <h2 style={{ marginBottom: "20px", color: "#00d4ff" }}>
          {initial?.mission_id ? "EDIT MISSION" : "ADD MISSION"}
        </h2>

        {[
          { label: "Mission Name", name: "mission_name", placeholder: "e.g. Chandrayaan-4" },
          { label: "Mission Type", name: "mission_type", placeholder: "e.g. Lunar" },
          { label: "Status", name: "status", placeholder: "e.g. Upcoming" },
          { label: "Launch Date", name: "launch_date", placeholder: "", type: "date" },
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
          {isLoading ? "SAVING..." : (initial?.mission_id ? "UPDATE" : "ADD MISSION")}
        </button>
      </div>
    </div>
  );
}

function Missions() {
  const [missions, setMissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMission, setSelectedMission] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [crudModalOpen, setCrudModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [saving, setSaving] = useState(false);
  const { auth } = useAuth();

  const canEdit = auth && (auth.permissions === "all" || auth.permissions === "missions");

  const fetchMissions = () => {
    fetch("https://isro-backend-6tlj.onrender.com/api/missions")
      .then(res => res.json())
      .then(data => { setMissions(data); setTimeout(() => setIsLoading(false), 500); })
      .catch(err => { console.error(err); setIsLoading(false); });
  };

  useEffect(() => { fetchMissions(); }, []);

  const handleCardClick = (mission) => { setSelectedMission(mission); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setTimeout(() => setSelectedMission(null), 300); };

  const handleAdd = () => { setEditTarget(null); setCrudModalOpen(true); };
  const handleEdit = (e, mission) => { e.stopPropagation(); setEditTarget(mission); setCrudModalOpen(true); };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm("Delete this mission?")) return;
    await fetch(`https://isro-backend-6tlj.onrender.com/api/missions/${id}`, { method: "DELETE" });
    fetchMissions();
  };

  const handleSubmit = async (form) => {
    setSaving(true);
    const isEdit = !!editTarget?.mission_id;
    const url = isEdit
      ? `https://isro-backend-6tlj.onrender.com/api/missions/${editTarget.mission_id}`
      : "https://isro-backend-6tlj.onrender.com/api/missions";

    await fetch(url, {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, added_by: auth?.role }),
    });

    setSaving(false);
    setCrudModalOpen(false);
    fetchMissions();
  };

  return (
    <>
      <div className="twinkle-layer"></div>
      <div className="nebula"></div>

      <div className={`loader ${!isLoading ? 'hidden' : ''}`}>
        <div className="rocket-container">
          <div className="rocket">🚀</div>
          <p style={{ color: '#00d4ff', marginTop: '15px', letterSpacing: '2px', fontWeight: 'bold' }}>
            FETCHING ORBITAL DATA...
          </p>
        </div>
      </div>

      <section className="mission-section">
        <div className="container">
          <h1 style={{ textShadow: "0 0 15px rgba(0, 212, 255, 0.5)" }}>ISRO Missions</h1>

          {/* Add button */}
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
                + ADD MISSION
              </button>
            </div>
          )}

          <div className="missions-grid">
            {missions.map(mission => (
              <div key={mission.mission_id} className="mission-card" onClick={() => handleCardClick(mission)} style={{ cursor: 'pointer', position: "relative" }}>

                {/* CRUD buttons */}
                {canEdit && (
                  <div style={{ position: "absolute", top: "10px", right: "10px", display: "flex", gap: "6px", zIndex: 10 }}>
                    <button onClick={(e) => handleEdit(e, mission)} style={{
                      padding: "4px 10px", background: "rgba(0,212,255,0.15)",
                      border: "1px solid #00d4ff", color: "#00d4ff",
                      borderRadius: "4px", cursor: "pointer",
                      fontSize: "0.7rem", fontFamily: "monospace",
                    }}>EDIT</button>
                    <button onClick={(e) => handleDelete(e, mission.mission_id)} style={{
                      padding: "4px 10px", background: "rgba(239,68,68,0.15)",
                      border: "1px solid #ef4444", color: "#ef4444",
                      borderRadius: "4px", cursor: "pointer",
                      fontSize: "0.7rem", fontFamily: "monospace",
                    }}>DEL</button>
                  </div>
                )}

                <h2>{mission.mission_name}</h2>
                <span className="mission-type">{mission.mission_type}</span>
                <p style={{ marginTop: '10px' }}>
                  <strong>Launch:</strong> {new Date(mission.launch_date).toLocaleDateString()}
                </p>
                <p className="status">
                  Status: <span style={{ color: '#00d4ff' }}>{mission.status}</span>
                </p>
                {mission.added_by && (
                  <p style={{ marginTop: "8px", fontSize: "0.7rem", color: "#555", letterSpacing: "1px" }}>
                    ✦ Added by {mission.added_by}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detail modal */}
      <div className={`modal ${isModalOpen ? 'show' : ''}`} onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <span className="close-btn" onClick={closeModal}>&times;</span>
          {selectedMission && (
            <>
              <h2 style={{ marginBottom: '10px' }}>{selectedMission.mission_name}</h2>
              <span className="mission-type">{selectedMission.mission_type}</span>
              <div style={{ marginTop: '20px', lineHeight: '1.8' }}>
                <p><strong>Launch Date: </strong>{new Date(selectedMission.launch_date).toLocaleDateString()}</p>
                <p><strong>Current Status: </strong><span style={{ color: '#00d4ff' }}>{selectedMission.status}</span></p>
                {selectedMission.description && (
                  <p style={{ marginTop: '15px', color: '#cccccc' }}>{selectedMission.description}</p>
                )}
                {selectedMission.added_by && (
                  <p style={{ marginTop: '15px', fontSize: "0.75rem", color: "#555" }}>✦ Added by {selectedMission.added_by}</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* CRUD modal */}
      <MissionModal
        isOpen={crudModalOpen}
        onClose={() => setCrudModalOpen(false)}
        onSubmit={handleSubmit}
        initial={editTarget}
        isLoading={saving}
      />
    </>
  );
}

export default Missions;