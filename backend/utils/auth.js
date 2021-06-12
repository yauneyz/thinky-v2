module.exports.sessionizeUser = (user) => {
  return {
    userID: user.id,
    email: user.email,
  };
};
