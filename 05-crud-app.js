// =====================================================
// STEP 5: FULL MINI PROJECT → CRUD API (Todos)
// CRUD = Create, Read, Update, Delete
// Uses an ARRAY as fake database (resets on restart).
// Later: replace array with PostgreSQL.
// Run:  npm run step5
// =====================================================

const express = require("express");
const app = express();
app.use(express.json());

// ---------- Fake database ----------
let todos = [
  { id: 1, title: "Learn Express", done: false },
  { id: 2, title: "Build API", done: false },
];
let nextId = 3; // used to give new todos unique ids

// ---------- READ all (supports ?done=true filter) ----------
// GET /todos        GET /todos?done=true
app.get("/todos", (req, res) => {
  const { done } = req.query;
  if (done !== undefined) {
    // query values are strings, so compare with "true"
    return res.json(todos.filter((t) => String(t.done) === done));
  }
  res.json(todos);
});

// ---------- READ one ----------
// GET /todos/1
app.get("/todos/:id", (req, res) => {
  const id = Number(req.params.id); // params are strings → convert
  const todo = todos.find((t) => t.id === id);

  if (!todo) return res.status(404).json({ error: "Todo not found" });
  res.json(todo);
});

// ---------- CREATE ----------
// POST /todos   body: { "title": "Wash car" }
app.post("/todos", (req, res) => {
  const { title } = req.body;

  // VALIDATION: never trust user input
  if (!title) return res.status(400).json({ error: "title is required" });

  const newTodo = { id: nextId++, title, done: false };
  todos.push(newTodo);
  res.status(201).json(newTodo); // 201 = Created
});

// ---------- UPDATE ----------
// PATCH /todos/1   body: { "done": true }
app.patch("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find((t) => t.id === id);

  if (!todo) return res.status(404).json({ error: "Todo not found" });

  // update only fields that were sent
  if (req.body.title !== undefined) todo.title = req.body.title;
  if (req.body.done !== undefined) todo.done = req.body.done;

  res.json(todo);
});

// ---------- DELETE ----------
// DELETE /todos/1
app.delete("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const exists = todos.some((t) => t.id === id);

  if (!exists) return res.status(404).json({ error: "Todo not found" });

  todos = todos.filter((t) => t.id !== id); // keep everything except this one
  res.status(204).send(); // 204 = success, nothing to return
});

// ---------- 404 + ERROR handlers (last) ----------
app.use((req, res) => res.status(404).json({ error: "Route not found" }));
app.use((err, req, res, next) => res.status(500).json({ error: err.message }));

app.listen(3000, () => console.log("http://localhost:3000/todos"));
