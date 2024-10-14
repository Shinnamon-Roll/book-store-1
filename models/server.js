const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models");
const app = express();

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
      if (user.password === password) { // เปลี่ยนการตรวจสอบรหัสผ่านให้ใช้ bcrypt
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
    const newMember = await Customers.create({
      Contact: email,
      password: password, // ควรใช้ bcrypt สำหรับการเข้ารหัสรหัสผ่าน
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

// Sync database and start the server
db.sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});
