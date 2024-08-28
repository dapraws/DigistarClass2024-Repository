const http = require("http");

// Database sederhana
let database = [{ username: "admin", password: "123" }];

const server = http.createServer((req, res) => {
  if (req.url === "/user") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      res.setHeader("Content-Type", "application/json");
      switch (req.method) {
        // Melihat data
        case "GET":
          res.statusCode = 200;
          res.end(JSON.stringify({ users: database }));
          break;

        // Menambah data
        case "POST":
          const newUser = JSON.parse(body);
          const checkUser = database.find(
            (user) => user.username === newUser.username
          );
          if (checkUser) {
            res.statusCode = 400;
            res.end(JSON.stringify({ message: "User sudah ada!" }));
          } else {
            database.push(newUser);
            res.statusCode = 201;
            res.end(
              JSON.stringify({ message: "User ditambahkan!", user: newUser })
            );
          }
          break;

        // Mengedit data
        case "PUT":
          const updatedUser = JSON.parse(body);
          const UserToUpdate = database.find(
            (user) => user.username === updatedUser.username
          );
          if (!UserToUpdate) {
            res.statusCode = 404;
            res.end(JSON.stringify({ message: "User tidak ditemukan!" }));
          } else if (UserToUpdate.username === "admin") {
            res.statusCode = 403;
            res.end(
              JSON.stringify({ message: "Admin tidak bisa diperbarui!" })
            );
          } else {
            UserToUpdate.password = updatedUser.password;
            res.statusCode = 200;
            res.end(
              JSON.stringify({
                message: "User diperbarui!",
                user: UserToUpdate,
              })
            );
          }
          break;

        // Menghapus data
        case "DELETE":
          const { username } = JSON.parse(body);
          const userToDelete = database.find(
            (user) => user.username === username
          );
          if (!userToDelete) {
            res.statusCode = 404;
            res.end(JSON.stringify({ message: "User tidak ditemukan!" }));
          } else if (userToDelete.username === "admin") {
            res.statusCode = 403;
            res.end(JSON.stringify({ message: "Admin tidak bisa dihapus!" }));
          } else {
            database = database.filter((user) => user.username !== username);
            res.statusCode = 200;
            res.end(
              JSON.stringify({ message: "User dihapus!", user: userToDelete })
            );
          }
          break;

        default:
          res.statusCode = 405;
          res.end(
            JSON.stringify({
              message: "Gunakan metode GET, POST, PUT, DELETE saja.",
            })
          );
      }
    });
  }
});

server.listen(3000, () => {
  console.log("Server running at http://127.0.0.1:3000/");
});
