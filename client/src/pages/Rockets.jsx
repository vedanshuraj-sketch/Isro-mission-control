import React, { useEffect, useState } from "react";

const rocketImages = {
  "PSLV":  "/images/pslv.jpg",
  "GSLV":  "/images/gslv.jpg",
  "LVM3":  "/images/gslv-mk3.webp",
  "SSLV":  "/images/sslv.jpg",
  "SLV-3": "/images/slv3.jpg",
};

const rocketSpecs = {
  "PSLV":  { height: "44 m", stages: "4", firstFlight: "1994", successRate: "95%", description: "India's most reliable workhorse rocket. Used for Chandrayaan-1 and Mangalyaan." },
  "GSLV":  { height: "49 m", stages: "3", firstFlight: "2001", successRate: "80%", description: "Designed to launch heavier communication satellites into GTO." },
  "LVM3":  { height: "43.5 m", stages: "3", firstFlight: "2014", successRate: "100%", description: "ISRO's most powerful rocket. Launched Chandrayaan-2 and Chandrayaan-3." },
  "SSLV":  { height: "34 m", stages: "3", firstFlight: "2022", successRate: "50%", description: "Small Satellite Launch Vehicle for rapid, low-cost launches into LEO." },
  "SLV-3": { height: "22 m", stages: "4", firstFlight: "1979", successRate: "50%", description: "India's first experimental satellite launch vehicle." },
};

const typeColor = (type) => {
  const map = { "PSLV": "#00d4ff", "GSLV": "#a855f7", "Heavy Lift": "#f97316", "Mini LV": "#22c55e" };
  return map[type] || "#00d4ff";
};

function RocketCard({ rocket }) {
  const [hovered, setHovered] = useState(false);
  const specs = rocketSpecs[rocket.name] || {};
  const imgSrc = rocketImages[rocket.name] || null;
  const badgeColor = typeColor(rocket.type);

  return (
    <div className="rocket-card" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>

      <div className={`rocket-card-front ${hovered ? "faded" : ""}`}>
        <div className="rocket-img-wrapper">
          {imgSrc
            ? <img src={imgSrc} alt={rocket.name} className="rocket-img" />
            : <div className="rocket-img-placeholder">🚀</div>
          }
        </div>
        <h2 className="rocket-card-name">{rocket.rocket_name}</h2>
        <span className="mission-type" style={{ background: badgeColor }}>{rocket.type}</span>
        <div className="rocket-card-basic">
          <p><span className="label">Capacity</span><span className="value" style={{ color: badgeColor }}>{rocket.capacity_kg?.toLocaleString()} kg</span></p>
          <p><span className="label">Manufacturer</span><span className="value">{rocket.manufacturer}</span></p>
        </div>
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
      </div>
    </div>
  );
}

function Rockets() {
  const [rockets, setRockets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/rockets")
      .then(res => res.json())
      .then(data => { setRockets(data); setTimeout(() => setIsLoading(false), 500); })
      .catch(err => { console.error(err); setIsLoading(false); });
  }, []);

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
          <p style={{ textAlign: "center", color: "#888", marginBottom: "50px", letterSpacing: "1px" }}>
            ROCKET REGISTRY — hover a card to see full specs
          </p>

          {rockets.length === 0 && !isLoading
            ? <p style={{ color: "#888", textAlign: "center" }}>No rockets found.</p>
            : <div className="rockets-grid">
                {rockets.map(rocket => <RocketCard key={rocket.rocket_id} rocket={rocket} />)}
              </div>
          }
        </div>
      </section>

      <style>{`
        .rockets-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 320px)); gap: 40px; justify-content: center; padding-bottom: 80px; }
        .rocket-card { position: relative; min-height: 420px; border-radius: 16px; background: rgba(255,255,255,0.04); backdrop-filter: blur(10px); border: 1px solid rgba(0,212,255,0.15); overflow: hidden; transition: transform 0.3s ease, box-shadow 0.3s ease; cursor: pointer; }
        .rocket-card:hover { transform: translateY(-8px); box-shadow: 0 0 30px rgba(0,212,255,0.25); border-color: rgba(0,212,255,0.4); }
        .rocket-card-front { padding: 24px; display: flex; flex-direction: column; align-items: center; text-align: center; transition: opacity 0.4s ease; }
        .rocket-card-front.faded { opacity: 0; pointer-events: none; }
        .rocket-img-wrapper { width: 120px; height: 180px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
        .rocket-img { max-width: 250px; max-height: 200px; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0,212,255,0.4)); }
        .rocket-img-placeholder { font-size: 60px; }
        .rocket-card-name { font-size: 1.3rem; margin-bottom: 10px; }
        .rocket-card-basic { margin-top: 16px; width: 100%; text-align: left; }
        .rocket-card-basic p { display: flex; justify-content: space-between; margin: 8px 0; font-size: 0.9rem; }
        .label { color: #888; }
        .value { font-weight: bold; color: #fff; }
        .hover-hint { margin-top: 16px; font-size: 0.75rem; color: #555; letter-spacing: 1px; }
        .rocket-card-back { position: absolute; inset: 0; padding: 24px; background: rgba(11,15,26,0.97); opacity: 0; pointer-events: none; transition: opacity 0.4s ease; display: flex; flex-direction: column; }
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