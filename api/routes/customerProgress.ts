const express = require('express');
const router = express.Router();
const customerProgressController = require('../controllers/customerProgressController.ts');
// const ROLES_LIST = require('../config/roles_list')
// const verifyRoles = require('../middleware/verifyRoles.js')


// router.route('/')
//  .post(verifyRoles(ROLES_LIST.<appropriate_role>),
//  customerProgressController.<some_function);
//  .get(verifyRoles(ROLES_LIST.<appropriate_role>),
//  customerProgressController.<some_other_function)

//Test using a GET request to http://localhost:8080/customerProgress
//Returns all user data for testing purposes
router.route('/')
    .get(customerProgressController.getAllUserData);     


    
//Test using a GET request to http://localhost:8080/customerProgress/<#ID>
// Where <#ID> is the id of a user
//Returns the progress value of that user
// ----------------------------------
//Test using a PUT request to http://localhost:8080/customerProgress/<#ID>
// Where <#ID> is the id of a user
// The body should be a JSON of the format: {"progress": <#Progress_Value>}. Example: {"progress": 5}   
// Returns all the data for that user, with the updated value of progress
router.route('/:id')
    .get(customerProgressController.getProgress)
    .put(customerProgressController.updateProgress);

    router.route('/getCustomersAtStep')
    .post(customerProgressController.getCustomersAtStep)

module.exports = router;