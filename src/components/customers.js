module.exports = (sequelize, DataTypes) => {
    const Customers = sequelize.define("Customers", {
      CustomerID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      MemberID: DataTypes.INTEGER,
      CustomerName: DataTypes.TEXT,
      Sex: DataTypes.TEXT,
      Age: DataTypes.INTEGER,
      Contact: DataTypes.INTEGER,
      Address: DataTypes.TEXT
    });
    
    return Customers;
  };