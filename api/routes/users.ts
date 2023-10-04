const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController.ts");
const ROLES_LIST = require("../config/roles_list");
const verifyRoles = require("../middleware/verifyRoles");

router.post(verifyRoles(ROLES_LIST.admin), "/", userController.createNewUser);

module.exports = router;
