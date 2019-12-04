// implement your API here

const express = require("express");

const db = require("./data/db.js");

const port = 5000;
const host = "127.0.0.1";
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "You made it!" });
});

// get all users

app.get("/api/users", (req, res) => {
  db.find()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(() => {
      res.status(500).json({ error: "Info not available" });
    });
});

// post new user

app.post("/api/users", (req, res) => {
  //! Need to add if error when saving to this still.
  if (!req.body.name || !req.body.bio) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }
  const newUser = {
    name: req.body.name,
    bio: req.body.bio
  };

  db.insert(newUser);
  res.status(201).json("New user Created");
});

// delete user

app.delete("api/users/:id", (req, res) => {
  const user = req.params.id;
  db.remove()
    .then(user => {
      if (!user) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        res.status(200).json("User Deleted");
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "The user could not be removed" });
    });
});

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});
