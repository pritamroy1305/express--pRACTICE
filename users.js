// =====================================================
// routes/users.js  → a MINI-APP of routes for /users
// We use express.Router() instead of app
// =====================================================

const express = require("express");
const router = express.Router(); // a small, separate route group

// NOTE: paths here are RELATIVE to where it's mounted.
// Mounted at "/users" → this "/" becomes "/users"
router.get("/", (req, res) => {
  res.send("All users");
});

// becomes GET /users/5
router.get("/:id", (req, res) => {
  res.send(`User ${req.params.id}`);
});

// becomes POST /users
router.post("/", (req, res) => {
  res.status(201).json({ created: req.body });
});

// IMPORTANT: export so other files can use it
module.exports = router;
