const crypto = require('crypto');

const algorithm = 'aes-256-cbc'; // Using AES encryption
const key = crypto.randomBytes(32); // Generate a 32 byte key
const iv = crypto.randomBytes(16); // Generate a 16 byte IV

function encrypt(text) {
  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

module.export = {
    encrypt
};