const Order   = require('../models/Order');
const Cart    = require('../models/Cart');
const Product = require('../models/Product');

// ✅ Place Order — Cart se Order banana
exports.placeOrder = async (req, res) => {
    try {
        const userId          = req.user.id;
        const { address }     = req.body;

        const cart = await Cart.findOne({ user: userId })
            .populate('items.product', 'name price stock');

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        let totalAmount = 0;
        const orderItems = cart.items.map((item) => {
            totalAmount += item.product.price * item.quantity;
            return {
                product : item.product._id,
                quantity: item.quantity,
                price   : item.product.price
            }
        });

        const newOrder = new Order({
            user         : userId,
            items        : orderItems,
            totalAmount  : totalAmount,
            address      : address,
            status       : 'pending',
            paymentStatus: 'unpaid'
        });

        await newOrder.save();

        // ✅ Pehle cart empty karo
        cart.items = [];
        await cart.save();

        // ✅ Phir populate karo
        const populatedOrder = await Order.findById(newOrder._id)
            .populate('items.product', 'name price image')
            .populate('user', 'name email');

        // ✅ Sirf ek baar response bhejo — bilkul end mein
        res.status(201).json({ message: 'Order placed', order: populatedOrder });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// ✅ Get My Orders — User apne orders dekhe
exports.getMyOrders = async (req, res) => {
    try {
        const userId = req.user.id;

        const orders = await Order.find({ user: userId })
            .populate('items.product', 'name price image');

        if (!orders) {
            return res.status(404).json({ message: 'No orders found' });
        }

        res.status(200).json(orders);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// ✅ Get All Orders — Admin only
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('user', 'name email')
            .populate('items.product', 'name price');

        res.status(200).json(orders);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// ✅ Update Order Status — Admin only
exports.updateOrderStatus = async (req, res) => {
    try {
        const orderId                    = req.params.id;
        const { status, paymentStatus }  = req.body;  // ← dono lo

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Sirf agar diya ho toh update karo
        if (status)        order.status        = status;
        if (paymentStatus) order.paymentStatus = paymentStatus;

        await order.save();

        res.status(200).json({ message: 'Order updated', order });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// ✅ Cancel Order — User apna order cancel kare
exports.cancelOrder = async (req, res) => {
    try {
        const userId  = req.user.id;
        const orderId = req.params.id;

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Sirf apna order cancel kar sake
        if (order.user.toString() !== userId) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        // Delivered order cancel nahi ho sakta
        if (order.status === 'delivered') {
            return res.status(400).json({ message: 'Delivered order cannot be cancelled' });
        }

        // ✅ Stock wapas karo
        for (const item of order.items) {
            const product  = await Product.findById(item.product);
            product.stock += item.quantity;
            await product.save();
        }

        order.status = 'cancelled';
        await order.save();

        res.status(200).json({ message: 'Order cancelled', order });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};