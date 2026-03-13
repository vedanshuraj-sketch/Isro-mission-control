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
// POST — add astronaut
router.post("/", async (req, res) => {
    try {
        const { name, role, nationality, mission_id, added_by } = req.body;
        const result = await db.query(
            `INSERT INTO astronaut (name, role, nationality, mission_id, added_by)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [name, role, nationality, mission_id, added_by]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add astronaut" });
    }
});

// PUT — update astronaut
router.put("/:id", async (req, res) => {
    try {
        const { name, role, nationality, mission_id, added_by } = req.body;
        const result = await db.query(
            `UPDATE astronaut SET name=$1, role=$2, nationality=$3, mission_id=$4, added_by=$5
             WHERE astronaut_id=$6 RETURNING *`,
            [name, role, nationality, mission_id, added_by, req.params.id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update astronaut" });
    }
});

// DELETE — delete astronaut
router.delete("/:id", async (req, res) => {
    try {
        await db.query("DELETE FROM astronaut WHERE astronaut_id=$1", [req.params.id]);
        res.json({ message: "Astronaut deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete astronaut" });
    }
});
module.exports = router;