const jwt = require('jsonwebtoken');
const TOKEN_SECRET = process.env.TOKEN_SECRET; 


const validateTokenMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid Token' });
    }

    // Attach user ID to request body
    req.body.userId = user;
    next();
  });
};

module.exports = {validateTokenMiddleware};
