const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerController.ts");
const ROLES_LIST = require("../config/roles_list");
const verifyRoles = require("../middleware/verifyRoles");

router.post(
  verifyRoles(ROLES_LIST.admin),
  "/",
  registerController.handleNewUser
);

module.exports = router;
