const user = require("../models/UserModel");
const getUser = require("../utils/getUser");

exports.getBoards = async (req, res) => {
  const currentUser = await getUser(req);

  if (!currentUser) {
    res.json({ success: false, message: "User not found" });
    return;
  }

  const boards = currentUser.get("boards");
  const open = currentUser.get("open");
  const tabs = currentUser.get("tabs");
  const topNode = currentUser.get("topNode");

  res.json({
    userBoards: boards,
    userOpen: open,
    userTabs: tabs,
    userTopNode: topNode,
  });
};

exports.updateBoards = async (req, res) => {
  // Handle non-logged in

  if (req.user == null) {
    res.json({ success: false, message: "Request had no user attached" });
  }

  const { boards, open, tabs } = req.body;

  user.updateOne(
    { uid: req.user.uid },
    { boards: boards, open: open, tabs: tabs },
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
