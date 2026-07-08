const Product = require('../models/Product');

// ✅ Create Product — Admin only
exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock, image } = req.body;

        const newProduct = new Product({
            name,
            description,
            price,
            category,
            stock,
            image,
            createdBy: req.user.id  // ← JWT se admin ka id aa raha hai
        });

        const savedProduct = await newProduct.save();
        res.status(201).json({ message: 'Product created', product: savedProduct });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// ✅ Get All Products — Sabhi dekh sakte hain
exports.getAllProducts = async (req, res) => {
    try {
        const { search, category, minPrice, maxPrice } = req.query;
        //       ↑ query params se aayega

        let query = {};

        // Search — name mein dhundo
        if (search) {
            query.name = { $regex: search, $options: 'i' }
            //                              ↑ case insensitive
        }

        // Category filter
        if (category) {
            query.category = category;
        }

        // Price range filter
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        const products = await Product.find(query);
        res.status(200).json(products);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// ✅ Get Single Product — Sabhi dekh sakte hain
exports.getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product   = await Product.findById(productId)

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// ✅ Update Product — Admin only
exports.updateProduct = async (req, res) => {
    try {
        const productId     = req.params.id;
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated', product: updatedProduct });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// ✅ Delete Product — Admin only
exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product   = await Product.findByIdAndDelete(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted' });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};