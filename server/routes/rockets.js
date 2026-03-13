const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM rocket ORDER BY rocket_id");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch rockets" });
    }
});
// PUT — update rocket
router.put("/:id", async (req, res) => {
    try {
        const { rocket_name, type, capacity_kg, manufacturer, added_by } = req.body;
        const result = await db.query(
            `UPDATE rocket SET rocket_name=$1, type=$2, capacity_kg=$3, manufacturer=$4, added_by=$5
             WHERE rocket_id=$6 RETURNING *`,
            [rocket_name, type, capacity_kg, manufacturer, added_by, req.params.id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update rocket" });
    }
});

// DELETE — delete rocket
router.delete("/:id", async (req, res) => {
    try {
        await db.query("DELETE FROM rocket WHERE rocket_id=$1", [req.params.id]);
        res.json({ message: "Rocket deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete rocket" });
    }
});
module.exports = router;