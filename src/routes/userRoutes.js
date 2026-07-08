const express                           = require ('express'); 
const router                            = express.Router();
const userController                    = require('../controllers/userController');
const { jwtAuthMiddleware, adminOnly }  = require('../middleware/jwtAuth');

// ✅ Public routes — koi bhi access kar sake
router.post('/signup', userController.signup);
router.post('/login' , userController.login);

// ✅ Protected routes — sirf logged in user
router.get('/profile'    , jwtAuthMiddleware, userController.getUserProfile);
router.put('/:id'        , jwtAuthMiddleware, userController.updateUserById);
router.delete('/account' , jwtAuthMiddleware, userController.deleteOwnAccount);

// ✅ Admin only routes — sirf admin
router.post('/createAdmin' , jwtAuthMiddleware, adminOnly, userController.createAdmin); 
router.get('/'             , jwtAuthMiddleware, adminOnly, userController.getAllUsers); 
router.delete('/:id'       , jwtAuthMiddleware, adminOnly, userController.deleteUser);

module.exports = router;