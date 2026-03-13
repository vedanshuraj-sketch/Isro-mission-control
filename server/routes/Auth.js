const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/verify", async (req, res) => {
  try {
    const { code, device } = req.body;

    if (!code) return res.status(400).json({ error: "Code is required" });

    // Check code in DB
    const result = await db.query(
      "SELECT * FROM access_codes WHERE code = $1",
      [code]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid access code" });
    }

    const { role, permissions } = result.rows[0];

    // Parse device info from user agent
    const ua = device || "";
    let deviceType = "Desktop";
    if (/mobile/i.test(ua)) deviceType = "Mobile";
    else if (/tablet|ipad/i.test(ua)) deviceType = "Tablet";

    let browser = "Unknown";
    if (/chrome/i.test(ua) && !/edg/i.test(ua)) browser = "Chrome";
    else if (/firefox/i.test(ua)) browser = "Firefox";
    else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = "Safari";
    else if (/edg/i.test(ua)) browser = "Edge";

    // Get IP
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "Unknown";

    // Log the access
    await db.query(
      `INSERT INTO access_logs (code, role, device, browser, ip_address)
       VALUES ($1, $2, $3, $4, $5)`,
      [code, role, deviceType, browser, ip]
    );

    res.json({ code, role, permissions });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/auth/logs — Master Admin can view all login logs
router.get("/logs", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM access_logs ORDER BY logged_in_at DESC LIMIT 50"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch logs" });
  }
});

module.exports = router;