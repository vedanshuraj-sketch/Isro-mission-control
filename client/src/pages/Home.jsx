import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const sections = [
  {
    id: "missions",
    title: "MISSIONS",
    subtitle: "17 MISSIONS LAUNCHED",
    description: "From Aryabhata in 1975 to Chandrayaan-3 in 2023. Every mission that took India to the stars.",
    link: "/missions",
    linkText: "EXPLORE MISSIONS",
    bg: "radial-gradient(ellipse at bottom left, #0d1b2a 0%, #000814 100%)",
    accent: "#00d4ff",
  },
  {
    id: "rockets",
    title: "LAUNCH VEHICLES",
    subtitle: "POWERING INDIA TO ORBIT",
    description: "PSLV, GSLV, LVM3, SSLV — the rockets that carry India's dreams beyond Earth.",
    link: "/rockets",
    linkText: "VIEW ROCKETS",
    bg: "radial-gradient(ellipse at top right, #1a0d00 0%, #000814 100%)",
    accent: "#f97316",
  },
  {
    id: "satellites",
    title: "SATELLITES",
    subtitle: "ORBITING THE EARTH AND BEYOND",
    description: "17 satellites in LEO, GEO, Lunar and Mars orbits. India's eyes in the sky.",
    link: "/satellites",
    linkText: "VIEW SATELLITES",
    bg: "radial-gradient(ellipse at center, #0d0a1a 0%, #000814 100%)",
    accent: "#a855f7",
  },
  {
    id: "scientists",
    title: "THE SCIENTISTS",
    subtitle: "MINDS BEHIND THE MISSIONS",
    description: "Vikram Sarabhai, APJ Abdul Kalam, K. Sivan, S. Somnath — the visionaries who built India's space legacy.",
    link: "/scientists",
    linkText: "MEET THE TEAM",
    bg: "radial-gradient(ellipse at bottom, #0a1a0d 0%, #000814 100%)",
    accent: "#22c55e",
  },
  {
    id: "astronauts",
    title: "THE CREW",
    subtitle: "INDIA'S HEROES OF SPACE",
    description: "Rakesh Sharma, Kalpana Chawla, Sunita Williams — those who dared to leave Earth behind.",
    link: "/astronauts",
    linkText: "MEET THE CREW",
    bg: "radial-gradient(ellipse at top, #1a1a00 0%, #000814 100%)",
    accent: "#facc15",
  },
  {
    id: "launchsites",
    title: "LAUNCH SITES",
    subtitle: "WHERE IT ALL BEGINS",
    description: "Satish Dhawan Space Centre and Thumba Equatorial Launch Station — the birthplaces of India's space missions.",
    link: "/launch-sites",
    linkText: "EXPLORE SITES",
    bg: "radial-gradient(ellipse at center right, #1a0014 0%, #000814 100%)",
    accent: "#ec4899",
  },
];

