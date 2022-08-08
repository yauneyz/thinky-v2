const Auth = require("../utils/auth");

const parseAuthToken = async (req, res, next) => {
  if (typeof req.headers.authorization === "undefined") {
    res.user = { success: false, message: "No Auth Header" };
    return next();
  }
  const auth = Auth.getInstance();
  const token = req.headers.authorization.split(" ")[1];

  try {
    const user = await auth.verifyIdToken(token);
    if (user) {
      req.user = user;
    } else {
      req.user = { success: false, message: "Unauthorize" };
    }
  } catch (e) {
    req.user = { success: false, message: "Internal Error", error: e };
  }
  return next();
};

module.exports = parseAuthToken;
