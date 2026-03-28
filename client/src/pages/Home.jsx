import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function MarqueeRow({ items, direction = 1, speed = 30 }) {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    let frame;
    let last = null;
    const animate = (ts) => {
      if (last !== null) setOffset(o => (o + direction * (ts - last) / 1000 * speed) % 100);
      last = ts;
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [direction, speed]);

  const repeated = [...items, ...items, ...items];
  return (
    <div style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
      <div style={{ display: "inline-block", transform: `translateX(-${offset}%)`, transition: "none" }}>
        {repeated.map((item, i) => (
          <span key={i} style={{
            display: "inline-block", padding: "0 40px",
            fontSize: "clamp(1.2rem, 3vw, 2rem)",
            fontWeight: "bold", letterSpacing: "4px",
            color: item.color || "rgba(255,255,255,0.15)",
            fontFamily: "monospace",
          }}>
            {item.text} <span style={{ color: "#00d4ff", opacity: 0.4 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

const missions = [
  { name: "Chandrayaan-3", type: "Lunar", year: "2023", status: "SUCCESS", color: "#00d4ff" },
  { name: "Aditya-L1", type: "Solar", year: "2023", status: "ACTIVE", color: "#facc15" },
  { name: "Mangalyaan", type: "Mars", year: "2013", status: "COMPLETED", color: "#f97316" },
  { name: "Chandrayaan-1", type: "Lunar", year: "2008", status: "COMPLETED", color: "#a855f7" },
  { name: "Astrosat", type: "Astronomy", year: "2015", status: "ACTIVE", color: "#22c55e" },
  { name: "GSAT-19", type: "Communication", year: "2017", status: "COMPLETED", color: "#ec4899" },
];

const stats = [
  { value: "17+", label: "MISSIONS" },
  { value: "4", label: "ROCKETS" },
  { value: "17", label: "SATELLITES" },
  { value: "1969", label: "EST." },
];

function Home() {
  const [heroRef, heroVisible] = useInView(0.1);
  const [statsRef, statsVisible] = useInView(0.2);
  const [missionsRef, missionsVisible] = useInView(0.1);
  const [quoteRef, quoteVisible] = useInView(0.3);
  const [ctaRef, ctaVisible] = useInView(0.3);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const marqueeItems1 = [
    { text: "MISSIONS" }, { text: "ROCKETS" }, { text: "SATELLITES" },
    { text: "SCIENTISTS" }, { text: "ASTRONAUTS" }, { text: "LAUNCH SITES" },
  ];
  const marqueeItems2 = [
    { text: "CHANDRAYAAN", color: "rgba(0,212,255,0.2)" },
    { text: "MANGALYAAN", color: "rgba(249,115,22,0.2)" },
    { text: "ADITYA-L1", color: "rgba(250,204,21,0.2)" },
    { text: "ASTROSAT", color: "rgba(34,197,94,0.2)" },
  ];

  return (
    <div style={{ background: "#000814", minHeight: "100vh", overflowX: "hidden" }}>
      <div className="twinkle-layer"></div>
      <div className="nebula"></div>

      {/* HERO */}
      <section ref={heroRef} style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "0 6%",
        position: "relative", overflow: "hidden",
      }}>
        {/* Grid parallax */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          transform: `translateY(${scrollY * 0.3}px)`,
          pointerEvents: "none",
        }} />

        {/* Two column layout */}
        <div className="hero-two-col" style={{
          position: "relative", zIndex: 1,
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          gap: "60px", width: "100%",
        }}>

          {/* LEFT — text */}
          <div style={{
            flex: "1", maxWidth: "550px",
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(60px)",
            transition: "opacity 1.2s ease, transform 1.2s ease",
          }}>
            <p style={{ color: "#00d4ff", letterSpacing: "6px", fontSize: "0.7rem", marginBottom: "32px", fontFamily: "monospace" }}>
              🇮🇳 INDIAN SPACE RESEARCH ORGANISATION — EST. 1969
            </p>
            <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)", fontWeight: "900", lineHeight: 1, marginBottom: "16px", letterSpacing: "-1px", color: "#fff" }}>
              <span style={{ display: "block" }}>MISSION</span>
              <span style={{ display: "block", WebkitTextStroke: "2px rgba(255,255,255,0.3)", color: "transparent" }}>CONTROL</span>
            </h1>
            <p style={{ fontSize: "clamp(1rem, 2vw, 1.3rem)", color: "rgba(0,212,255,0.9)", fontStyle: "italic", letterSpacing: "2px", marginBottom: "8px" }}>
              "सुस्वागतम् मिशन नियन्त्रणम्"
            </p>
            <p style={{ color: "#555", fontSize: "0.7rem", letterSpacing: "4px", marginBottom: "40px" }}>
              A WARM WELCOME TO MISSION CONTROL
            </p>
            <p style={{ fontSize: "clamp(0.9rem, 1.5vw, 1rem)", color: "#888", lineHeight: "1.9", marginBottom: "48px" }}>
              Advanced telemetry, satellite tracking, and orbital database management system for ISRO's space missions.
            </p>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <Link to="/missions" style={{
                padding: "16px 44px", background: "#00d4ff", color: "#000",
                textDecoration: "none", letterSpacing: "3px", fontSize: "0.78rem",
                fontWeight: "900", fontFamily: "monospace", transition: "all 0.3s ease", display: "inline-block",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#00d4ff"; e.currentTarget.style.transform = "translateY(0)"; }}
              >EXPLORE MISSIONS →</Link>
              <Link to="/access" style={{
                padding: "16px 44px", background: "transparent", color: "#fff",
                textDecoration: "none", letterSpacing: "3px", fontSize: "0.78rem",
                fontWeight: "900", fontFamily: "monospace",
                border: "1px solid rgba(255,255,255,0.2)", transition: "all 0.3s ease", display: "inline-block",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#fff"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >ACCESS PORTAL</Link>
            </div>
          </div>

          {/* RIGHT — rocket image */}
          <div style={{
            flex: "1", maxWidth: "580px",
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 1.5s ease 0.3s, transform 1.5s ease 0.3s",
            position: "relative",
          }}>
            {/* Glow behind image */}
            <div style={{
              position: "absolute", inset: "-30px",
              background: "radial-gradient(ellipse at center, rgba(0,212,255,0.12) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />
            {/* Corner decorations */}
            <div style={{ position: "absolute", top: "-8px", left: "-8px", width: "24px", height: "24px", borderTop: "2px solid #00d4ff", borderLeft: "2px solid #00d4ff", zIndex: 2 }} />
            <div style={{ position: "absolute", top: "-8px", right: "-8px", width: "24px", height: "24px", borderTop: "2px solid #00d4ff", borderRight: "2px solid #00d4ff", zIndex: 2 }} />
            <div style={{ position: "absolute", bottom: "-8px", left: "-8px", width: "24px", height: "24px", borderBottom: "2px solid #00d4ff", borderLeft: "2px solid #00d4ff", zIndex: 2 }} />
            <div style={{ position: "absolute", bottom: "-8px", right: "-8px", width: "24px", height: "24px", borderBottom: "2px solid #00d4ff", borderRight: "2px solid #00d4ff", zIndex: 2 }} />

            {/* Image */}
            <div style={{
              border: "1px solid rgba(0,212,255,0.15)",
              borderRadius: "4px", overflow: "hidden",
              boxShadow: "0 0 80px rgba(0,212,255,0.08), 0 40px 80px rgba(0,0,0,0.5)",
            }}>
              <img
                src="/images/rocket-hero.webp"
                alt="ISRO Rocket at Launch Pad"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "brightness(0.85) contrast(1.1) saturate(0.9)" }}
              />
              {/* Overlay gradient */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to right, rgba(0,8,20,0.3) 0%, transparent 40%), linear-gradient(to top, rgba(0,8,20,0.7) 0%, transparent 40%)",
              }} />
              {/* Caption */}
              <div style={{ position: "absolute", bottom: "20px", left: "20px", zIndex: 3 }}>
                <p style={{ color: "#00d4ff", fontSize: "0.6rem", letterSpacing: "3px", fontFamily: "monospace", marginBottom: "4px" }}>▶ GSLV MK-III</p>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.55rem", letterSpacing: "2px", fontFamily: "monospace" }}>SATISH DHAWAN SPACE CENTRE, SRIHARIKOTA</p>
              </div>
              {/* Live indicator */}
              <div style={{ position: "absolute", top: "16px", right: "16px", display: "flex", alignItems: "center", gap: "6px", zIndex: 3 }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e", animation: "pulse 2s infinite" }} />
                <span style={{ color: "#22c55e", fontSize: "0.55rem", letterSpacing: "2px", fontFamily: "monospace" }}>LAUNCH READY</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: "40px", left: "6%", display: "flex", alignItems: "center", gap: "12px", opacity: 0.4 }}>
          <div style={{ width: "40px", height: "1px", background: "#fff" }} />
          <p style={{ fontSize: "0.65rem", letterSpacing: "4px", color: "#fff" }}>SCROLL</p>
        </div>
      </section>

      {/* MARQUEE 1 */}
      <div style={{ padding: "24px 0", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <MarqueeRow items={marqueeItems1} direction={1} speed={25} />
      </div>

      {/* STATS */}
      <section ref={statsRef} style={{ padding: "120px 6%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.06)" }}>
          {stats.map((stat, i) => (
            <div key={i} style={{
              padding: "60px 40px", background: "#000814",
              opacity: statsVisible ? 1 : 0,
              transform: statsVisible ? "translateY(0)" : "translateY(40px)",
              transition: `opacity 0.8s ease ${i * 0.15}s, transform 0.8s ease ${i * 0.15}s`,
            }}>
              <p style={{ fontSize: "clamp(3rem, 6vw, 5rem)", fontWeight: "900", color: "#fff", marginBottom: "8px", lineHeight: 1 }}>{stat.value}</p>
              <p style={{ fontSize: "0.7rem", color: "#555", letterSpacing: "4px" }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MARQUEE 2 */}
      <div style={{ padding: "24px 0", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <MarqueeRow items={marqueeItems2} direction={-1} speed={20} />
      </div>

      {/* MISSIONS GRID */}
      <section ref={missionsRef} style={{ padding: "120px 6%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "60px", flexWrap: "wrap", gap: "20px" }}>
          <div>
            <p style={{ color: "#555", letterSpacing: "4px", fontSize: "0.7rem", marginBottom: "16px" }}>FEATURED MISSIONS</p>
            <h2 style={{ fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: "900", color: "#fff", lineHeight: 1 }}>
              17 MISSIONS.<br />
              <span style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)", color: "transparent" }}>INDIA TO THE STARS.</span>
            </h2>
          </div>
          <Link to="/missions" style={{ color: "#00d4ff", textDecoration: "none", letterSpacing: "3px", fontSize: "0.75rem", fontFamily: "monospace", fontWeight: "bold", borderBottom: "1px solid #00d4ff", paddingBottom: "4px" }}>VIEW ALL →</Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1px", background: "rgba(255,255,255,0.06)" }}>
          {missions.map((mission, i) => (
            <Link to="/missions" key={i} style={{
              padding: "40px", background: "#000814",
              cursor: "pointer", position: "relative", overflow: "hidden",
              textDecoration: "none",
              opacity: missionsVisible ? 1 : 0,
              transform: missionsVisible ? "translateY(0)" : "translateY(40px)",
              transition: `opacity 0.8s ease ${i * 0.1}s, transform 0.8s ease ${i * 0.1}s, background 0.3s ease`,
              display: "block",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = `${mission.color}08`; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#000814"; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px" }}>
                <span style={{ padding: "4px 12px", border: `1px solid ${mission.color}44`, color: mission.color, fontSize: "0.65rem", letterSpacing: "2px", fontFamily: "monospace" }}>{mission.status}</span>
                <span style={{ color: "#333", fontSize: "0.7rem", letterSpacing: "2px" }}>{mission.year}</span>
              </div>
              <h3 style={{ fontSize: "1.4rem", fontWeight: "bold", color: "#fff", marginBottom: "8px" }}>{mission.name}</h3>
              <p style={{ color: "#555", fontSize: "0.75rem", letterSpacing: "2px" }}>{mission.type} MISSION</p>
              <div style={{ position: "absolute", bottom: "24px", right: "24px", color: mission.color, fontSize: "1.2rem", opacity: 0.3 }}>→</div>
            </Link>
          ))}
        </div>
      </section>

      {/* QUOTE */}
      <section ref={quoteRef} style={{
        padding: "120px 6%",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", left: "50%", top: "50%",
          transform: `translate(-50%, -50%) translateY(${scrollY * 0.1}px)`,
          fontSize: "20vw", color: "rgba(255,255,255,0.02)",
          fontWeight: "900", whiteSpace: "nowrap", pointerEvents: "none", userSelect: "none",
        }}>ISRO</div>
        <div style={{
          position: "relative", zIndex: 1, maxWidth: "800px", margin: "0 auto", textAlign: "center",
          opacity: quoteVisible ? 1 : 0,
          transform: quoteVisible ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 1s ease, transform 1s ease",
        }}>
          <p style={{ color: "#555", letterSpacing: "4px", fontSize: "0.65rem", marginBottom: "40px" }}>OUR MOTTO</p>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: "900", color: "#fff", lineHeight: 1.2, marginBottom: "24px" }}>
            "भयत्यागाद् हि<br />
            <span style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)", color: "transparent" }}>प्रस्थानम्।"</span>
          </h2>
          <p style={{ color: "#00d4ff", letterSpacing: "4px", fontSize: "0.8rem", marginBottom: "8px" }}>LIFE BEGINS WHEN FEAR ENDS</p>
          <p style={{ color: "#333", fontSize: "0.7rem", letterSpacing: "2px" }}>— ANCIENT SANSKRIT WISDOM</p>
        </div>
      </section>

      {/* EXPLORE LINKS */}
      <section style={{ padding: "120px 6%" }}>
        <p style={{ color: "#555", letterSpacing: "4px", fontSize: "0.7rem", marginBottom: "60px" }}>EXPLORE</p>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {[
            { to: "/rockets", label: "Launch Vehicles", sub: "4 ROCKETS", color: "#f97316" },
            { to: "/satellites", label: "Satellites", sub: "17 IN ORBIT", color: "#a855f7" },
            { to: "/scientists", label: "Scientists", sub: "THE VISIONARIES", color: "#22c55e" },
            { to: "/astronauts", label: "Astronauts", sub: "INDIA'S HEROES", color: "#facc15" },
            { to: "/launch-sites", label: "Launch Sites", sub: "2 SITES", color: "#ec4899" },
          ].map((item, i) => (
            <Link key={i} to={item.to} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "28px 0", borderBottom: "1px solid rgba(255,255,255,0.06)",
              textDecoration: "none", transition: "all 0.3s ease",
            }}
              onMouseEnter={e => { e.currentTarget.style.paddingLeft = "16px"; e.currentTarget.style.borderBottomColor = item.color; }}
              onMouseLeave={e => { e.currentTarget.style.paddingLeft = "0"; e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.06)"; }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                <span style={{ color: "#333", fontSize: "0.7rem", fontFamily: "monospace" }}>0{i + 1}</span>
                <span style={{ fontSize: "clamp(1.2rem, 3vw, 2rem)", fontWeight: "bold", color: "#fff" }}>{item.label}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                <span style={{ color: "#555", fontSize: "0.7rem", letterSpacing: "3px" }}>{item.sub}</span>
                <span style={{ color: item.color, fontSize: "1.2rem" }}>→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} style={{
        padding: "120px 6%", textAlign: "center",
        background: "radial-gradient(ellipse at center, rgba(0,212,255,0.05) 0%, transparent 70%)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}>
        <div style={{
          opacity: ctaVisible ? 1 : 0,
          transform: ctaVisible ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 1s ease, transform 1s ease",
        }}>
          <p style={{ color: "#555", letterSpacing: "4px", fontSize: "0.7rem", marginBottom: "32px" }}>ACCESS PORTAL</p>
          <h2 style={{ fontSize: "clamp(2rem, 6vw, 5rem)", fontWeight: "900", color: "#fff", marginBottom: "48px", lineHeight: 1.1 }}>
            AUTHORIZED<br />
            <span style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)", color: "transparent" }}>PERSONNEL ONLY</span>
          </h2>
          <Link to="/access" style={{
            padding: "18px 56px", background: "#00d4ff", color: "#000",
            textDecoration: "none", letterSpacing: "4px", fontSize: "0.8rem",
            fontWeight: "900", fontFamily: "monospace",
            display: "inline-block", transition: "all 0.3s ease",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,212,255,0.3)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#00d4ff"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
          >ENTER MISSION CONTROL</Link>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @media (max-width: 768px) {
          .hero-two-col { flex-direction: column !important; }
          section { padding-left: 5% !important; padding-right: 5% !important; }
        }
      `}</style>
    </div>
  );
}

export default Home;