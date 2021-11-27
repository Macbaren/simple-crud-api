const { v4: uuidv4 } = require('uuid');

const usersDB = require('../data/usersDB.json');
const { writeDataToFile } = require('../utils');

const findAll = () => {
  return new Promise((res, rej) => {
    res(usersDB);
  });
};
// find user by id
const findUserById = (id) => {
  return new Promise((res, rej) => {
    const user = usersDB.find((u) => u.id === +id);
    res(user);
  });
};

const createNewUser = (user) => {
  return new Promise((res, rej) => {
    const newUser = { id: uuidv4(), ...user };
    usersDB.push(newUser);
    writeDataToFile('../data/usersDB.json', usersDB);
    res(newUser);
  });
};

module.exports = {
  findAll,
  findUserById,
  createNewUser,
};
