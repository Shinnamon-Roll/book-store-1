// src/components/bookstore.js
module.exports = (sequelize, DataTypes) => {
  const BookStore = sequelize.define("BookStore", {
      SaleID: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      CustomerID: {
          type: DataTypes.INTEGER,
          allowNull: false // กำหนดให้ไม่สามารถเป็น NULL ได้
      },
      BookID: {
          type: DataTypes.INTEGER,
          allowNull: false // กำหนดให้ไม่สามารถเป็น NULL ได้
      },
      PurchaseDate: {
          type: DataTypes.DATE,
          allowNull: false // กำหนดให้ไม่สามารถเป็น NULL ได้
      },
      Quantity: {
          type: DataTypes.INTEGER,
          allowNull: false // กำหนดให้ไม่สามารถเป็น NULL ได้
      }
  });
  
  return BookStore;
};
