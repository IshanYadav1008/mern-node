require('dotenv').config();
const mongoose = require('mongoose');
const User     = require('../models/User');

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL_LOCAL);
        console.log('DB Connected');

        const admin = await User.create({
            name:     'Admin',
            email:    'admin@gmail.com',
            username: 'admin',
            password: 'admin123',  // bcrypt automatically hash kar dega
            role:     'admin'
        });

        console.log('Admin created:', admin);

    } catch(err) {
        console.log(err);
    } finally {
        mongoose.disconnect(); // kaam ho gaya, DB band karo
    }
};

seedAdmin();