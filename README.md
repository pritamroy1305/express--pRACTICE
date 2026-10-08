# Express Learning Path

## Setup (once)
```
npm install
```

## Study order (1 step = 1 file)
| Step | File | You learn |
|------|------|-----------|
| 1 | 01-hello.js | server, route, req/res |
| 2 | 02-route-types.js | GET/POST/PUT/PATCH/DELETE, params, query, body, all, route, regex, chain, 404 |
| 3 | 03-middleware.js | built-in, global, route-level, error middleware |
| 4 | 04-router-modular.js + routes/ | split routes into files |
| 5 | 05-crud-app.js | full CRUD mini-project |

Run one at a time: `npm run step1` ... `npm run step5` (stop with Ctrl+C)

## How to study each file
1. Read comments top → bottom
2. Run it
3. Test every route (browser for GET, Postman/curl for others)
4. Change something, break it, fix it
5. Rewrite the file from memory without looking

## Cheat sheet
| Need | Use |
|------|-----|
| Value inside URL `/users/5` | `req.params.id` |
| Value after ? `/search?q=a` | `req.query.q` |
| Data sent in POST/PUT body | `req.body` |
| Headers | `req.headers` |
| Send text / JSON | `res.send()` / `res.json()` |
| Set status | `res.status(201)` |

## Common status codes
200 OK · 201 Created · 204 No Content · 400 Bad Request · 401 Unauthorized · 404 Not Found · 500 Server Error

## Next (after these 5)
env vars (dotenv) → PostgreSQL (pg/Prisma) → JWT auth → validation (zod) → folder structure (controllers/services)
