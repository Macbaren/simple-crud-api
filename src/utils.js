const fs = require('fs');

function writeDataToFile(filename, content) {
  fs.writeFileSync(filename, JSON.stringify(content), 'utf-8', (err) => {
    if (err) {
      console.log(err);
    }
  });
}

function getPostedData(req) {
  return new Promise((res, rej) => {
    try {
      let body = '';

      req.on('data', (chunk) => {
        body += chunk.toString();
      });

      req.on('end', () => {
        res(body);
      });
    } catch (error) {
      rej(error);
    }
  });
}

module.exports = {
  writeDataToFile,
  getPostedData,
};
