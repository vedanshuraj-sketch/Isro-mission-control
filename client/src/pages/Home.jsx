import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 

function Home() {
  const [missionCount, setMissionCount] = useState(0);
  const [rocketCount, setRocketCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
   
    Promise.all([
      fetch("http://localhost:5000/api/missions").then(res => res.json()).catch(() => []),
      fetch("http://localhost:5000/api/rockets").then(res => res.json()).catch(() => [])
    ]).then(([missionsData, rocketsData]) => {
     
      setMissionCount(missionsData.length || 0);
      setRocketCount(rocketsData.length || 0);
      
      setTimeout(() => {
        setIsLoading(false);
      }, 800); 
    });
  }, []);

  return (
    <div className="home-container">
      <div className="twinkle-layer"></div>
      <div className="nebula"></div>

      <div className={`loader ${!isLoading ? 'hidden' : ''}`} style={{ display: 'flex' }}>
        <div className="rocket-container">
          <div className="rocket"></div>
          <p style={{ color: '#00d4ff', marginTop: '15px', letterSpacing: '2px', fontWeight: 'bold' }}>
            ESTABLISHING COMM LINK...
          </p>
        </div>
      </div>

      <section className="hero">
        <div className="hero-content">
          <h1>"सुस्वागतम् मिशन नियन्त्रणम्"</h1>
          <p>A warm welcome to Mission Control</p>
          <h2>ISRO Mission Control</h2>
          <p>Advanced telemetry, satellite tracking, and orbital database management system.</p>
          <Link to="/missions" className="btn-primary">Initialize Dashboard</Link>
        </div>
      </section>

      <section className="dashboard-preview">
        <h2>System Overview</h2>
        <div className="cards-container">
          <div className="card">
            <h3>Active Missions</h3>
            <p className="number">{missionCount}</p>
          </div>

          <div className="card">
            <h3>Deployed Rockets</h3>
            <p className="number">{rocketCount}</p>
          </div>
          
          <div className="card">
            <h3>Tracked Satellites</h3>

            <p className="number">142</p> 
          </div>
        </div>
      </section>

      <section className="features">
        <div className="features-container">
          <div className="feature-box">
            <h3>Live Telemetry</h3>
            <p>Real-time tracking of launch vehicles and exact orbital parameters.</p>
          </div>
          <div className="feature-box">
            <h3>Asset Database</h3>
            <p>Comprehensive logs of all historical and active ISRO orbital assets.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;