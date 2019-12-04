// implement your API here

const express = require("express");

const db = require("./data/db");

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.json({ message: "You made it!" });
});

const port = 8080;
const host = "127.0.0.1";

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});
