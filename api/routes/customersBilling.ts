const express = require('express');
const router = express.Router();
const stripeCustomerController = require('../controllers/stripeCustomerController.ts');
const stripeInvoiceController = require('../controllers/stripeInvoiceController.ts');
const verifyJWT = require('../middleware/verifyJWT.ts');
const verifyRoles = require('../middleware/verifyRoles.ts')

// Customer Apis
router.post('/createCustomer', verifyJWT, stripeCustomerController.createCustomer);
router.post('/searchCustomers', verifyJWT, stripeCustomerController.searchCustomers);
router.post('/searchCustomersSubstring', verifyJWT, stripeCustomerController.searchCustomersSubstring);

// Invoice Apis
router.post('/createInvoice', verifyJWT, stripeInvoiceController.createInvoice);
router.post('/finalizeInvoice', verifyJWT, stripeInvoiceController.finalizeInvoice);
router.post('/createInvoiceItem', verifyJWT, stripeInvoiceController.createInvoiceItem);
router.post('/searchProductsSubstring', verifyJWT, stripeInvoiceController.searchProductSubstring);
router.post('/getInvoice', verifyJWT, stripeInvoiceController.getInvoice);
router.post('/getInvoiceCustomer', verifyJWT, stripeInvoiceController.getInvoiceCustomer);
router.post('/deleteDraftInvoice', verifyJWT, stripeInvoiceController.deleteDraftInvoice);
module.exports = router;
