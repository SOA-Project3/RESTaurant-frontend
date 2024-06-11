const crypto = require('crypto');

const key = Buffer.from('97345688501354567590123456789012', 'utf8'); // 32-byte key
const iv = Buffer.from('9464567890123457', 'utf8'); // 16-byte IV


// Encrypt a password
function encryptPassword(password) {
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(password, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

module.export = {
  encryptPassword
};