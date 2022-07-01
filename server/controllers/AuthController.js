const User = require("../models/UserModel");

exports.register = (req, res) => {
  const { email, uid } = req.body;
  User.findOne({ email }, (err, foundUser) => {
    if (err) {
      res.status(500).send(err);
    } else if (foundUser) {
      res.status(400).send("User already exists");
    } else {
      const newBoard = {
        name: "Main",
        text: "",
        expanded: true,
        children: [],
      };
      console.log("UID", uid);
      const newUser = {
        email,
        uid,
        boards: newBoard,
        open: 0,
        trail: [],
        tabs: [],
      };

      const insertedUser = new User(newUser);
      insertedUser.save((err, savedUser) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(savedUser);
        }
      });
    }
  });
};

exports.user = (req, res) => {
  let data = null;
  if (req.session.user != null) {
    data = {
      user: req.session.user,
      success: true,
    };
  } else {
    data = {
      user: null,
      success: false,
    };
  }
  res.json(data);
};
