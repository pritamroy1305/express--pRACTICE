// =====================================================
// STEP 2: ALL TYPES OF EXPRESS ROUTES
// Run:  npm run step2
// Test POST/PUT/PATCH/DELETE with Postman, Thunder Client
// or curl (examples are written above each route)
// =====================================================

const express = require("express");
const app = express();

// MIDDLEWARE: lets Express read JSON from request body
// (without this, req.body is undefined!)
app.use(express.json());

// -----------------------------------------------------
// TYPE 1: HTTP METHOD ROUTES  (the CRUD four)
// -----------------------------------------------------

// GET = READ data
// curl http://localhost:3000/users
app.get("/users", (req, res) => {
  res.send("GET: list all users");
});

// POST = CREATE data (data comes in req.body)
// curl -X POST -H "Content-Type: application/json" -d '{"name":"Roy"}' http://localhost:3000/users
app.post("/users", (req, res) => {
  res.status(201).json({ msg: "POST: user created", data: req.body });
});

// PUT = REPLACE whole item
// curl -X PUT -H "Content-Type: application/json" -d '{"name":"New"}' http://localhost:3000/users/1
app.put("/users/:id", (req, res) => {
  res.json({ msg: `PUT: replaced user ${req.params.id}`, data: req.body });
});

// PATCH = UPDATE only some fields
app.patch("/users/:id", (req, res) => {
  res.json({ msg: `PATCH: updated part of user ${req.params.id}`, data: req.body });
});

// DELETE = REMOVE data
// curl -X DELETE http://localhost:3000/users/1
app.delete("/users/:id", (req, res) => {
  res.json({ msg: `DELETE: removed user ${req.params.id}` });
});

// -----------------------------------------------------
// TYPE 2: ROUTE PARAMETERS  (/:name)  → req.params
// Use when value is PART OF THE URL
// -----------------------------------------------------

// Visit: /product/42
app.get("/product/:id", (req, res) => {
  res.send(`Product id = ${req.params.id}`);
});

// Multiple params. Visit: /shop/shoes/99
app.get("/shop/:category/:itemId", (req, res) => {
  const { category, itemId } = req.params; // destructuring
  res.send(`Category: ${category}, Item: ${itemId}`);
});

// Optional param (the ? makes it optional)
// Visit: /profile   or   /profile/roy
app.get("/profile/:name?", (req, res) => {
  res.send(`Profile of ${req.params.name || "guest"}`);
});

// -----------------------------------------------------
// TYPE 3: QUERY STRING  (?key=value)  → req.query
// Use for filters, search, pagination
// Visit: /search?q=laptop&page=2
// -----------------------------------------------------
app.get("/search", (req, res) => {
  const { q, page = 1 } = req.query; // page defaults to 1
  res.json({ searching: q, page });
});

// -----------------------------------------------------
// TYPE 4: REQUEST BODY  → req.body
// Use for sending big/private data (forms, JSON)
// Needs express.json() above
// -----------------------------------------------------
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  res.json({ msg: "Got login data", email });
});

// -----------------------------------------------------
// TYPE 5: app.all()  → matches EVERY method
// Good for logging or global checks on one path
// -----------------------------------------------------
app.all("/secret", (req, res) => {
  res.send(`You used ${req.method} on /secret`);
});

// -----------------------------------------------------
// TYPE 6: app.route()  → chain methods on SAME path
// Saves you from repeating the path
// -----------------------------------------------------
app
  .route("/books")
  .get((req, res) => res.send("GET all books"))
  .post((req, res) => res.send("POST new book"));

// -----------------------------------------------------
// TYPE 7: PATTERN / REGEX ROUTES
// -----------------------------------------------------

// Regex: matches any path ENDING with "fly"
// Visit: /butterfly  or  /dragonfly
app.get(/.*fly$/, (req, res) => {
  res.send("Path ends with fly 🦋");
});

// -----------------------------------------------------
// TYPE 8: MULTIPLE HANDLERS (run one after another)
// next() = "go to the next function"
// -----------------------------------------------------
app.get(
  "/chain",
  (req, res, next) => {
    console.log("First handler");
    next(); // pass control forward
  },
  (req, res) => {
    res.send("Second handler sent response");
  }
);

// -----------------------------------------------------
// TYPE 9: DIFFERENT RESPONSES  (what res can do)
// -----------------------------------------------------
app.get("/res-demo/:type", (req, res) => {
  switch (req.params.type) {
    case "text":     return res.send("plain text");
    case "json":     return res.json({ a: 1 });
    case "status":   return res.status(404).send("Not found!");
    case "redirect": return res.redirect("/users");
    default:         return res.sendStatus(400); // sends "Bad Request"
  }
});

// -----------------------------------------------------
// TYPE 10: 404 CATCH-ALL (ALWAYS LAST!)
// If no route above matched, this runs.
// Order matters: Express checks routes TOP → BOTTOM
// -----------------------------------------------------
app.use((req, res) => {
  res.status(404).send("404 - Route not found");
});

app.listen(3000, () => console.log("http://localhost:3000"));
