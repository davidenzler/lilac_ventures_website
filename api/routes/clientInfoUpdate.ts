const express = require("express");
const router = express.Router();
const ROLES_LIST = require("../config/roles_list.ts");
const verifyRoles = require("../middleware/verifyRoles.ts");

const updateCustomerController = require("../controllers/UpdateInfoController.ts");

//Get Clients Available
router.get("/", updateCustomerController.getClients);

//Add new Client
router.post(
  "/addClient",
  updateCustomerController.addClient
);

//Get Client Details
router.get(
  "/clientDetals/:id",
  updateCustomerController.getDetails
);

//Update Client Details
router.post(
  "/updateClient/:id",
  updateCustomerController.updateClient
);

//Delete a Client
router.get(
  "/deleteClient/:id",
  updateCustomerController.deleteClient
);

router.post('/searchClients', updateCustomerController.searchClients);
module.exports = router;
