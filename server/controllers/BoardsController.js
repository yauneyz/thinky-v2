const user = require("../models/UserModel");

exports.getBoards = async (req, res) => {
  // // Handle non-logged in

  if (!req.user) {
    res.json({ success: false, message: "Request had no user attached" });
    return;
  }

  const currentUser = await user.findOne({ uid: req.user.uid });
  // if currentUser is null
  if (!currentUser) {
    res.json({ success: false, message: "User not found" });
    return;
  }

  const boards = currentUser.get("boards");
  const open = currentUser.get("open");
  const trail = currentUser.get("trail");
  const tabs = currentUser.get("tabs");

  res.json({
    userBoards: boards,
    userOpen: open,
    userTrail: trail,
    userTabs: tabs,
  });
};

exports.updateBoards = async (req, res) => {
  // Handle non-logged in

  if (req.user == null) {
    res.json({ success: false, message: "Request had no user attached" });
  }

  const { boards, open, tabs, trail } = req.body;

  user.updateOne(
    { uid: req.user.uid },
    { boards: boards, open: open, trail: trail, tabs: tabs },
    {},
    (error, result) => {
      if (error) {
        res.json({
          success: false,
          message: "Update user boards failed",
          error: error,
        });
      }
      res.json({ success: true, message: "Boards updated", result: result });
    }
  );
};
