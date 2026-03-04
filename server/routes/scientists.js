const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
    try {
        const result = await db.query(`
            SELECT s.scientist_id, s.name, s.designation, s.department,
                   COUNT(ms.mission_id) AS mission_count
            FROM scientist s
            LEFT JOIN mission_scientist ms ON s.scientist_id = ms.scientist_id
            GROUP BY s.scientist_id
            ORDER BY s.scientist_id
        `);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch scientists" });
    }
});

module.exports = router;