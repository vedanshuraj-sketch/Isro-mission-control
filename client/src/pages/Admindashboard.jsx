import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function StatCard({ label, value, color, icon }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.04)",
      border: `1px solid ${color}33`,
      borderRadius: "12px", padding: "24px",
      display: "flex", flexDirection: "column", gap: "8px",
      transition: "box-shadow 0.3s ease",
    }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 20px ${color}22`}
      onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
    >
      <span style={{ fontSize: "1.8rem" }}>{icon}</span>
      <span style={{ fontSize: "2rem", fontWeight: "bold", color }}>{value}</span>
      <span style={{ fontSize: "0.75rem", color: "#888", letterSpacing: "2px" }}>{label}</span>
    </div>
  );
}

function AdminDashboard() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("logs");

  // Redirect if not master admin
  useEffect(() => {
    if (!auth || auth.permissions !== "all") {
      navigate("/");
    }
  }, [auth, navigate]);

  useEffect(() => {
    if (!auth || auth.permissions !== "all") return;

    const fetchAll = async () => {
      try {
        const [logsRes, missionsRes, rocketsRes, satellitesRes, scientistsRes, astronautsRes] = await Promise.all([
          fetch("http://localhost:5000/api/auth/logs"),
          fetch("http://localhost:5000/api/missions"),
          fetch("http://localhost:5000/api/rockets"),
          fetch("http://localhost:5000/api/satellites"),
          fetch("http://localhost:5000/api/scientists"),
          fetch("http://localhost:5000/api/astronauts"),
        ]);

        const [logsData, missions, rockets, satellites, scientists, astronauts] = await Promise.all([
          logsRes.json(), missionsRes.json(), rocketsRes.json(),
          satellitesRes.json(), scientistsRes.json(), astronautsRes.json(),
        ]);

        setLogs(logsData);
        setStats({
          missions: missions.length,
          rockets: rockets.length,
          satellites: satellites.length,
          scientists: scientists.length,
          astronauts: astronauts.length,
          logins: logsData.length,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAll();
  }, [auth]);

  if (!auth || auth.permissions !== "all") return null;

  const tabStyle = (tab) => ({
    padding: "8px 20px",
    background: activeTab === tab ? "rgba(0,212,255,0.15)" : "transparent",
    border: `1px solid ${activeTab === tab ? "#00d4ff" : "rgba(255,255,255,0.1)"}`,
    color: activeTab === tab ? "#00d4ff" : "#888",
    borderRadius: "6px", cursor: "pointer",
    fontFamily: "monospace", fontSize: "0.8rem",
    letterSpacing: "1px",
  });

  return (
    <>
      <div className="twinkle-layer"></div>
      <div className="nebula"></div>

      <div className={`loader ${!isLoading ? "hidden" : ""}`}>
        <div className="rocket-container">
          <div className="rocket">🛡️</div>
          <p style={{ color: "#00d4ff", marginTop: "15px", letterSpacing: "2px", fontWeight: "bold" }}>
            LOADING ADMIN DATA...
          </p>
        </div>
      </div>

      <section className="mission-section">
        <div className="container">

          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <p style={{ color: "#00d4ff", letterSpacing: "4px", fontSize: "0.7rem", marginBottom: "6px" }}>MASTER ADMIN</p>
              <h1 style={{ textShadow: "0 0 15px rgba(0,212,255,0.5)", margin: 0 }}>Admin Dashboard</h1>
            </div>
            <button onClick={() => { logout(); navigate("/"); }} style={{
              padding: "10px 24px",
              background: "rgba(239,68,68,0.1)",
              border: "1px solid #ef4444", color: "#ef4444",
              borderRadius: "6px", fontFamily: "monospace",
              fontWeight: "bold", fontSize: "0.8rem",
              letterSpacing: "2px", cursor: "pointer",
            }}>LOGOUT</button>
          </div>

          {/* Stats */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "16px", marginBottom: "48px",
          }}>
            <StatCard label="MISSIONS"   value={stats.missions}   color="#00d4ff" icon="🚀" />
            <StatCard label="ROCKETS"    value={stats.rockets}    color="#f97316" icon="🛸" />
            <StatCard label="SATELLITES" value={stats.satellites} color="#a855f7" icon="🛰️" />
            <StatCard label="SCIENTISTS" value={stats.scientists} color="#22c55e" icon="👨‍🔬" />
            <StatCard label="ASTRONAUTS" value={stats.astronauts} color="#facc15" icon="👨‍🚀" />
            <StatCard label="LOGINS"     value={stats.logins}     color="#ec4899" icon="🔐" />
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "24px" }}>
            <button style={tabStyle("logs")}    onClick={() => setActiveTab("logs")}>ACCESS LOGS</button>
            <button style={tabStyle("codes")}   onClick={() => setActiveTab("codes")}>ACCESS CODES</button>
          </div>

          {/* ACCESS LOGS TAB */}
          {activeTab === "logs" && (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(0,212,255,0.2)" }}>
                    {["#", "Code", "Role", "IP Address", "Browser", "Time"].map(h => (
                      <th key={h} style={{ padding: "12px 16px", color: "#888", letterSpacing: "1px", fontSize: "0.7rem", textAlign: "left", whiteSpace: "nowrap" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {logs.length === 0 ? (
                    <tr><td colSpan={6} style={{ padding: "40px", textAlign: "center", color: "#555" }}>No login logs yet.</td></tr>
                  ) : (
                    logs.map((log, i) => (
                      <tr key={log.log_id} style={{
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                        transition: "background 0.2s",
                      }}
                        onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                      >
                        <td style={{ padding: "12px 16px", color: "#555" }}>{i + 1}</td>
                        <td style={{ padding: "12px 16px", color: "#00d4ff", fontWeight: "bold", letterSpacing: "1px" }}>{log.code}</td>
                        <td style={{ padding: "12px 16px", color: "#fff" }}>{log.role}</td>
                        <td style={{ padding: "12px 16px", color: "#aaa" }}>{log.ip_address}</td>
                        <td style={{ padding: "12px 16px", color: "#aaa", maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{log.browser}</td>
                        <td style={{ padding: "12px 16px", color: "#888", whiteSpace: "nowrap" }}>
                          {new Date(log.logged_in_at).toLocaleString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* ACCESS CODES TAB */}
          {activeTab === "codes" && (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(0,212,255,0.2)" }}>
                    {["Code", "Role", "Permissions"].map(h => (
                      <th key={h} style={{ padding: "12px 16px", color: "#888", letterSpacing: "1px", fontSize: "0.7rem", textAlign: "left" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { code: "ISRO-ADM-000", role: "Master Admin",        permissions: "all",        color: "#f97316" },
                    { code: "ISRO-MSN-001", role: "Mission Controller",  permissions: "missions",   color: "#00d4ff" },
                    { code: "ISRO-RKT-002", role: "Rocket Engineer",     permissions: "rockets",    color: "#a855f7" },
                    { code: "ISRO-SAT-003", role: "Satellite Engineer",  permissions: "satellites", color: "#22c55e" },
                    { code: "ISRO-SCI-004", role: "Science Director",    permissions: "scientists", color: "#facc15" },
                  ].map(row => (
                    <tr key={row.code} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                      onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >
                      <td style={{ padding: "14px 16px", color: row.color, fontWeight: "bold", letterSpacing: "2px", fontFamily: "monospace" }}>{row.code}</td>
                      <td style={{ padding: "14px 16px", color: "#fff" }}>{row.role}</td>
                      <td style={{ padding: "14px 16px" }}>
                        <span style={{
                          padding: "3px 10px", borderRadius: "20px",
                          background: `${row.color}22`, border: `1px solid ${row.color}55`,
                          color: row.color, fontSize: "0.75rem", letterSpacing: "1px",
                        }}>{row.permissions}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </section>
    </>
  );
}

export default AdminDashboard;