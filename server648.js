var express = require('express');
var app = express();
const mysql = require('mysql');
const path = require('path');
const bcrypt = require('bcrypt');
const fs = require('fs'); // Add this line to require the fs module

// Update the StaticDirectory path
var StaticDirectory = path.join(__dirname, 'application', 'frontend-html');

app.use(express.static(StaticDirectory));
app.get('/', (req, res) => {
  const currentDate = new Date().toLocaleString();

  const filePath = path.join(StaticDirectory, 'login.html');
  console.log(`Attempting to read file: ${filePath}`);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file: ${err}`);
      res.set('Content-Type', 'text/plain');
      res.status(404).end('404 Not found');
      return;
    }

    const updatedData = data.replace('{{currentDate}}', currentDate);

    res.set('Content-Type', 'text/html');
    res.status(200);
    res.end(updatedData);
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}/`);
});
