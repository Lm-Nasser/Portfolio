require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { 
    github: process.env.github,
    linkedin: process.env.linkedin,
    twitter: process.env.twitter,
    email: process.env.email,
    whatsapp: process.env.whatsapp
   });
});

app.get('/about', (req, res) => {
    res.render('about', { 
    github: process.env.github,
    linkedin: process.env.linkedin,
    twitter: process.env.twitter,
    email: process.env.email,
    whatsapp: process.env.whatsapp
   });
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.notificationSender,
    pass: process.env.appPassword // app password
  }
});

// Add this route to your existing Node.js code to handle form submissions
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;
  
  try {
    // Email content
    const mailOptions = {
      from: process.env.notificationSender,
      to: process.env.notificationReceiver, // Your email to receive notifications
      subject: `New Contact Form Message from: ${name}`,
      html: `
        <h3>New message from your website</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };
    
    // Send email
    await transporter.sendMail(mailOptions);
    
    // Email was sent successfully if we reached this point
    res.redirect('/?message=success');
    
  } catch (error) {
    console.error('Error sending email:', error);
    res.redirect('/?message=error');
  }
});

module.exports = app;