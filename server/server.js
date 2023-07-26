const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'npci',
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected!');
});

const createTableQuery = `CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  ebalance DECIMAL(10,2) NOT NULL DEFAULT 400
)`;

db.query(createTableQuery, (err, result) => {
  if (err) {
    throw err;
  }
  console.log('Users table created or already exists.');
});

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  
  const checkDuplicateQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkDuplicateQuery, email, (err, result) => {
    if (err) {
      throw err;
    }
    
    if (result.length > 0) {
      return res.status(409).json({ message: 'Email already exists.' });
    } else {
      const insertQuery = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
      db.query(insertQuery, [name, email, password], (err, result) => {
        if (err) {
          throw err;
        }
        return res.status(201).json({ message: 'User registered successfully.' });
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});