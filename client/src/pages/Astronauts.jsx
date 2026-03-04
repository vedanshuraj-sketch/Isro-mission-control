import React, { useEffect, useState } from "react";

const astronautImages = {
  "Rakesh Sharma":  "/images/rakesh-sharma.jpg",
  "Sunita Williams":"/images/sunita-williams.jpg",
  "Kalpana Chawla": "/images/kalpana-chawla.jpg",
};

const astronautBio = {
  "Rakesh Sharma":   "First Indian to travel in space. Flew aboard Soviet spacecraft Soyuz T-11 in 1984. When asked how India looked from space, he replied — 'Saare Jahan Se Accha'.",
  "Sunita Williams": "Indian-American NASA astronaut. Holds records for total spacewalks by a woman. Has completed two long-duration missions aboard the ISS.",
  "Kalpana Chawla":  "First woman of Indian origin in space. Flew on Space Shuttle Columbia in 1997. Tragically lost in the Columbia disaster in 2003. A true pioneer.",
};

const roleColor = (role) => {
  const map = {
    "Commander":          "#f97316",
    "Scientist-Astronaut":"#00d4ff",
    "Mission Specialist": "#a855f7",
  };
  return map[role] || "#00d4ff";
};

function AstronautCard({ astronaut }) {
  const [hovered, setHovered] = useState(false);
  const imgSrc = astronautImages[astronaut.name] || null;
  const badgeColor = roleColor(astronaut.role);
  const bio = astronautBio[astronaut.name] || "";

  return (
    <div
      className="sci-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
        
      {/* FRONT */}
      <div className={`sci-front ${hovered ? "faded" : ""}`}>
        <div className="sci-avatar">
          {imgSrc
            ? <img src={imgSrc} alt={astronaut.name} className="sci-img" />
            : <div className="sci-placeholder">👨‍🚀</div>
          }
        </div>

        <h2 className="sci-name">{astronaut.name}</h2>
        <span className="mission-type" style={{ background: badgeColor }}>
          {astronaut.role}
        </span>

        <div className="sci-info">
          <p><span className="label">Nationality</span><span className="value" style={{ color: badgeColor }}>{astronaut.nationality}</span></p>
          <p><span className="label">Mission</span><span className="value" style={{ color: "#aaa", fontSize: "0.82rem" }}>{astronaut.mission_name}</span></p>
        </div>

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
      </div>
    </div>
  );
}

function Astronauts() {
  const [astronauts, setAstronauts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/astronauts")
      .then(res => res.json())
      .then(data => {
        setAstronauts(data);
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
          <p style={{ textAlign: "center", color: "#888", marginBottom: "50px", letterSpacing: "1px" }}>
            CREW MANIFEST — India's heroes of space
          </p>

          {astronauts.length === 0 && !isLoading ? (
            <p style={{ color: "#888", textAlign: "center" }}>No astronauts found.</p>
          ) : (
            <div className="rockets-grid">
              {astronauts.map(a => <AstronautCard key={a.astronaut_id} astronaut={a} />)}
            </div>
          )}
        </div>
      </section>

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