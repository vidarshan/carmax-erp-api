const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findOne({ where: { uuid: decoded.id } });
      next();
    } catch (error) {
      res
        .status(401)
        .json({ success: false, error: 'Not authorized, no token' });
    }
  }

  if (!token) {
    res.status(401).json({ success: false, error: 'Not authorized, no token' });
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        res.status(403).json({
          success: false,
          error: `User role '${req.user.role}' is not authorized to perform this action`,
        })
      );
    }
    next();
  };
};

//user levels
//1. Admin -all actions
//2. Engineer - not direct money spending.
//3. Mechanic - job cards parts request.
