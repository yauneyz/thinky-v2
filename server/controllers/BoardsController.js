const user = require('../models/UserModel');

exports.getBoards = (async (req, res) => {
  // // Handle non-logged in

  if (req.session.user == null) {
    res.send('You must log in');
    return;
  }

  console.log(`User: ${req.session.user}`);
  const currentUser =
		await user.findOne({_id: req.session.user.userID}, 'boards active',
		    (err, results) => {
		      console.log(results);
		      return;
		    });


  const boards = currentUser.get('boards');
  const active = currentUser.get('active');
  res.json({boards, active});
});

exports.updateBoards = (async (req, res) => {
  // Handle non-logged in

  if (req.session.user == null) {
    res.send('You must log in');
    return;
  }

  const email = req.session.user.email;
  await user.updateOne({email: email}, {boards: req.body.boards});
  res.send('Boards updated');
});
