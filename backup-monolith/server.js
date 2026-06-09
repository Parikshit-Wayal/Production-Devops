const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load Environment Variables
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // JSON data read karne ke liye

// Connect Database
connectDB();

// 1. Authentication Routes (Login/Register)
app.use('/api/auth', require('./routes/auth'));

// 2. Product Routes
app.use('/api/products', require('./routes/products'));

// 2. Base Route (Testing ke liye)
app.get('/', (req, res) => {
    res.send('Minimal Shop API is running smoothly! 🚀');
});

// 3. Cart Routes
app.use('/api/cart', require('./routes/cart'));

// 4. Order Routes
app.use('/api/orders', require('./routes/orders'));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT} 🚀`));

