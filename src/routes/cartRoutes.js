const express          = require('express');
const router           = express.Router();
const cartController   = require('../controllers/cartController');
const { jwtAuthMiddleware } = require('../middleware/jwtAuth');

// Sabhi cart routes protected hain — login zaroori hai
router.post('/'      , jwtAuthMiddleware, cartController.addToCart);
router.get('/'       , jwtAuthMiddleware, cartController.getCart);
router.put('/:id'    , jwtAuthMiddleware, cartController.updateQuantity);
router.delete('/:id' , jwtAuthMiddleware, cartController.removeFromCart);

module.exports = router;