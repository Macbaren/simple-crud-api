const { v4: uuidv4 } = require('uuid');
const path = require('path');

let person = require('../data/person.json');
const { writeDataToFile } = require('../utils');

const findAll = () => {
  return new Promise((res, rej) => {
    res(person);
  });
};
// find user by id
const findUserById = (id) => {
  return new Promise((res, rej) => {
    const user = person.find((u) => u.id === id);
    res(user);
  });
};

const createNewUser = (user) => {
  return new Promise((res, rej) => {
    const newUser = { id: uuidv4(), ...user };
    person.push(newUser);
    writeDataToFile(path.resolve('src/data/person.json'), person);
    res(newUser);
  });
};

const updateUserById = (id, user) => {
  return new Promise((res, rej) => {
    const userIndex = person.findIndex((p) => p.id === id);
    person[userIndex] = { id, ...user };

    writeDataToFile(path.resolve('src/data/person.json'), person);
    res(person[userIndex]);
  });
};

const deleteUserById = (id) => {
  return new Promise((res, rej) => {
    person = person.filter((p) => p.id !== id);
    writeDataToFile(path.resolve('src/data/person.json'), person);
    res();
  });
};

module.exports = {
  findAll,
  findUserById,
  createNewUser,
  updateUserById,
  deleteUserById,
};
