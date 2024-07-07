const { body, validationResult } = require('express-validator');

exports.validateUser = [
  body('name').isString().withMessage('Name must be a string'),
  body('surname').isString().withMessage('Username must be a string'),
  body('email').isEmail().withMessage('Must be a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('role').isString().withMessage('Role must be a string'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
