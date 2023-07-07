const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

// Set up body parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML file for form submission
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle form submission
app.post('/signup', (req, res) => {
  const { name, email, phone } = req.body;

  // Format the sign-up data
  const formData = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n`;

  // Append the sign-up data to the file
  fs.appendFile('names.txt', formData, (err) => {
    if (err) {
      console.error('Error saving sign-up data:', err);
      res.status(500).send('Error saving sign-up data');
    } else {
      // Render the thank you page
      res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-image: url('https://c4.wallpaperflare.com/wallpaper/534/99/742/code-microsoft-visual-studio-programming-wallpaper-preview.jpg');
      background-size: cover;
      background-position: center;
    }

    .container {
      max-width: 400px;
      padding: 40px;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
      transition: filter 0.3s ease-in-out;
    }

    .container:hover {
      filter: blur(0px);
    }

    .container:hover::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url('https://c4.wallpaperflare.com/wallpaper/534/99/742/code-microsoft-visual-studio-programming-wallpaper-preview.jpg');
      background-size: cover;
      background-position: center;
      opacity: 1;
      z-index: 1;
    }

    h1 {
      font-size: 24px;
      color: #333;
      text-align: center;
      margin-bottom: 20px;
    }

    p {
      font-size: 16px;
      color: #777;
      text-align: center;
      margin-bottom: 30px;
    }

    .message {
      font-size: 18px;
      color: #4caf50;
      font-weight: bold;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Thank You for Signing Up!</h1>
    <p>We appreciate your interest in our cohort.</p>
    <p class="message">🎉 Thank you! 🎉</p>
  </div>
</body>
</html>

        
             
        
      `);
    }
  });
});



// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
