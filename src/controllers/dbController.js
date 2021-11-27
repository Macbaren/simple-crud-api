const DB = require('../models/dbModels');

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
    const user = {
      title: 'Test',
      description: 'lskdflsj',
    };

    const newUser = DB.createNewUser(user);

    res.writeHead(201, { 'Content-type': 'application/json' });

    return res.end(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getDB, getUser, createUser };
