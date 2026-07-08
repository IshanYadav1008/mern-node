const { body } = require('express-validator');

const productValidator = [
    body('name')
        .notEmpty()
        .withMessage('Name is required'),

    body('price')
        .isNumeric()
        .withMessage('Price must be a number')
        .custom(val => val > 0)
        .withMessage('Price must be greater than 0'),

    body('category')
        .notEmpty()
        .withMessage('Category is required')
        .isIn(['electronics', 'clothes', 'furniture', 'food', 'other'])
        .withMessage('Invalid category'),

    body('stock')
        .isNumeric()
        .withMessage('Stock must be a number')
        .custom(val => val >= 0)
        .withMessage('Stock cannot be negative'),
];

module.exports = productValidator;