const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    name: {
        type    : String,
        required: true,
        trim    : true
    },
    description: {
        type    : String,
        required: true
    },
    price: {
        type    : Number,
        required: true,
        min     : 0
    },
    category: {
        type    : String,
        required: true,
        enum    : ['electronics', 'clothes', 'furniture', 'food', 'other']
    },
    stock: {
        type    : Number,
        required: true,
        min     : 0,
        default : 0
    },
    image: {
        type    : String,
        default : 'default-product.png'
    },
    createdBy: {
        type    : mongoose.Schema.Types.ObjectId,
        ref     : 'User'    // ← kis admin ne banaya
    }

}, { timestamps: true })

const Product     = mongoose.model('Product', productSchema);
module.exports    = Product;