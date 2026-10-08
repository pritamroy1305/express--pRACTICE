// =====================================================
// STEP 4: ROUTER → SPLIT ROUTES INTO FILES
// Why? When app grows, one file becomes messy.
// Rule: 1 feature = 1 route file.
// Run:  npm run step4
// Test: /users   /users/5   /products   /products/9
// =====================================================

const express = require("express");
const app = express();

app.use(express.json());

// Import the route files we made
const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");

// MOUNT them: app.use(PREFIX, router)
// "/users" prefix + "/" inside file = "/users"
app.use("/users", userRoutes);
app.use("/products", productRoutes);

// Versioning trick (common in real projects):
// app.use("/api/v1/users", userRoutes);

app.listen(3000, () => console.log("http://localhost:3000"));
