module.exports = (sequelize, DataTypes) => {
    const BookStore = sequelize.define("BookStore", {
      SaleID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      CustomerID: DataTypes.INTEGER,
      BookID: DataTypes.INTEGER,
      PurchaseDate: DataTypes.DATE,
      Quantity: DataTypes.INTEGER
    });
    
    return BookStore;
  };