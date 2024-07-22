const express = require('express');
const app = express();
const PORT = 5000;

// Middleware to check if the request is during working hours (Monday to Friday, from 9 to 17)
const workingHoursMiddleware = (req, res, next) => {
  const date = new Date();
  const day = date.getDay();
  const hour = date.getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.send('<h1>Sorry, the web application is only available during working hours (Monday to Friday, from 9 to 17).</h1>');
  }
};

app.use(workingHoursMiddleware);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/home.html');
});

app.get('/services', (req, res) => {
  res.sendFile(__dirname + '/services.html');
});

app.get('/contact', (req, res) => {
  res.sendFile(__dirname + '/contact.html');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
