const user = require("../models/UserModel");

async function getUser(req) {
  if (!req.user) {
    return false;
  }

  const currentUser = await user.findOne({ uid: req.user.uid });
  // if currentUser is null
  if (!currentUser) {
    return false;
  }

  return currentUser;
}

module.exports = getUser;
