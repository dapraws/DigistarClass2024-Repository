const http = require("http");

let database = [{ username: "admin", password: "123" }];

const server = http.createServer((req, res) => {
  // Challenge CRUD

  // Mengambil
  if (req.url === "/user") {
  }

  // Menambah
  if (req.url === "/user") {
  }

  // Mengubah
  if (req.url === "/user") {
  }

  // Menghapus
  if (req.url === "/user") {
  }
});

server.listen(3000, () => {
  console.log("Server running at http://127.0.0.1:3000/");
});
