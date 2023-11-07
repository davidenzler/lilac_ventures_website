const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rolesEnum = ["user", "admin"];

const getFirstLoginStatus = async (username) => {
  try {
    const user = await UserModel.findOne({ username });
    
    if (!user) {
      return false;
    }

    return user.firstTimeLogin;
  } catch (error) {
    throw error;
  }
};

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: String,
    enum: rolesEnum,
  },
  refreshToken: [String],
  firstTimeLogin: Boolean,
});

const UserModel = mongoose.model('User', userSchema);

module.exports = {
  getFirstLoginStatus,
  UserModel,
};
