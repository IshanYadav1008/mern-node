const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

    user: {
        type    : mongoose.Schema.Types.ObjectId,
        ref     : 'User',
        required: true
    },

    items: [
        {
            product: {
                type    : mongoose.Schema.Types.ObjectId,
                ref     : 'Product',
                required: true
            },
            quantity: {
                type    : Number,
                required: true
            },
            price: {
                type    : Number,
                required: true
                // ← Cart se alag — price bhi store karo
                // Kyunki baad mein product ka price change ho sakta hai
                // Order ka price same rehna chahiye
            }
        }
    ],

    totalAmount: {
        type    : Number,
        required: true
    },

    address: {
        type    : String,
        required: true
    },

    status: {
        type   : String,
        enum   : ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },

    paymentStatus: {
        type   : String,
        enum   : ['unpaid', 'paid'],
        default: 'unpaid'
    }

}, { timestamps: true })

const Order    = mongoose.model('Order', orderSchema);
module.exports = Order;