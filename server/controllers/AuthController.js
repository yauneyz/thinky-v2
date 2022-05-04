const User = require("../models/UserModel");
const authService = require("../services/AuthService");

exports.register = async (req, res) => {
  const { email, uid } = req.body;

  // Create the new user in the database, saving their Firebase ID too
  const emptyBoard = {
    name: "Home",
    text: "",
    children: [],
  };
  const newUser = new User({
    uid: uid,
    email: email,
    boards: emptyBoard,
    open: [],
    trail: [],
  });
  try {
    await newUser.save();
  } catch (error) {
    console.log("Failed to save mongo user:", newUser);
  }
  res.json(newUser);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const newUser = { email: email, password: password };

  // Create the user in Firebase

  // Create the new user in the database, saving their Firebase ID too
  console.log(JSON.stringify(req.headers));
  console.log(req.body);
  res.send("Test");
  //const email = req.body.email;

  //const user = await UserModel.findOne({email: email}, 'email',
  //(_err, _results) => {
  //return;
  //});

  //if (user) {
  //auth.login(req, res, user);
  //console.log(`Logged in ${user}`);
  //res.send('Successfully logged in');
  //} else {
  //console.log('Login Failed for User');
  //res.send('No user found');
  //}
};

exports.logout = (req, res) => {
  req.session.user = null;
  res.send("Successfully logged out");
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
