const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./api/User'); // Adjust the path as necessary
const User = require('./models/User'); // Assuming the User model is defined in './models/User'

const app = express();
const port = process.env.PORT || 3000; // Use the provided PORT or default to 3000

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/users', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
    console.log('Connected to MongoDB');
    
    // Create admin user if needed
    try {
        await User.createAdminIfNeeded();
        console.log('Admin user creation check completed');
    } catch (error) {
        console.error('Error creating admin user:', error);
    }
});

// User routes
app.use('/api/User', userRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
