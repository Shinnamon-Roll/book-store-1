// src/components/books.js
module.exports = (sequelize, DataTypes) => {
  const Books = sequelize.define("Books", {
      BookID: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      BookName: {
          type: DataTypes.TEXT,
          allowNull: false // กำหนดให้ไม่สามารถเป็น NULL ได้
      },
      BookTypeID: {
          type: DataTypes.INTEGER,
          allowNull: true // กำหนดให้สามารถเป็น NULL ได้
      },
      BookPrice: {
          type: DataTypes.FLOAT,
          allowNull: false // กำหนดให้ไม่สามารถเป็น NULL ได้
      },
      Description: {
          type: DataTypes.TEXT,
          allowNull: true
      }
  });
  
  return Books;
};
