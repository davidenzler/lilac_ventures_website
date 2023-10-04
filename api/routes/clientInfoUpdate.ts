const express = require("express");
const router = express.Router();
const ROLES_LIST = require("../config/roles_list");
const verifyRoles = require("../middleware/verifyRoles");

const updateCustomerController = require("../controllers/UpdateInfoController.ts");

//Get Clients Available
router.get("/", updateCustomerController.getClients);

//Add new Client
router.post(
  verifyRoles(ROLES_LIST.admin),
  "/addClient",
  updateCustomerController.addClient
);

//Get Client Details
router.get(
  verifyRoles(ROLES_LIST.admin),
  "/clientDetals/:id",
  updateCustomerController.getDetails
);

//Update Client Details
router.post(
  verifyRoles(ROLES_LIST.admin),
  "/updateClient/:id",
  updateCustomerController.updateClient
);

//Delete a Client
router.get(
  verifyRoles(ROLES_LIST.admin),
  "/deleteClient/:id",
  updateCustomerController.deleteClient
);

module.exports = router;
