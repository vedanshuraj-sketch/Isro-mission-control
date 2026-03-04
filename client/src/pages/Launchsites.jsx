import React, { useEffect, useState } from "react";

const siteImages = {
  "Satish Dhawan Space Centre":      "/images/sdsc.webp",
  "Thumba Equatorial Launch Station":"/images/tels.webp",
};

const siteCoordinates = {
  "Satish Dhawan Space Centre":       { lat: 13.7199, lng: 80.2304 },
  "Thumba Equatorial Launch Station": { lat: 8.5241,  lng: 76.9366 },
};

const siteInfo = {
  "Satish Dhawan Space Centre": {
    established: "1969",
    altitude: "Sea Level",
    description: "India's primary spaceport located on Sriharikota island. Named after scientist Satish Dhawan. Home to all major ISRO launches including Chandrayaan and Mangalyaan.",
  },
  "Thumba Equatorial Launch Station": {
    established: "1962",
    altitude: "Sea Level",
    description: "India's first rocket launching station. Located near the magnetic equator, ideal for ionospheric research. Founded by Vikram Sarabhai.",
  },
};

function LaunchSiteCard({ site }) {
  const [tab, setTab] = useState("info"); // "info" or "map"
  const imgSrc = siteImages[site.site_name] || null;
  const coords = siteCoordinates[site.site_name];
  const info = siteInfo[site.site_name] || {};

  const mapUrl = coords
    ? `https://maps.google.com/maps?q=${coords.lat},${coords.lng}&z=13&output=embed`
    : null;

  return (
    <div className="site-card">

      {/* Image header */}
      <div className="site-img-wrapper">
        {imgSrc
          ? <img src={imgSrc} alt={site.site_name} className="site-img" />
          : <div className="site-img-placeholder">🚀</div>
        }
        <div className="site-img-overlay" />
        <div className="site-img-title">
          <h2>{site.site_name}</h2>
          <span className="mission-type" style={{ background: "#00d4ff", color: "#000" }}>
            {site.location}, {site.country}
          </span>
        </div>
      </div>

      {/* Tab switcher */}
      <div className="site-tabs">
        <button
          className={`site-tab ${tab === "info" ? "active" : ""}`}
          onClick={() => setTab("info")}
        >
          📋 Info
        </button>
        <button
          className={`site-tab ${tab === "map" ? "active" : ""}`}
          onClick={() => setTab("map")}
        >
          🗺️ Map
        </button>
      </div>

      {/* Info tab */}
      {tab === "info" && (
        <div className="site-info">
          <div className="specs-grid">
            <div className="spec-item">
              <span className="spec-label">Established</span>
              <span className="spec-value">{info.established || "—"}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Total Launches</span>
              <span className="spec-value" style={{ color: "#22c55e" }}>{site.total_launches}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Location</span>
              <span className="spec-value" style={{ fontSize: "0.85rem" }}>{site.location}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Country</span>
              <span className="spec-value">{site.country}</span>
            </div>
          </div>
          {info.description && (
            <p className="site-desc">{info.description}</p>
          )}
        </div>
      )}

      {/* Map tab */}
      {tab === "map" && (
        <div className="site-map">
          {mapUrl
            ? <iframe
                title={site.site_name}
                src={mapUrl}
                width="100%"
                height="250"
                style={{ border: "none", borderRadius: "8px" }}
                allowFullScreen
                loading="lazy"
              />
            : <p style={{ color: "#888", textAlign: "center", padding: "20px" }}>Map not available</p>
          }
        </div>
      )}

    </div>
  );
}

function LaunchSites() {
  const [sites, setSites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/launch-sites")
      .then(res => res.json())
      .then(data => {
        setSites(data);
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
          <div className="rocket">🌍</div>
          <p style={{ color: "#00d4ff", marginTop: "15px", letterSpacing: "2px", fontWeight: "bold" }}>
            LOCATING LAUNCH SITES...
          </p>
        </div>
      </div>

      <section className="mission-section">
        <div className="container">
          <h1 style={{ textAlign: "center", marginBottom: "10px", textShadow: "0 0 15px rgba(0,212,255,0.5)" }}>
            ISRO Launch Sites
          </h1>
          <p style={{ textAlign: "center", color: "#888", marginBottom: "50px", letterSpacing: "1px" }}>
            GROUND STATIONS — click Map to see location
          </p>

          {sites.length === 0 && !isLoading ? (
            <p style={{ color: "#888", textAlign: "center" }}>No launch sites found.</p>
          ) : (
            <div className="sites-grid">
              {sites.map(site => <LaunchSiteCard key={site.site_id} site={site} />)}
            </div>
          )}
        </div>
      </section>

      <style>{`
        .sites-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 440px)); gap: 40px; justify-content: center; padding-bottom: 80px; }

        .site-card { border-radius: 16px; background: rgba(255,255,255,0.04); backdrop-filter: blur(10px); border: 1px solid rgba(0,212,255,0.15); overflow: hidden; transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .site-card:hover { transform: translateY(-6px); box-shadow: 0 0 30px rgba(0,212,255,0.2); border-color: rgba(0,212,255,0.4); }

        .site-img-wrapper { position: relative; height: 200px; overflow: hidden; }
        .site-img { width: 100%; height: 100%; object-fit: cover; }
        .site-img-placeholder { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 4rem; background: #141c2f; }
        .site-img-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.85) 30%, transparent 100%); }
        .site-img-title { position: absolute; bottom: 16px; left: 16px; right: 16px; }
        .site-img-title h2 { font-size: 1.1rem; color: #fff; margin-bottom: 8px; text-shadow: 0 2px 8px rgba(0,0,0,0.9); }

        .site-tabs { display: flex; border-bottom: 1px solid rgba(0,212,255,0.15); }
        .site-tab { flex: 1; padding: 12px; background: transparent; border: none; color: #888; cursor: pointer; font-family: monospace; font-size: 0.85rem; font-weight: bold; letter-spacing: 1px; transition: all 0.2s ease; }
        .site-tab:hover { color: #00d4ff; background: rgba(0,212,255,0.05); }
        .site-tab.active { color: #00d4ff; border-bottom: 2px solid #00d4ff; background: rgba(0,212,255,0.08); }

        .site-info { padding: 20px; }
        .site-desc { font-size: 0.85rem; color: #aaa; line-height: 1.7; margin-top: 16px; }
        .site-map { padding: 16px; }

        .specs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .spec-item { background: rgba(255,255,255,0.05); border-radius: 8px; padding: 10px 12px; display: flex; flex-direction: column; gap: 4px; }
        .spec-label { font-size: 0.7rem; color: #888; letter-spacing: 1px; text-transform: uppercase; }
        .spec-value { font-size: 0.95rem; font-weight: bold; color: #fff; }
      `}</style>
    </>
  );
}

export default LaunchSites;