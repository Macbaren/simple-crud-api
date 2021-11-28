const DB = require('../models/dbModels');

const { getPostedData } = require('../utils');

// get all usersDB using api api/usersDB
async function getDB(req, res) {
  try {
    const usersDB = await DB.findAll();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(usersDB));
  } catch (error) {
    console.log(error);
  }
}

// get user using api api/usersDB/:id
async function getUser(req, res, id) {
  try {
    const user = await DB.findUserById(id);

    if (!user) {
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
// create a user POST method api /api/usersDB
async function createUser(req, res) {
  try {
    const body = await getPostedData(req);

    const { name, adress, phone } = JSON.parse(body);

    const user = {
      name,
      adress,
      phone,
    };

    const newUser = await DB.createNewUser(user);

    res.writeHead(201, { 'Content-type': 'application/json' });
    return res.end(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
}

// update the user POST method api /api/usersDB/:id
async function updateUser(req, res, id) {
  try {
    const user = await DB.findUserById(id);

    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));
    } else {
      const body = await getPostedData(req);

      const { name, adress, phone } = JSON.parse(body);

      const updatedUser = {
        name: name || user.name,
        adress: adress || user.adress,
        phone: phone || user.phone,
      };

      const updUser = await DB.updateUserById(id, updatedUser);

      res.writeHead(200, { 'Content-type': 'application/json' });
      return res.end(JSON.stringify(updUser));
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getDB, getUser, createUser, updateUser };
