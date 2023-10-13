const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerController.ts");
const ROLES_LIST = require("../config/roles_list.ts");
const verifyRoles = require("../middleware/verifyRoles.ts");

router.post(
  "/",
  registerController.handleNewUser
);

module.exports = router;
