module.exports = (sequelize, DataTypes) => {
    const Books = sequelize.define("Books", {
      BookID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      BookName: DataTypes.TEXT,
      BookTypeID: DataTypes.INTEGER,
      BookPrice: DataTypes.FLOAT,
      Description: DataTypes.TEXT
    });
    
    return Books;
  };