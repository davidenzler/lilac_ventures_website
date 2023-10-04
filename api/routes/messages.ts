const express = require("express");
const router = express.Router();
const ROLES_LIST = require("../config/roles_list");
const verifyRoles = require("../middleware/verifyRoles");

const messagesController = require("../controllers/messagesController.ts");

// get all messages from a given folder
router.get(
  verifyRoles(ROLES_LIST.admin, ROLES_LIST.user),
  "/:clientEmail/:folder",
  messagesController.getMessages
);

// send message
router.post(
  verifyRoles(ROLES_LIST.admin, ROLES_LIST.user),
  "/",
  messagesController.sendMessage
);

// archive message
router.post(
  verifyRoles(ROLES_LIST.admin, ROLES_LIST.user),
  "/archive/:messageId",
  messagesController.archiveMessage
);

// delete message
router.post(
  verifyRoles(ROLES_LIST.admin, ROLES_LIST.user),
  "/delete/:messageId",
  messagesController.deleteMessage
);

module.exports = router;
