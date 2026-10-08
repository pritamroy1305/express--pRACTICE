// =====================================================
// STEP 1: YOUR FIRST EXPRESS SERVER
// Run:  npm run step1   → open http://localhost:3000
// =====================================================

// 1. Import express (like importing a toolbox)
const express = require("express");

// 2. Create the app (this IS your server)
const app = express();

// 3. Choose a port number where server will listen
const PORT = 3000;

// 4. Make a ROUTE
//    Pattern:  app.METHOD(PATH, HANDLER)
//    METHOD  = get / post / put / delete ...
//    PATH    = the URL ("/" = home page)
//    HANDLER = function that runs when someone visits
//    req = REQUEST  (what client sends to us)
//    res = RESPONSE (what we send back)
app.get("/", (req, res) => {
  res.send("Hello Express! 🎉"); // send plain text
});

// 5. Send JSON (most APIs use this)
app.get("/api", (req, res) => {
  res.json({ message: "This is JSON", ok: true });
});

// 6. Start the server (always last)
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// TRY IT: visit  /   and   /api   in browser
