import React, { useEffect, useState } from "react";

function Missions() {
  const [missions, setMissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMission, setSelectedMission] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/missions")
      .then(res => res.json())
      .then(data => {
        setMissions(data);
        // Adding a tiny delay so the loader doesn't just flash instantly
        setTimeout(() => setIsLoading(false), 500);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  const handleCardClick = (mission) => {
    setSelectedMission(mission);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedMission(null), 300);
  };
  return (
    <>
      {/* 1. Deep Space Background Animations */}
      <div className="twinkle-layer"></div>
      <div className="nebula"></div>

      {/* 2. Premium Rocket Loader */}
      <div className={`loader ${!isLoading ? 'hidden' : ''}`} style={{ display: 'flex' }}>
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

          <div className="missions-grid">
            {missions.map(mission => (
              <div key={mission.mission_id} className="mission-card" onClick={() => handleCardClick(mission)} style={{cursor: 'pointer'}}>

                
                {/* 3. Updated tags to trigger your CSS correctly */}
                <h2>{mission.mission_name}</h2>
                <span className="mission-type">{mission.mission_type}</span>
                
                <p style={{ marginTop: '10px' }}>
                  <strong>Launch:</strong> {new Date(mission.launch_date).toLocaleDateString()}
                </p>
                <p className="status">
                  Status: <span style={{ color: '#00d4ff' }}>{mission.status}</span>
                </p>
                
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className={`modal ${isModalOpen ? 'show' : ''}`}
      onClick={closeModal}>
        <div className="modal-content"
        onClick = {(e) => e.stopPropagation()}>
          <span className="close-btn" onClick={closeModal}>&times;</span>
          {selectedMission && (
            <>
            <h2 style={{marginBottom: '10px'}}>{selectedMission.mission_name}</h2>
            <span className="mission-type">{selectedMission.mission_type}</span>

            <div style={{marginTop: '20px', lineHeight: '1.8'}}>
              <p><strong>Launnch Date:</strong>{new Date(selectedMission.launch_date).toLocaleDateString()}</p>
              <p><strong>Current Status:</strong><span style={{color: '#00d4ff'}}>{selectedMission.status}</span></p>

              {selectedMission.description && (
                <p style={{marginTop: '15px', color:'#cccccc'}}>
                  {selectedMission.description}
                </p>
              )}
            </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Missions;