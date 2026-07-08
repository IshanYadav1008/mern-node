const express           = require('express');
const router            = express.Router();
const orderController   = require('../controllers/orderController');
const { jwtAuthMiddleware, adminOnly } = require('../middleware/jwtAuth');

// ✅ User Routes
router.post('/'           , jwtAuthMiddleware, orderController.placeOrder);
router.get('/myorders'    , jwtAuthMiddleware, orderController.getMyOrders);
router.put('/cancel/:id'  , jwtAuthMiddleware, orderController.cancelOrder);

// ✅ Admin Routes
router.get('/'            , jwtAuthMiddleware, adminOnly, orderController.getAllOrders);
router.put('/status/:id'  , jwtAuthMiddleware, adminOnly, orderController.updateOrderStatus);

module.exports = router;