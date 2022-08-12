const User = require("../models/UserModel");
const InitialBoards = require("../utils/InitialBoards");

exports.register = (req, res) => {
  const { email, uid } = req.body;
  User.findOne({ email }, (err, foundUser) => {
    if (err) {
      res.status(500).send(err);
    } else if (foundUser) {
      res.status(400).send("User already exists");
    } else {
      const firstBoard = InitialBoards.firstBoard();
      const secondBoard = InitialBoards.secondBoard();
      const newUser = {
        email,
        uid,
        boards: [firstBoard, secondBoard],
        open: 0,
        trail: [],
        tabs: [],
        topNode: "ROOT",
      };

      const insertedUser = new User(newUser);
      insertedUser.save((err, savedUser) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(savedUser);
        }
      });
      console.log("newUser", newUser);
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
