const express = require("express");
const router = express.Router();
const ROLES_LIST = require("../config/roles_list.ts");
const verifyRoles = require("../middleware/verifyRoles.ts");

const adminController = require("../controllers/adminController.ts");

//Get Admin info
router.get("/", adminController.getAdmins);

// Get admin details associated with email
router.get(
    "/:adminEmail",
    adminController.getAdminDetailsFromEmail
);

//Add new Admin
router.post(
    "/addAdmin",
    adminController.addAdmin
);

//Delete Admin
router.delete(
    "/deleteAdmin/:id",
    adminController.deleteAdmin
);

module.exports = router;