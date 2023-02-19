const https = require('https');

async function makeRequest(options) {
  return new Promise((resolve, reject) => {
    https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve(data);
      });
    }).on('error', (error) => {
      reject(error);
    }).end();
  });
}

module.exports = makeRequest