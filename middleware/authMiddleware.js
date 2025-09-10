import jwt from 'jsonwebtoken';

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, 'your_secret_key');
    req.doctorId = decoded.doctorId;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Failed to authenticate token' });
  }
}

export default verifyToken;