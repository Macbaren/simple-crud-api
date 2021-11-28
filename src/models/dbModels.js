const { v4: uuidv4 } = require('uuid');
const path = require('path');

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
    const user = usersDB.find((u) => u.id === id);
    res(user);
  });
};

const createNewUser = (user) => {
  return new Promise((res, rej) => {
    const newUser = { id: uuidv4(), ...user };
    usersDB.push(newUser);
    console.log('newUser', path.join(__dirname, 'file.json'));
    writeDataToFile(path.resolve('src/data/usersDB.json'), usersDB);
    res(newUser);
  });
};

const updateUserById = (id, user) => {
  return new Promise((res, rej) => {
    const userIndex = usersDB.findIndex((p) => p.id === id);
    usersDB[userIndex] = { id, ...user };

    writeDataToFile(path.resolve('src/data/usersDB.json'), usersDB);
    res(usersDB[userIndex]);
  });
};

module.exports = {
  findAll,
  findUserById,
  createNewUser,
  updateUserById,
};
