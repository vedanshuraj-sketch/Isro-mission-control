const express = require("express");
const cors = require("cors");
const pool = require("./db");
const rocketsRouter = require("./routes/rockets");
const satellitesRouter = require("./routes/satellites");
const scientistsRouter = require("./routes/scientists");
const astronautsRouter = require("./routes/astronauts");
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/rockets", rocketsRouter);
app.use("/api/satellites", satellitesRouter);
app.use("/api/scientists", scientistsRouter);
app.use("/api/astronauts", astronautsRouter);
app.get("/", (req, res) => {
    res.send("ISRO Backend Running");
});

app.get("/api/missions", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM Mission");
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
            "INSERT INTO Mission (mission_name, mission_type, status, launch_date) VALUES ($1, $2, $3, $4) RETURNING *",
            [mission_name, mission_type, status, launch_date]
        );
        res.json(newMission.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});