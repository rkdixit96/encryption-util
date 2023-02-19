#!/usr/bin/env node

const crypto = require('crypto');
const makeRequest = require('./api');

const completeUrl = process.argv[2];
const data = process.argv[3];

const host = completeUrl.split('/')[2];
const path = completeUrl.split(host)[1];

const getCertKey = async () => {
  const response = await makeRequest({
    method: 'GET',
    hostname: host,
    path: path,
  });
  return response;
};

const main = async () => {
  const cert = await getCertKey();
  const encrypted = crypto.publicEncrypt(
      {
        key: cert,
        padding: crypto.constants.RSA_PKCS1_PADDING,
      },
      Buffer.from(data),
    );
    console.log(encrypted.toString('base64'))
};

main()