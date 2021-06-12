const authUtils = require('../utils/auth');
exports.login = ((req, res, user) => {
  req.session.user = authUtils.sessionizeUser(user);
  console.log(`User Logged In: ${user}`);
});
