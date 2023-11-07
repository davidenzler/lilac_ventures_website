const express = require('express');
const router = express.Router();
const stripeCustomerController = require('../controllers/stripeCustomerController.ts');
const stripeInvoiceController = require('../controllers/stripeInvoiceController.ts');

// Customer Apis
router.post('/createCustomer', stripeCustomerController.createCustomer);
router.post('/searchCustomers', stripeCustomerController.searchCustomers);
router.post('/searchCustomersSubstring', stripeCustomerController.searchCustomersSubstring);

// Invoice Apis
router.post('/createInvoice', stripeInvoiceController.createInvoice);
router.post('/finalizeInvoice', stripeInvoiceController.finalizeInvoice);
router.post('/createInvoiceItem', stripeInvoiceController.createInvoiceItem);
router.post('/searchProductsSubstring', stripeInvoiceController.searchProductSubstring);
router.post('/getInvoice', stripeInvoiceController.getInvoice);
module.exports = router;
