const jwt = require('jsonwebtoken');

// Function to generate JWT token
const generateToken = (userData) => {

    // Generate a new JWT token using user data
    return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '7d' }); // Ab ye fn() kya lega ? 'userData'
                                                       // or Secret key.
}

// Exporting 'jwtAuthMiddleware' middleware and generateToken
module.exports = generateToken ;
