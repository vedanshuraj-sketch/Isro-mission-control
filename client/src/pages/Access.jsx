import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Access() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!code.trim()) { setError("Please enter an access code."); return; }
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: code.trim(),
          device: navigator.userAgent,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid access code.");
        setIsLoading(false);
        return;
      }

      login(data);
      navigate("/");
    } catch (err) {
      setError("Server error. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="twinkle-layer"></div>
      <div className="nebula"></div>

      <div style={{
        minHeight: "100vh", display: "flex",
        alignItems: "center", justifyContent: "center",
        padding: "20px",
      }}>
        <div style={{
          width: "100%", maxWidth: "420px",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(0,212,255,0.2)",
          borderRadius: "16px", padding: "48px 36px",
          backdropFilter: "blur(10px)",
          boxShadow: "0 0 40px rgba(0,212,255,0.08)",
        }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <img src="/images/isro-logo.png" alt="ISRO"
              style={{ height: "60px", marginBottom: "16px", objectFit: "contain" }}
              onError={e => e.target.style.display = "none"}
            />
            <p style={{ color: "#00d4ff", letterSpacing: "4px", fontSize: "0.7rem", marginBottom: "8px" }}>
              MISSION CONTROL
            </p>
            <h1 style={{ color: "#fff", fontSize: "1.5rem", letterSpacing: "2px" }}>
              ACCESS PORTAL
            </h1>
            <p style={{ color: "#666", fontSize: "0.8rem", marginTop: "8px" }}>
              Enter your authorization code to continue
            </p>
          </div>

          {/* Input */}
          <div style={{ marginBottom: "16px" }}>
            <label style={{ color: "#888", fontSize: "0.7rem", letterSpacing: "2px", display: "block", marginBottom: "8px" }}>
              ACCESS CODE
            </label>
            <input
              type="text"
              value={code}
              onChange={e => { setCode(e.target.value.toUpperCase()); setError(""); }}
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
              placeholder="ISRO-XXX-000"
              style={{
                width: "100%", padding: "14px 16px",
                background: "rgba(255,255,255,0.06)",
                border: `1px solid ${error ? "#ef4444" : "rgba(0,212,255,0.3)"}`,
                borderRadius: "8px", color: "#fff",
                fontFamily: "monospace", fontSize: "1rem",
                letterSpacing: "3px", outline: "none",
                boxSizing: "border-box",
                transition: "border 0.2s ease",
              }}
              onFocus={e => e.target.style.borderColor = "#00d4ff"}
              onBlur={e => e.target.style.borderColor = error ? "#ef4444" : "rgba(0,212,255,0.3)"}
            />
            {error && (
              <p style={{ color: "#ef4444", fontSize: "0.78rem", marginTop: "8px" }}>⚠ {error}</p>
            )}
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            style={{
              width: "100%", padding: "14px",
              background: isLoading ? "rgba(0,212,255,0.3)" : "#00d4ff",
              color: "#000", border: "none", borderRadius: "8px",
              fontFamily: "monospace", fontWeight: "bold",
              fontSize: "0.85rem", letterSpacing: "3px",
              cursor: isLoading ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
              marginBottom: "16px",
            }}
          >
            {isLoading ? "VERIFYING..." : "AUTHENTICATE"}
          </button>

          {/* Continue as viewer */}
          <p
            onClick={() => navigate("/")}
            style={{
              textAlign: "center", color: "#555",
              fontSize: "0.78rem", cursor: "pointer",
              letterSpacing: "1px", transition: "color 0.2s",
            }}
            onMouseEnter={e => e.target.style.color = "#888"}
            onMouseLeave={e => e.target.style.color = "#555"}
          >
            Continue as Viewer →
          </p>
        </div>
      </div>
    </>
  );
}

export default Access;