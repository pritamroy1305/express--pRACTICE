// =====================================================
// routes/products.js → routes for /products
// Same idea as users.js. One file per feature.
// =====================================================

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.send("All products"));
router.get("/:id", (req, res) => res.send(`Product ${req.params.id}`));

module.exports = router;
