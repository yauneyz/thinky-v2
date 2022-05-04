const Auth = require("../utils/auth");

const parseAuthToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    res.json({ success: false, message: "No Authorization Header" });
  }
  const auth = Auth.getInstance();
  const token = req.headers.authorization.split(" ")[1];

  try {
    const user = await auth.verifyIdToken(token);
    if (user) {
      req.user = user;
      return next();
    }
    return res.json({ success: false, message: "Unauthorize" });
  } catch (e) {
    return res.json({ success: false, message: "Internal Error", error: e });
  }
};

module.exports = parseAuthToken;
