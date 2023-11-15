const User = require('../model/User.ts');

const checkFirstLogin = async (req, res) => {
  const { username } = req.body;

  try {
    const foundUser = await User.findOne(username);
    if(!foundUser) {
      return res.status(401);
    }
    const firstTimeLogin = foundUser.firstLogin;
    res.json({ firstTimeLogin });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  checkFirstLogin,
};
