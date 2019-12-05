// implement your API here

const express = require("express");

const user = require("./data/db.js");

const port = 5000;
const host = "127.0.0.1";
const app = express();
app.use(express.json());

// Checking the Server URL

app.get("/", (req, res) => {
  res.send({ message: "You made it!" });
});

// Get All Users

app.get("/api/users", (req, res) => {
  user
    .find()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(() => {
      res.status(500).json({ error: "Info not available" });
    });
});

// Get user by id

app.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  user
    .findById(id)
    .then(userId => {
      if (!userId) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        return res.status(200).send(userId);
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ errorMessage: "The user information could not be retrieved" });
    });
});

// POST NEW USER

app.post("/api/users", (req, res) => {
  const newUser = {
    name: req.body.name,
    bio: req.body.bio
  };

  if (!req.body.name || !req.body.bio) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }

  user
    .insert(newUser)
    .then(user => {
      if (req.body.name && req.body.bio) {
        return res.status(201).json("New user Created");
      }
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "There was an error while saving the user to the database"
      });
    });
});

// app.post("/api/users", (req, res) => {
//   const newUser = {
//     name: req.body.name,
//     bio: req.body.bio
//   };

//   user
//     .insert(newUser)
//     .then(user => {
//       if (req.body.name && req.body.bio) {
//         return res.status(201).json("New user Created");
//       }
//     })
//     .then(user => {
//       if (!req.body.name || !req.body.bio) {
//         return res
//           .status(400)
//           .json({ errorMessage: "Please provide name and bio for the user." });
//       }
//     })

//     .catch(error => {
//       res.status(500).json({
//         errorMessage: "There was an error while saving the user to the database"
//       });
//     });
// });
// app.post("/api/users", (req, res) => {
//   const newUser = {
//     name: req.body.name,
//     bio: req.body.bio
//   };

//   user
//     .insert(newUser)
//     .then(user => {
//       if (!req.body.name || !req.body.bio) {
//         return res
//           .status(400)
//           .json({ errorMessage: "Please provide name and bio for the user." });
//       } else {
//         res.status(201).json("New user Created");
//       }
//     })
//     .catch(error => {
//       res.status(500).json({
//         errorMessage: "There was an error while saving the user to the database"
//       });
//     });
// });

// DELETE USER

app.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  user.findById(id).then(userId => {
    if (!userId) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    }
  });
  user
    .remove(id)
    .then(userId => {
      if (userId) {
        res.status(200).send(`${userId}, records deleted`);
      }
    })
    .catch(error => {
      res.status(500).json({ errorMessage: "The user could not be removed" });
    });
});

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});
