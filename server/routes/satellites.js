const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
    try {
        const result = await db.query(`
            SELECT s.satellite_id, s.satellite_name, s.purpose, 
                   s.orbit_type, s.weight_kg, m.mission_name
            FROM satellite s
            JOIN mission m ON s.mission_id = m.mission_id
            ORDER BY s.satellite_id
        `);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch satellites" });
    }
});

module.exports = router;