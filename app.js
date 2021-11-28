const http = require('http');
require('dotenv').config();

const {
  getDB,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('./src/controllers/dbController');

const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  if (req.url === '/api/person' && req.method === 'GET') {
    getDB(req, res);
  } else if (
    /\/api\/person\/[0-9a-z\-]+/g.test(req.url) &&
    req.method === 'GET'
  ) {
    const id = req.url.split('/').pop();
    getUser(req, res, id);
  } else if (req.url === '/api/person' && req.method === 'POST') {
    createUser(req, res);
  } else if (
    /\/api\/person\/[0-9a-z\-]+/g.test(req.url) &&
    req.method === 'PUT'
  ) {
    const id = req.url.split('/').pop();
    updateUser(req, res, id);
  } else if (
    /\/api\/person\/[0-9a-z\-]+/g.test(req.url) &&
    req.method === 'DELETE'
  ) {
    const id = req.url.split('/').pop();
    deleteUser(req, res, id);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
