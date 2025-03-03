
const mongoose = require('mongoose');
const Dish = require('../../models/dish.js');
const dishes = require('../../data/data.js'); 
MONGODB_URI = process.env.MONGODB_URI;
async function seedDatabase() {
    try {
        await mongoose.connect("mongodb+srv://wingsrecr:PIfuFbqYiTKC9qIF@cluster0.00tjg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

        await Dish.deleteMany({});

        await Dish.insertMany(dishes);

        console.log('Database seeded with mock dish data!');
    } catch (error) {
        console.log('Error seeding the database:', error);
    } finally {
        mongoose.disconnect();
    }
}

seedDatabase();
