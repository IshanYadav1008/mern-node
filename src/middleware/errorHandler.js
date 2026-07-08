const errorHandler = (err, req, res, next) => {
    console.log(err.stack);

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message });
    }

    // Mongoose cast error — galat ID format
    if (err.name === 'CastError') {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    // JWT error
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'Invalid token' });
    }

    // Default error
    res.status(500).json({ error: 'Internal Server Error' });
};

module.exports = errorHandler;