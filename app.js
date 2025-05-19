require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const next = require('next');

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

// Start server only for local development
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}


module.exports = app;
