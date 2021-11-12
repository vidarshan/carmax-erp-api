const bcrpyt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sequelize, User } = require('../models');

/**
 * @Description : Register a user
 * @Route       : POST /api/v1/register
 * @Access      : Public
 */
exports.register = async (req, res, next) => {
  let { username, email, role, password } = req.body;

  try {
    let salt = await bcrpyt.genSalt(10);
    password = await bcrpyt.hash('123456', salt);

    const user = await User.create({
      username,
      email,
      role,
      password,
    });

    let token = jwt.sign({ id: user.uuid }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    res.status(200).json({
      success: true,
      token,
      user,
    });

  } catch (err) {
    res.status(400).json({ success: false, error: 'An error occurred.' });
  }
};

/**
 * @Description : Login a user
 * @Route       : POST /api/v1/login
 * @Access      : Public
 */
exports.login = async (req, res, next) => {
  let { email, password } = req.body;

  if (!email || !password) {
    res
      .status(400)
      .json({ success: false, msg: 'Please enter the email and password' });
  }

  try {
    const user = await User.findOne({
      where: { email },
      attributes: { include: 'password' },
    });

    if (user) {
      const isMatch = await bcrpyt.compare(password, user.password);

      if (isMatch) {
        let token = jwt.sign({ id: user.uuid }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRE,
        });

        res.status(200).json({
          success: true,
          token,
          user,
        });
      } else {
        res.status(401).json({ success: false, msg: 'Invalid credentials' });
      }
    } else {
      res.status(401).json({ success: false, msg: 'Invalid credentials' });
    }
  } catch (err) {
      res.status(400).json({ success: false, error: 'An error occurred.' });
  }
};
