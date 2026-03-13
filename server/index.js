const express = require("express");
const cors = require("cors");
const pool = require("./db");
const rocketsRouter = require("./routes/rockets");
const satellitesRouter = require("./routes/satellites");
const scientistsRouter = require("./routes/scientists");
const astronautsRouter = require("./routes/astronauts");
const launchSitesRouter = require("./routes/launch-sites");
const authRouter = require("./routes/Auth.js");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/rockets", rocketsRouter);
app.use("/api/satellites", satellitesRouter);
app.use("/api/scientists", scientistsRouter);
app.use("/api/astronauts", astronautsRouter);
app.use("/api/launch-sites", launchSitesRouter);
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
    res.send("ISRO Backend Running");
});

// MISSIONS — GET all
app.get("/api/missions", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM Mission");
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Database error" });
    }
});

// MISSIONS — POST add
app.post("/api/missions", async (req, res) => {
    try {
        const { mission_name, mission_type, status, launch_date, added_by } = req.body;
        const result = await pool.query(
            `INSERT INTO Mission (mission_name, mission_type, status, launch_date, added_by)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [mission_name, mission_type, status, launch_date, added_by]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// MISSIONS — PUT update
app.put("/api/missions/:id", async (req, res) => {
    try {
        const { mission_name, mission_type, status, launch_date, added_by } = req.body;
        const result = await pool.query(
            `UPDATE mission SET mission_name=$1, mission_type=$2, status=$3, launch_date=$4, added_by=$5
             WHERE mission_id=$6 RETURNING *`,
            [mission_name, mission_type, status, launch_date, added_by, req.params.id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// MISSIONS — DELETE
app.delete("/api/missions/:id", async (req, res) => {
    try {
        await pool.query("DELETE FROM mission WHERE mission_id=$1", [req.params.id]);
        res.json({ message: "Mission deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});