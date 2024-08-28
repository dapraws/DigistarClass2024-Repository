const http = require("http");

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.headers));
});

server.listen(3000, () => {
  console.log("Server running at http://127.0.0.1:3000/");
});
