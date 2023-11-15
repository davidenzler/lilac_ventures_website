const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rolesEnum = ["user", "admin"];

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
  refreshToken: {
    type: [String]
  },
  firstTimeLogin: {
    type: Boolean
  },
});

module.exports = mongoose.model('User', userSchema);

