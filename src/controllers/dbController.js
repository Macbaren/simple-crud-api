const DB = require('../models/dbModels');

// get all db using api api/db
async function getDB(req, res) {
  try {
    const db = await DB.findAll();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(db));
  } catch (error) {
    console.log(error);
  }
}

// get user using api api/db/:id
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
// create a user POST method api /api/db
async function createUser(req, res) {
  try {
    const user = {
      title: 'Test',
      description: 'lskdflsj',
      id: 3,
    };

    const newUser = DB.create(user);

    res.writeHead(201, { 'Content-type': 'application/json' });

    return res.end(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getDB, getUser, createUser };
