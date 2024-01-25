//import the connection set up
const mongodb = require('../db/connect');

//get the ObjectId class from the mongodb library
const ObjectId = require('mongodb').ObjectId;

/*
This function handles a request to get all documents from the 'contacts' collection.
It uses await to wait for the result of the MongoDB find() operation.
result.toArray() converts the result to an array of documents.
It sets the response headers to indicate JSON content and sends the JSON array as the response.
*/
const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db("cse341").collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

/*
This function handles a request to get a single document from the 'contacts' collection based on the provided id parameter.
It creates an ObjectId using the req.params.id (assuming the ID is passed as a URL parameter).
It performs a MongoDB find() operation with the specified _id.
It sets the response headers and sends the first document from the result array as the JSON response.
*/
const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db("cse341")
    .collection('contacts')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};


//This is my function to create a new contact

const newContact = async (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

//get a response from the database *note for me: 201 = ok and new resourse was created; 500=error
  const response = await mongodb
    .getDb()
    .db('cse341')
    .collection('contacts')
    .insertOne(contact);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'There was an error creating this contact.');
  }
};

  

  //Update a contact
const updateContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const contact = {
  firstName: req.body.firstName,
  lastName: req.body.lastName,
  email: req.body.email,
  favoriteColor: req.body.favoriteColor,
  birthday: req.body.birthday
  };

  const response = await mongodb
    .getDb()
    .db('cse341')
    .collection('contacts')
    .replaceOne({ _id: userId }, contact);  //***I can't decide if I should use updateONe() or replaceOne()
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occurred updating this document.');
  }
  
};




// Delete contact 

const deleteContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb()
    .db('cse341')
    .collection('contacts')
    .deleteOne({ _id: userId });
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occurred deleting this contact.');
  }
};


//export the functions
module.exports = { getAll, getSingle, newContact, updateContact, deleteContact};  