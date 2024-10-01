const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());

const DB_SERVICE_URL = 'http://localhost:3002'; // URL of the database microservice

// Get all items
app.get('/items', async (req, res) => {
    try {
        const response = await axios.get(`${DB_SERVICE_URL}/items`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving items' });
    }
});

// Create a new item
app.post('/items', async (req, res) => {
    try {
        const response = await axios.post(`${DB_SERVICE_URL}/items`, req.body);
        res.status(201).json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error creating item' });
    }
});

// Get count of items by name
app.get('/items/count', async (req, res) => {
    const name = req.query.name;
    try {
        const response = await axios.get(`${DB_SERVICE_URL}/items?name=${name}`);
        const count = response.data.length; // Count the number of items with the specified name
        res.json({ count }); // Return the count
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving count' });
    }
});

// Other CRUD operations...

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`API service running on port ${PORT}`);
});
