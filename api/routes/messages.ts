const express = require("express");
const router = express.Router();
const ROLES_LIST = require("../config/roles_list.ts");
const verifyRoles = require("../middleware/verifyRoles.ts");

const messagesController = require("../controllers/messagesController.ts");

// get all messages from a given folder
router.get(
  "/:clientEmail/:folder",
  messagesController.getMessages
);

// send message
router.post(
  "/",
  messagesController.sendMessage
);

// flag message as archived or deleted
router.put(
  "/",
  messagesController.flagMessage
)

module.exports = router;
