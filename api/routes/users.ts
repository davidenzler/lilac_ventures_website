const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController.ts");
const ROLES_LIST = require("../config/roles_list.ts");
const verifyRoles = require("../middleware/verifyRoles.ts");

router.post("/", userController.createNewUser);

module.exports = router;
