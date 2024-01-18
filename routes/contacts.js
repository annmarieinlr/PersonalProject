const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');

//get all contacts documents
router.get('/', contactsController.getAll);

//get single contact document by id
router.get('/:id', contactsController.getSingle);

//export the router
module.exports = router;