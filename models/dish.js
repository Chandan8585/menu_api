const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: String, required: true },
    image: { type: String },
    rating: {
        rate: { type: Number, min: 1, max: 5 },
        count: { type: Number, min: 0 },
    },
}, { timestamps: true });

const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;
