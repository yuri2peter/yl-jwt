const crypto = require('crypto');

const salt = 'yl-jwt';
const signIv = hash16(salt);

function hash16(text) {
  return crypto.createHmac('md5', 'yl-jwt').update(text).digest('hex').substring(0, 16);  
}

console.log(hash16('  j7j'))

// 加密
function genSign(src, key) {
  let sign = '';
  const cipher = crypto.createCipheriv('aes-128-cbc', hash16(key), signIv);
  sign += cipher.update(src, 'utf8', 'hex');
  sign += cipher.final('hex');
  return sign;
}

// 解密
function deSign(sign, key) {
  let src = '';
  const cipher = crypto.createDecipheriv('aes-128-cbc', hash16(key), signIv);
  src += cipher.update(sign, 'hex', 'utf8');
  src += cipher.final('utf8');
  return src;
}

function jwtGenerate(data = {}, cert = '', expire = 3600) {
  const text = JSON.stringify({
    data,
    expiration: (new Date()).getTime() + expire * 1000,
  });
  return genSign(text, cert);
}

function jwtResolve(text, cert = '') {
  try {
    const { data, expiration } = JSON.parse(deSign(text, cert));
    if ((new Date()).getTime() > expiration) {
      return null;
    } else {
      return data;
    }
  } catch {
    return null;
  }
}

module.exports = {
  jwtGenerate,
  jwtResolve,
}