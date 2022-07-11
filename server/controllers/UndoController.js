const getUser = require("../utils/getUser");

// Function for generating random ids of 16 hex characters
const guid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

exports.deleteTab = async function (req, res) {
  const currentUser = await getUser(req);
  if (!currentUser) {
    res.json({ success: false, message: "User not found" });
    return;
  }

  const { boards, name, index } = req.body;
  const tabId = guid();
  const deletedTab = { boards, name, index, id: tabId };
  try {
    const result = await currentUser.updateOne({
      $push: { deletedTabs: deletedTab },
    });
    res.json({
      success: true,
      message: "Tab deleted",
      result: result,
    });
  } catch (e) {
    res.json({
      success: false,
      message: "Update user deleted tabs failed",
      error: e,
    });
  }
};

exports.undoDeleteTab = async function (req, res) {
  const currentUser = await getUser(req);
  if (!currentUser) {
    res.json({ success: false, message: "User not found" });
    return;
  }
  const { tabId } = req.body;

  // Find the target tab on the user's tabUndos
  const deletedTabs = currentUser.deletedTabs;
  // Filter deletedTabs array by id
  const targetTab = deletedTabs.filter((tab) => tab.id === tabId);

  // Delete the given tab from currentUser's list of tabundos and return the deleted tabConten
  try {
    const result = await currentUser.updateOne({
      $pull: { deletedTabs: { id: tabId } },
    });
    res.json({
      success: true,
      message: "Tab deleted",
      result: result,
      tab: targetTab[0],
    });
  } catch (e) {
    res.json({
      success: false,
      message: "Update user deleted tabs failed",
      error: e,
    });
  }
};

exports.getDeletedTabs = async function (req, res) {
  const currentUser = await getUser(req);

  if (!currentUser) {
    res.json({ success: false, message: "User not found" });
    return;
  }

  res.json(currentUser.deletedTabs);
};

exports.deleteAxis = async function (req, res) {
  const currentUser = await getUser(req);
  if (!currentUser) {
    res.json({ success: false, message: "User not found" });
    return;
  }

  const { board, coord, parentId } = req.body;
  const axisId = guid();
  const deletedAxis = { board, coord, parentId, id: axisId };
  try {
    const result = await currentUser.updateOne({
      $push: { deletedAxes: deletedAxis },
    });
    res.json({
      success: true,
      message: "Axis deleted",
      result: result,
    });
  } catch (e) {
    res.json({
      success: false,
      message: "Delete axis failed",
      error: e,
    });
  }
};

exports.undoDeleteAxis = async function (req, res) {
  const currentUser = await getUser(req);
  if (!currentUser) {
    res.json({ success: false, message: "User not found" });
    return;
  }
  const { boardId } = req.body;

  // Find the target axis on the user's axisUndos
  const deletedAxes = currentUser.deletedAxes;
  // Filter deletedAxes array by id
  const targetAxis = deletedAxes.filter((axis) => axis.id === boardId);

  // Delete the given axis from currentUser's list of axisundos and return the deleted axisConten
  try {
    const result = await currentUser.updateOne({
      $pull: { deletedAxes: { id: boardId } },
    });
    res.json({
      success: true,
      message: "Axis deleted",
      result: result,
      axis: targetAxis[0],
    });
  } catch (e) {
    res.json({
      success: false,
      message: "Undo delete axis failed",
      error: e,
    });
  }
};

exports.getDeletedAxes = async function (req, res) {
  const currentUser = await getUser(req);

  if (!currentUser) {
    res.json({ success: false, message: "User not found" });
    return;
  }

  res.json(currentUser.deletedAxes);
};
