const { body } = require('express-validator');

const validatePizza = [
    body('name').isString().withMessage('Name must be a string'),
    body('price').isFloat().withMessage('Price must be a float'),
    body('ingredients').isString().withMessage('Ingredients must be a string'),
    body('description')
        .isString()
        .withMessage('Description must be a string')
        .custom((value) => {
            const wordCount = value.trim().split(/\s+/).length;
         return wordCount <= 2;   
        })
        .withMessage('La descripción no debe exceder las 2 palabras')
    //body('img').isString().withMessage('Img must be a string'),
    //body('state').isString().withMessage('State must be a string')
];

module.exports = {
    validatePizza
};
