module.exports = (sequelize, DataTypes) => {
  const Customers = sequelize.define("Customers", {
      CustomerID: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      MemberID: {
          type: DataTypes.INTEGER,
          allowNull: true // กำหนดให้สามารถเป็น NULL ได้
      },
      CustomerName: {
          type: DataTypes.TEXT,
          allowNull: false // กำหนดให้ไม่สามารถเป็น NULL ได้
      },
      Sex: {
          type: DataTypes.TEXT,
          allowNull: true
      },
      Age: {
          type: DataTypes.INTEGER,
          allowNull: true
      },
      Contact: {
          type: DataTypes.INTEGER,
          allowNull: true
      },
      Address: {
          type: DataTypes.TEXT,
          allowNull: true
      }
  });

  return Customers;
};
