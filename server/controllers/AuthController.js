const auth = require('../services/AuthService');
const UserModel = require('../models/UserModel');

exports.register = (async (req, res) => {
  // If the user is already registered
  const email = req.body.email;

  const user = await UserModel.find({email: email}, 'email',
      (_err, _results) => {
        return;
      });

  if (user.length > 0) {
    res.send('User already registered');
    return;
  }

  newUser = new UserModel(
      {
        email: req.body.email,
        boards: [{
          'ideas': [],
          'name': 'First Board',
          'columns': [],
        }],
        active: 0,
      });

  await newUser.save(()=>console.log('User Registered'));

  // Login the new user
  auth.login(req, res, newUser);

  res.send(`Successfully Registered with email ${req.body.email}`);
});

exports.login = (async (req, res) => {
  const email = req.body.email;

  const user = await UserModel.findOne({email: email}, 'email',
      (_err, _results) => {
        return;
      });

  if (user) {
    auth.login(req, res, user);
    console.log(`Logged in ${user}`);
    res.send('Successfully logged in');
  } else {
    console.log('Login Failed for User');
    res.send('No user found');
  }
});

exports.logout = ((req, res) => {
  req.session.user = null;
  res.send('Successfully logged out');
});

exports.user = ((req, res) => {
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
});
