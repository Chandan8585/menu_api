const mongoose = require('mongoose');
const Dish = require('./dish');
const User = require('./user');
const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },  
    dish: { type: mongoose.Schema.Types.ObjectId, ref: Dish, required: true },  
    quantity: { type: Number, required: true, min: 1 },
    totalPrice: { type: Number, required: true },
    status: { type: String, default: 'pending' },  // Could be 'pending', 'completed', 'cancelled'
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

