const express = require("express");
const router = express.Router();
const ROLES_LIST = require("../config/roles_list");
const verifyRoles = require("../middleware/verifyRoles");
const aboutInfoController = require("../controllers/aboutInfoController.ts");

// get About page details
router.get("/", aboutInfoController.getAboutPageDetails);

// Update About page details
router.post(
  verifyRoles(ROLES_LIST.admin),
  "/updateAboutPage/:id",
  aboutInfoController.updateAboutPage
);

// Delete About page details
router.get(
  verifyRoles(ROLES_LIST.admin),
  "/deleteAboutPageDetails/:id",
  aboutInfoController.deleteAboutPageDetails
);

module.exports = router;
