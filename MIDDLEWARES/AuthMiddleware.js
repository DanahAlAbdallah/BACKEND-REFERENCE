//AUTHENTICATION MIDDLEWARE FUNCTION
const jwt = require('jsonwebtoken');

const AUTH_MIDDLEWARE = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.adminId = decoded.id;
      next();
    } catch (error) {
      res.status(401).json({ error: 'Not authorized, token failed' });
    }
  }
};

module.exports = authMiddleware;