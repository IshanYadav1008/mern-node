const Cart    = require('../models/Cart');
const Product = require('../models/Product');

// ✅ Add to Cart
exports.addToCart = async (req, res) => {
    try {
        const userId    = req.user.id;  // JWT se
        const { productId, quantity } = req.body;

        // Product exist karta hai?
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Stock available hai?
        if (product.stock < quantity) {
            return res.status(400).json({ message: 'Insufficient stock' });
        }

        // User ka cart pehle se hai?
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            // Cart nahi hai — naya banao
            cart = new Cart({
                user : userId,
                items: [{ product: productId, quantity }]
            });

        } else {
            // Cart hai — product already hai?
            const itemIndex = cart.items.findIndex(
                item => item.product.toString() === productId
            );

            if (itemIndex > -1) {
                // Product already hai — quantity update karo
                cart.items[itemIndex].quantity += quantity;
            } else {
                // Product nahi hai — add karo
                cart.items.push({ product: productId, quantity });
            }
        }

        // ✅ Stock kam karo
        product.stock -= quantity;
        await product.save();

        const savedCart = await cart.save();
        res.status(200).json({ message: 'Added to cart', cart: savedCart });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// ✅ Get Cart — Apna cart dekho
exports.getCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const cart = await Cart.findOne({ user: userId })
            .populate('items.product', 'name price image');
            //  ↑ product ki details bhi saath aayengi

        if (!cart) {
            return res.status(404).json({ message: 'Cart is empty' });
        }

        res.status(200).json(cart);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// ✅ Update Quantity
exports.updateQuantity = async (req, res) => {
    try {
        const userId       = req.user.id;
        const itemId       = req.params.id;
        const { quantity } = req.body;

        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const item = cart.items.id(itemId);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        // ✅ Pehle difference nikalo
        const product    = await Product.findById(item.product);
        const difference = quantity - item.quantity;
        // difference > 0 — quantity badhi  — stock kam karo
        // difference < 0 — quantity ghati — stock badhao

        // ✅ Stock check karo
        if (product.stock < difference) {
            return res.status(400).json({ message: 'Insufficient stock' });
        }

        // ✅ Stock update karo
        product.stock -= difference;
        await product.save();

        item.quantity = quantity;
        await cart.save();

        res.status(200).json({ message: 'Quantity updated', cart });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// ✅ Remove Item from Cart
exports.removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const itemId = req.params.id;

        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        // ✅ Pehle item dhundo — stock wapas karne ke liye
        const item = cart.items.find(
            item => item._id.toString() === itemId
        );
        if (!item) return res.status(404).json({ message: 'Item not found' });

        // ✅ Stock wapas karo
        const product    = await Product.findById(item.product);
        product.stock   += item.quantity;
        await product.save();

        // Item hatao cart se
        cart.items = cart.items.filter(
            item => item._id.toString() !== itemId
        );

        await cart.save();
        res.status(200).json({ message: 'Item removed', cart });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};