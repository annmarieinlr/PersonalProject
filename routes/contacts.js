const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');

//get all contacts documents
router.get('/', contactsController.getAll);

//get single contact document by id
router.get('/:id', contactsController.getSingle);

//Create a POST route to create a new contact.
router.post('/', contactsController.newContact);

//Create a PUT route to update a contact
router.put('/:id', contactsController.updateContact);

//Create a DELETE route to delete a contact
router.delete('/:id', contactsController.deleteContact);

//export the router
module.exports = router;