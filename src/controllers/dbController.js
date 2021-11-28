const DB = require('../models/dbModels');

const { getPostedData } = require('../utils');

// FUnction with Regular expression to check if string is a valid UUID
const uuidRegexp = (id) => {
  return /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi.test(
    id
  );
};

// get all person using api api/person
async function getDB(req, res) {
  try {
    const person = await DB.findAll();

    if (person) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(person));
    } else {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Server error' }));
    }
  } catch (error) {
    console.log(error);
  }
}

// get user using api api/person/:id
async function getUser(req, res, id) {
  try {
    const user = await DB.findUserById(id);
    if (!uuidRegexp(id)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Person ID is not valid' }));
    } else if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    }
  } catch (error) {
    console.log(error);
  }
}
// create a user POST method api /api/person
async function createUser(req, res) {
  try {
    const body = await getPostedData(req);

    const { name, age, hobbies } = JSON.parse(body);

    const user = {
      name,
      age,
      hobbies,
    };

    const newUser = await DB.createNewUser(user);

    res.writeHead(201, { 'Content-type': 'application/json' });
    return res.end(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
}

// update the user POST method api /api/person/:id
async function updateUser(req, res, id) {
  try {
    const user = await DB.findUserById(id);

    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));
    } else {
      const body = await getPostedData(req);

      const { name, age, hobbies } = JSON.parse(body);

      const updatedUser = {
        name: name || user.name,
        age: age || user.age,
        hobbies: hobbies || user.hobbies,
      };

      const updUser = await DB.updateUserById(id, updatedUser);

      res.writeHead(200, { 'Content-type': 'application/json' });
      return res.end(JSON.stringify(updUser));
    }
  } catch (error) {
    console.log(error);
  }
}

// delete user using api api/person/:id
async function deleteUser(req, res, id) {
  try {
    const user = await DB.findUserById(id);
    if (!uuidRegexp(id)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Person ID is not valid' }));
    } else if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));
    } else {
      await DB.deleteUserById(id);
      res.writeHead(204, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: `User with id: ${id} deleted` }));
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getDB, getUser, createUser, updateUser, deleteUser };
