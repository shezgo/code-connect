const { createHmac, createHash, scryptSync, randomBytes } = require('crypto');

exports.hash = (type, buffer) => {
  return createHash(type)
    .update(buffer)
    .digest('hex');
}

exports.createPasswordHash = (password, salt) => {
  const generatedSalt = salt || randomBytes(128).toString('base64');

  const hmac = createHmac('sha256', generatedSalt);
  hmac.update(password);
  let hashedPassword = hmac.digest('hex');

  const scrypt = scryptSync(hashedPassword, generatedSalt, 64);
  hashedPassword = scrypt.toString('hex');

  return {
    hash: hashedPassword,
    salt: generatedSalt
  };
}
