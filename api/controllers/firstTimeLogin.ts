const User = require('../model/User.ts');

const checkFirstLogin = async (req, res) => {
  const { username } = req.body;

  try {
    const firstLogin = await User.getFirstLoginStatus(username);

    res.json({ firstLogin });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  checkFirstLogin,
};
