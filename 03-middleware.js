// =====================================================
// STEP 3: MIDDLEWARE
// Middleware = a function that runs BETWEEN
// request coming in and response going out.
//
//   Request → [middleware 1] → [middleware 2] → Route → Response
//
// Shape:  (req, res, next) => { ...; next(); }
// Run:  npm run step3
// =====================================================

const express = require("express");
const app = express();

// -----------------------------------------------------
// TYPE 1: BUILT-IN middleware (comes with Express)
// -----------------------------------------------------
app.use(express.json());                         // read JSON body
app.use(express.urlencoded({ extended: true })); // read HTML form body
// app.use(express.static("public"));            // serve files from "public" folder

// -----------------------------------------------------
// TYPE 2: APPLICATION-LEVEL middleware (runs for ALL routes)
// -----------------------------------------------------
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`); // simple logger
  req.startTime = Date.now();               // we can ADD our own data to req
  next();                                   // MUST call next() or request hangs!
});

// -----------------------------------------------------
// TYPE 3: PATH-SPECIFIC middleware (runs only for /admin...)
// -----------------------------------------------------
app.use("/admin", (req, res, next) => {
  console.log("Someone is entering admin area");
  next();
});

// -----------------------------------------------------
// TYPE 4: ROUTE-LEVEL middleware (attached to ONE route)
// Great for login checks
// -----------------------------------------------------
function checkAuth(req, res, next) {
  // Real apps check a token. Here: header "x-token: abc"
  if (req.headers["x-token"] === "abc") {
    next(); // allowed → continue
  } else {
    res.status(401).json({ error: "Not logged in" }); // blocked → stop here
  }
}

app.get("/", (req, res) => res.send("Public page"));

// checkAuth runs BEFORE the final handler
// curl -H "x-token: abc" http://localhost:3000/admin/dashboard
app.get("/admin/dashboard", checkAuth, (req, res) => {
  res.send("Welcome to dashboard 🔐");
});

// -----------------------------------------------------
// TYPE 5: ERROR-HANDLING middleware
// Has FOUR params (err, req, res, next). Put it LAST.
// -----------------------------------------------------
app.get("/crash", (req, res) => {
  throw new Error("Something broke!"); // simulate a bug
});

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: err.message });
});

app.listen(3000, () => console.log("http://localhost:3000"));
