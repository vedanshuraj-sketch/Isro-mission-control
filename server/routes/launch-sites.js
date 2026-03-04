const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) =>{
    try {
        const result = await db.query(`
             SELECT ls.site_id, ls.site_name, ls.location, ls.country,
                   COUNT(m.mission_id) AS total_launches
            FROM launch_site ls
            LEFT JOIN mission m ON ls.site_id = m.site_id
            GROUP BY ls.site_id
            ORDER BY ls.site_id
            `);
            res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch launch sites" });

    }
});

module.exports = router;