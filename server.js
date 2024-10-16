const express = require('express');
const bodyParser = require('body-parser');
const db = require('./src/components/database');
const { Books, Customers } = require('./models'); // Import Books and Customers models
const bcrypt = require('bcrypt');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Import and use routes
const bookRoutes = require("./routes/books");
app.use("/books", bookRoutes);

const customerRoutes = require("./routes/customers");
app.use("/customers", customerRoutes);

const bookstoreRoutes = require("./routes/bookstore");
app.use("/bookstore", bookstoreRoutes);

const memberRoutes = require("./routes/members");
app.use("/members", memberRoutes);

const booktypeRoutes = require("./routes/booktypes");
app.use("/booktypes", booktypeRoutes);

// Login API
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Customers.findOne({ where: { Contact: email } });
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        res.status(200).json({ message: 'Login successful', user });
      } else {
        res.status(401).json({ message: 'Invalid password' });
      }
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

// Registration API
app.post('/register', async (req, res) => {
  const { email, password, name, sex, address } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newMember = await Customers.create({
      Contact: email,
      password: hashedPassword,
      CustomerName: name,
      Sex: sex,
      Address: address,
      JoinDate: new Date(),
    });

    res.status(201).json({ message: 'Registration successful', newMember });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

// Other APIs for books (Add, Read, Update, Delete)
app.post('/books', async (req, res) => {
  const { bookName, bookTypeID, bookPrice, description } = req.body;

  try {
    const newBook = await Books.create({
      BookName: bookName,
      BookTypeID: bookTypeID,
      BookPrice: bookPrice,
      Description: description
    });
    res.status(201).json(newBook);
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/books', async (req, res) => {
  try {
    const books = await Books.findAll();
    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/books/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Books.findByPk(id);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/books/:id', async (req, res) => {
  const { id } = req.params;
  const { bookName, bookTypeID, bookPrice, description } = req.body;

  try {
    const book = await Books.findByPk(id);
    if (book) {
      await book.update({
        BookName: bookName,
        BookTypeID: bookTypeID,
        BookPrice: bookPrice,
        Description: description
      });
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/books/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Books.findByPk(id);
    if (book) {
      await book.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Check database connection
db.sequelize.authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// Sync database and start server
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Unable to connect to the database:', error);
});
