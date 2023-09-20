import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      succeded: false,
      message: 'No token provided',
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        succeded: false,
        message: 'Unauthorized',
      });
    }
    req.userId = decoded.userId;
    next();
  });
};

export default authMiddleware;
