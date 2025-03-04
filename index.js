    const express = require('express');
    const connectDB = require('./config/database');
    // const User = require('./models/user');
    const Dish = require('./models/dish');
    const Order = require('./models/order');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const { userAuth } = require('./middlewares/userAuth');
const authRouter = require('./routes/Auth');
require('dotenv').config()
    const app = express();
    app.use(express.json());
    app.use(cookieParser());
    app.use(
        cors({
            origin: "*", 
            credentials: true, 
            methods: "GET,POST,PUT,DELETE", 
            allowedHeaders: "Content-Type,Authorization", 
        })
    );
 app.use("/", authRouter);

app.post('/orders', userAuth, async (req, res) => {
    const { dishId, quantity } = req.body;   
    try {
        const dish = await Dish.findById(dishId);  
        if (!dish) {
            return res.status(404).json({ message: 'Dish not found' });
        }
        const totalPrice = dish.price * quantity;
        const newOrder = new Order({
            user: req.user._id,  
            dish: dishId,
            quantity,
            totalPrice,
            status: 'pending'  
        });
        await newOrder.save();  
        res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
});
app.get("/dishes", async (req, res) => {
    try {
        const dishes = await Dish.find(); 
        res.status(200).json(dishes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
});

connectDB().then(()=>app.listen(4000, ()=>{
        console.log("running on port 4000");
    })
    )