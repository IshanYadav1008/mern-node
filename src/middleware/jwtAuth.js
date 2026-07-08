const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {

    if (!req.headers.authorization) {
        return res.status(401).json({ error: 'No token provided' });
      }
    // Extract the jwt token from the request hearder
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({ error: 'Unauthorized' });

    try{
        // Verify the JWT Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // Attach user information to the request object
        req.user = decoded
        next();
    }
    catch(err){
        console.log(err);
        res.status(401).json({ error: 'Invalid Token' })
    }
}

const adminOnly = (req, res, next) => {
    if(req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access only' });
    }
    next();
};

module.exports = { jwtAuthMiddleware, adminOnly } ;