require('dotenv').config();

const express = require ('express')
const app     = express()
const cors    = require('cors');
const db      = require('./src/config/db');
const PORT    = process.env.PORT || 3000

app.use(cors({
  origin: 'http://localhost:5173'
}));

const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.path}`);
    next();
  };  
app.use(express.json());

const userRoutes = require('./src/routes/userRoutes');
app.use('/user', userRoutes);

const productRoutes = require('./src/routes/productRoutes');
app.use('/product', productRoutes);

const cartRoutes = require('./src/routes/cartRoutes');
app.use('/cart', cartRoutes);

const orderRoutes = require('./src/routes/orderRoutes');
app.use('/order', orderRoutes);

const errorHandler = require('./src/middleware/errorHandler');
app.use(errorHandler);

app.listen(PORT, () => {
    console.log('Listening on port 3000');
})