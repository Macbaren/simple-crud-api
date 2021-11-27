const http = require('http');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const {
  getDB,
  getUser,
  createUser,
} = require('./src/controllers/dbController');

const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  if (req.url === '/api/usersDB' && req.method === 'GET') {
    getDB(req, res);
  } else if (/\/api\/usersDB\/[0-9]+/g.test(req.url) && req.method === 'GET') {
    const id = req.url.split('/').pop();
    getUser(req, res, id);
  } else if (req.url === '/api/usersDB' && req.method === 'POST') {
    createUser(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
