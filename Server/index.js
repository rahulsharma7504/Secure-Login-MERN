const dotenv=require('dotenv').config();
const express =require('express');
const app = express();
const {authMiddleware}=require('./config/middleware')
const cors=require('cors')
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
// Connect to MongoDB

mongoose.connect('mongodb://127.0.0.1:27017/secure_login').then(()=>{
    console.log('Connected to MongoDB');
},(error)=>{
    console.error('Error connecting to MongoDB', error);
});

app.use(cookieParser());
const User = mongoose.model('login', new mongoose.Schema({}, { strict: false }));


// Middleware to parse JSON requests

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']  // allow cookies and authorization headers in requests
}))

// Middleware to log incoming requests
app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser =  User({ email:email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
});


//Login Page

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (user && await bcrypt.compare(password, user.password)) {
        // Generate JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
        res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 3600000 }); // Store token in httpOnly cookie
        res.json({ message: "Login successful" });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});

// Protected route middleware

// app.use(authMiddleware);
app.get('/api/user', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password'); // Exclude password from response
        res.json(user );
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve user data" });
    }
});

app.post('/api/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logout successful' });
});
app.listen(5000,()=>{
    console.log('Server is running on port 3000');
})