const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
    try {
        const result = await db.query(`
            SELECT a.astronaut_id, a.name, a.role, a.nationality,
                   m.mission_name
            FROM Astronaut a
            LEFT JOIN Mission m ON a.mission_id = m.mission_id
            ORDER BY a.astronaut_id
        `);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch astronauts" });
    }
});

module.exports = router;