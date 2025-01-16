const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const { authMiddleware } = require('./config/middleware')
const cors = require('cors')
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const nodemailer=require('nodemailer')


// Connect to MongoDB


// mongoose.connect('mongodb://127.0.0.1:27017/secure_login').then(() => { 
//     console.log('Connected to MongoDB');
// }, (error) => {
//     console.error('Error connecting to MongoDB', error);
// });

// app.use(cookieParser());
// const User = mongoose.model('login', new mongoose.Schema({}, { timestamps: true, strict: false }));


// Middleware to parse JSON requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use(cors())

// Middleware to log incoming requests
// app.post('/register', async (req, res) => {
//     const { email, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = User({ email: email, password: hashedPassword });
//     await newUser.save();
//     res.status(201).json({ message: "User registered successfully" });
// });


app.post('/api/form', async (req, res) => {
    const { name, email, subject, message } = req.body;
  
    // Validate the data
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    const transporter = nodemailer.createTransport({
      service: 'smtp@gmail.com', // Gmail SMTP service
      auth: {
        user: 'rahul658541@gmail.com',  // Sender email
        pass: process.env.MAIL_PASS,     // Sender password from environment variable
    
      }, 
      tls: { 
        rejectUnauthorized: false  // Needed for SSL/TLS
      }
    });
  
    const mailOptions = {
      from: 'rahul658541@gmail.com',  // Sender's email
      to: email,                      // Recipient's email
      subject: subject,               // Subject from the form
      text: `Message from: ${name}\n\nEmail: ${email}\n\nMessage: ${message}`  // Message body
    };
  
    try {
      const info = await transporter.sendMail(mailOptions);
      res.status(200).json({ success: 'Your message has been sent. Thank you!' });
      console.log('Email sent: ' + info.response);
    } catch (error) {
      res.status(500).json({ error: 'Failed to send email' });
      console.log('Error sending email:', error);
    }
  });

app.get('/api', (req, res) => {
res.send({
  message: 'Hello from the server!'
})

    // Set up email configuration using nodemailer
    //
});









//Login Page

// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (user && await bcrypt.compare(password, user.password)) {
//         // Generate JWT
//         const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
//         res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 3600000 }); // Store token in httpOnly cookie
//         res.json({ message: "Login successful" });
//     } else {
//         res.status(401).json({ message: "Invalid credentials" });
//     }
// });

// Protected route middleware

// app.use(authMiddleware);
// app.get('/api/user', authMiddleware, async (req, res) => {
//     try {
//         const user = await User.findById(req.user.userId).select('-password'); // Exclude password from response
//         res.json(user);
//     } catch (error) {
//         res.status(500).json({ message: "Failed to retrieve user data" });
//     }
// });

// app.post('/api/logout', (req, res) => {
//     res.clearCookie('token');
//     res.json({ message: 'Logout successful' });
// });
app.listen(5000, () => {
    console.log('Server is running on port 5000');
})