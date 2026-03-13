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
// POST — add satellite
router.post("/", async (req, res) => {
    try {
        const { satellite_name, purpose, orbit_type, weight_kg, mission_id, added_by } = req.body;
        const result = await db.query(
            `INSERT INTO satellite (satellite_name, purpose, orbit_type, weight_kg, mission_id, added_by)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [satellite_name, purpose, orbit_type, weight_kg, mission_id, added_by]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add satellite" });
    }
});

// PUT — update satellite
router.put("/:id", async (req, res) => {
    try {
        const { satellite_name, purpose, orbit_type, weight_kg, mission_id, added_by } = req.body;
        const result = await db.query(
            `UPDATE satellite SET satellite_name=$1, purpose=$2, orbit_type=$3, weight_kg=$4, mission_id=$5, added_by=$6
             WHERE satellite_id=$7 RETURNING *`,
            [satellite_name, purpose, orbit_type, weight_kg, mission_id, added_by, req.params.id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update satellite" });
    }
});

// DELETE — delete satellite
router.delete("/:id", async (req, res) => {
    try {
        await db.query("DELETE FROM satellite WHERE satellite_id=$1", [req.params.id]);
        res.json({ message: "Satellite deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete satellite" });
    }
});
module.exports = router;