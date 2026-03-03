const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("ISRO Backend Runninggg");
});

// --- MISSIONS ROUTES ---
app.get("/api/missions", async (req, res) => {
    try {
        const result = await pool.query("select * from Mission");
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Database error" });
    }
});

app.post("/api/missions", async (req, res) => {
    try {
        const { mission_name, mission_type, status, launch_date } = req.body;

        const newMission = await pool.query(
            "Insert into Mission (mission_name, mission_type, status, launch_date) values ($1, $2, $3, $4) returning *",
            [mission_name, mission_type, status, launch_date]
        );

        res.json(newMission.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// --- ROCKETS ROUTES ---
app.get('/api/rockets', (req, res) => {
  // Mock ISRO rocket data to clear the error and test the UI
  const rocketData = [
    { rocket_id: 1, name: "PSLV", type: "Medium-lift", status: "Active" },
    { rocket_id: 2, name: "GSLV", type: "Heavy-lift", status: "Active" },
    { rocket_id: 3, name: "LVM3", type: "Heavy-lift", status: "Active" },
    { rocket_id: 4, name: "SSLV", type: "Small-lift", status: "Active" },
    { rocket_id: 5, name: "SLV-3", type: "Light-lift", status: "Retired" }
  ];

  res.json(rocketData);
});

// --- SERVER LISTEN (Always at the very bottom!) ---
app.listen(5000, () => {
    console.log("Server running on port 5000");
});