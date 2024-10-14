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

// Sync database and start the server
db.sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});
