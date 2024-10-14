const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models'); // นำเข้าโมเดลทั้งหมด
const { Books, Customers } = require('./models'); // นำเข้าโมเดล Books และ Customers
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;

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

// API สำหรับการล็อกอิน
app.post('/login', async (req, res) => {
  const { email, password } = req.body; // เปลี่ยนตามข้อมูลที่ส่งมา

  try {
    // ค้นหาผู้ใช้จากตาราง Members หรือ Customers
    const user = await Customers.findOne({ where: { Contact: email } }); // หรือใช้ Members ตามที่ต้องการ

    if (user) {
      // ตรวจสอบรหัสผ่าน (กรุณาใช้ bcrypt เพื่อเข้ารหัสรหัสผ่านในฐานข้อมูล)
      if (await bcrypt.compare(password, user.password)) { // ใช้ bcrypt ในการตรวจสอบรหัสผ่าน
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

// API สำหรับการลงทะเบียน
app.post('/register', async (req, res) => {
  const { email, password, name, sex, address } = req.body; // ข้อมูลที่ส่งมา

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // เข้ารหัสรหัสผ่าน
    const newMember = await Customers.create({
      Contact: email,
      password: hashedPassword, // ใช้รหัสผ่านที่เข้ารหัส
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

// API สำหรับการเพิ่มหนังสือ
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

// API สำหรับการอ่านหนังสือทั้งหมด
app.get('/books', async (req, res) => {
  try {
    const books = await Books.findAll();
    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API สำหรับการอ่านหนังสือตาม ID
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

// API สำหรับการอัปเดตหนังสือ
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

// API สำหรับการลบหนังสือ
app.delete('/books/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Books.findByPk(id);
    if (book) {
      await book.destroy();
      res.status(204).send(); // ส่งสถานะ 204 No Content
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ซิงค์ฐานข้อมูลและเริ่มเซิร์ฟเวอร์
db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(error => {
  console.error('Unable to connect to the database:', error);
});
