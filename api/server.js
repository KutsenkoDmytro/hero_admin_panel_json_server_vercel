/*
// See https://github.com/typicode/json-server#module
const jsonServer = require("json-server");

const server = jsonServer.create();

// Uncomment to allow write operations
// const fs = require('fs')
// const path = require('path')
// const filePath = path.join('db.json')
// const data = fs.readFileSync(filePath, "utf-8");
// const db = JSON.parse(data);
// const router = jsonServer.router(db)

// Comment out to allow write operations
const router = jsonServer.router("db.json");

const middlewares = jsonServer.defaults();

server.use(middlewares);

// Add this before server.use(router)
server.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
    "/blog/:resource/:id/show": "/:resource/:id",
  })
);
server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});

// Export the Server API
module.exports = server;
*/

// api/server.js
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json"); // твой JSON файл
const middlewares = jsonServer.defaults();

// стандартные middlewares
server.use(middlewares);

// CORS middleware
server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // preflight-запросы
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  next();
});

// подключаем json-server router
server.use(router);

// экспортируем для Vercel
module.exports = server;
