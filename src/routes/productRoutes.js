const express           = require('express');
const router            = express.Router();
const productController = require('../controllers/productController');
const { jwtAuthMiddleware, adminOnly } = require('../middleware/jwtAuth');

const validate          = require('../middleware/validate');
const productValidator  = require('../middleware/validators/productValidator');

// Public Routes
router.get('/'   , productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Admin Only Routes
router.post('/'     , jwtAuthMiddleware, adminOnly, productValidator,validate, 
                      productController.createProduct); 
                      
router.put('/:id'   , jwtAuthMiddleware, adminOnly, productController.updateProduct);
router.delete('/:id', jwtAuthMiddleware, adminOnly, productController.deleteProduct);

module.exports = router;