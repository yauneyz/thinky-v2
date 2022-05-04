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
