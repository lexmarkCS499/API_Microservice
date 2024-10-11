const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://mongodb:27017/local', { // Change to your database name
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define the Item schema
const ItemSchema = new mongoose.Schema({
    name: String,
    quantity: { type: Number, default: 1 }, // Set default quantity to 1
});

const Item = mongoose.model('Item', ItemSchema);

// Get all items or filter by name
app.get('/items', async (req, res) => {
    try {
        const name = req.query.name; // Get name from query parameters
        const items = name ? await Item.find({ name }) : await Item.find(); // Filter if name provided
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving items' });
    }
});

// Create a new item
app.post('/items', async (req, res) => {
    try {
        const newItem = new Item(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: 'Error creating item' });
    }
});

// Get count of items by name
app.get('/items/count', async (req, res) => {
    const name = req.query.name;
    try {
        const items = await Item.find({ name });
        const count = items.length; // Count the number of items with the specified name
        res.json({ count }); // Return the count
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving count' });
    }
});

// Other CRUD operations...

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Service running on port ${PORT}`);
});
