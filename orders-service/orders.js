const express = require('express');
const router = express.Router();
const Order = require('./Order');
const Cart = require('../models/Cart');
const { protect } = require('./middleware/authMiddleware');

// 1. PLACE AN ORDER (Checkout logic)
router.post('/place', protect, async (req, res) => {
    try {
        const { items, totalAmount, address } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'Your cart is empty!' });
        }

        const newOrder = new Order({
            userId: req.user.id,
            items,
            totalAmount,
            address
        });

        await newOrder.save();

        // Order hone ke baad user ki cart khali (clear) kar do
        await Cart.findOneAndUpdate({ userId: req.user.id }, { items: [] });

        res.status(201).json({ message: 'Order placed successfully! 🎉', order: newOrder });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. GET USER ORDERS (Order history dekhne ke liye)
router.get('/history', protect, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id }).populate('items.productId').sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;