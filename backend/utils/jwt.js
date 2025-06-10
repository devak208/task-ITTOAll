const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
};

const generateTokens = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
  };

  const accessToken = generateToken(payload);
  const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  return { accessToken, refreshToken };
};

module.exports = {
  generateToken,
  verifyToken,
  generateTokens,
};