module.exports = (sequelize, DataTypes) => {
    const BookTypes = sequelize.define("BookTypes", {
      BookTypeID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      BookTypeName: DataTypes.TEXT
    });
    
    return BookTypes;
  };