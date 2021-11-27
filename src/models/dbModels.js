const db = require('../data/db.json');

const findAll = () => {
  return new Promise((res, rej) => {
    res(db);
  });
};
// find user by id
const findUserById = (id) => {
  return new Promise((res, rej) => {
    const user = db.find((u) => u.id === +id);
    res(user);
  });
};

module.exports = {
  findAll,
  findUserById,
};
