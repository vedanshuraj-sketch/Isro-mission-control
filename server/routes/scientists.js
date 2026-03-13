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
// POST — add new scientist
router.post("/", async (req, res) => {
    try {
        const { name, designation, department, contact } = req.body;
        const result = await db.query(
            `INSERT INTO scientist (name, designation, department, contact)
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [name, designation, department, contact]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add scientist" });
    }
});

// PUT — update scientist
router.put("/:id", async (req, res) => {
    try {
        const { name, designation, department, contact } = req.body;
        const result = await db.query(
            `UPDATE scientist SET name=$1, designation=$2, department=$3, contact=$4
             WHERE scientist_id=$5 RETURNING *`,
            [name, designation, department, contact, req.params.id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update scientist" });
    }
});

// DELETE — delete scientist
router.delete("/:id", async (req, res) => {
    try {
        await db.query("DELETE FROM scientist WHERE scientist_id=$1", [req.params.id]);
        res.json({ message: "Scientist deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete scientist" });
    }
});
module.exports = router;