function ScrollSection({ section, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} style={{
      height: "100vh",
      display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "center",
      textAlign: "center", padding: "0 10%",
      background: section.bg,
      position: "relative", overflow: "hidden",
    }}>
      {/* Grid overlay */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
        backgroundSize: "60px 60px", pointerEvents: "none",
      }} />

      {/* Accent glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse at center, ${section.accent}11 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      <div style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(50px)",
        transition: "opacity 1s ease, transform 1s ease",
        position: "relative", zIndex: 1, maxWidth: "800px",
      }}>
        <p style={{ color: section.accent, letterSpacing: "5px", fontSize: "0.75rem", marginBottom: "20px", fontWeight: "bold" }}>
          {section.subtitle}
        </p>
        <h1 style={{
          fontSize: "3.5rem", fontWeight: "bold", color: "#fff",
          marginBottom: "24px", letterSpacing: "3px",
          textShadow: `0 0 40px ${section.accent}44`, lineHeight: 1.1,
        }}>
          {section.title}
        </h1>
        <p style={{ fontSize: "1rem", color: "#aaa", maxWidth: "600px", margin: "0 auto 40px", lineHeight: "1.8" }}>
          {section.description}
        </p>
        <Link to={section.link} style={{
          display: "inline-block", padding: "14px 36px",
          border: `1px solid ${section.accent}`,
          color: section.accent, textDecoration: "none",
          letterSpacing: "3px", fontSize: "0.8rem",
          fontWeight: "bold", fontFamily: "monospace",
          background: `${section.accent}11`, transition: "all 0.3s ease",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = `${section.accent}33`; e.currentTarget.style.boxShadow = `0 0 20px ${section.accent}44`; }}
          onMouseLeave={e => { e.currentTarget.style.background = `${section.accent}11`; e.currentTarget.style.boxShadow = "none"; }}
        >
          {section.linkText}
        </Link>
      </div>

      {/* Section number */}
      <p style={{
        position: "absolute", bottom: "30px", right: "5%",
        color: "rgba(255,255,255,0.06)", fontSize: "6rem",
        fontWeight: "bold", lineHeight: 1, userSelect: "none",
      }}>
        {String(index).padStart(2, "0")}
      </p>
    </section>
  );
}

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setHeroVisible(true), 200);
    }, 1000);
  }, []);

  return (
    <div>
      <div className="twinkle-layer"></div>
      <div className="nebula"></div>

      {/* Loader */}
      <div className={`loader ${!isLoading ? "hidden" : ""}`}>
        <div className="rocket-container">
          <div className="rocket"></div>
          <p style={{ color: "#00d4ff", marginTop: "15px", letterSpacing: "2px", fontWeight: "bold" }}>
            ESTABLISHING COMM LINK...
          </p>
        </div>
      </div>

      {/* HERO — full screen video */}
      <section style={{ position: "relative", height: "100vh", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>

        {/* Video background */}
        <video
          autoPlay muted loop playsInline
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 60%, rgba(0,8,20,1) 100%)",
        }} />

        {/* Hero content */}
        <div style={{
          position: "relative", zIndex: 2, textAlign: "center", padding: "0 10%",
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 1.2s ease, transform 1.2s ease",
          maxWidth: "900px",
        }}>
          <p style={{ color: "#00d4ff", letterSpacing: "6px", fontSize: "0.75rem", marginBottom: "24px", fontWeight: "bold" }}>
            🇮🇳 INDIAN SPACE RESEARCH ORGANISATION
          </p>
          <h1 style={{
            fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: "bold",
            color: "#fff", marginBottom: "12px", letterSpacing: "4px",
            textShadow: "0 0 60px rgba(0,212,255,0.3)", lineHeight: 1.1,
          }}>
            ISRO MISSION CONTROL
          </h1>
          <p style={{
            fontSize: "clamp(0.9rem, 2vw, 1.1rem)", color: "#cccccc",
            marginBottom: "40px", letterSpacing: "1px", lineHeight: 1.8,
            maxWidth: "600px", margin: "0 auto 40px",
          }}>
            Advanced telemetry, satellite tracking, and orbital database management system.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/missions" style={{
              padding: "14px 40px", background: "#00d4ff",
              color: "#000", textDecoration: "none",
              letterSpacing: "3px", fontSize: "0.8rem",
              fontWeight: "bold", fontFamily: "monospace",
              transition: "all 0.3s ease",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "#00aacc"; e.currentTarget.style.boxShadow = "0 0 25px #00d4ff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#00d4ff"; e.currentTarget.style.boxShadow = "none"; }}
            >
              INITIALIZE DASHBOARD
            </Link>
            <Link to="/rockets" style={{
              padding: "14px 40px", background: "transparent",
              color: "#fff", textDecoration: "none",
              letterSpacing: "3px", fontSize: "0.8rem",
              fontWeight: "bold", fontFamily: "monospace",
              border: "1px solid rgba(255,255,255,0.4)",
              transition: "all 0.3s ease",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#fff"; e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; e.currentTarget.style.background = "transparent"; }}
            >
              VIEW ROCKETS
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: "40px", left: "50%",
          transform: "translateX(-50%)", zIndex: 2,
          display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
          animation: "bounce 2s infinite", opacity: 0.6,
        }}>
          <p style={{ fontSize: "0.65rem", letterSpacing: "4px", color: "#888" }}>SCROLL</p>
          <div style={{ width: "1px", height: "50px", background: "linear-gradient(to bottom, #888, transparent)" }} />
        </div>
      </section>

      {/* SCROLL SECTIONS */}
      {sections.map((section, i) => (
        <ScrollSection key={section.id} section={section} index={i + 1} />
      ))}

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(10px); }
        }
      `}</style>
      <Footer />
    </div>
  );
}

export default Home;