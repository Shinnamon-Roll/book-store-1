module.exports = (sequelize, DataTypes) => {
    const Members = sequelize.define("Members", {
      MemberID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Point: DataTypes.INTEGER,
      JoinDate: DataTypes.DATE,
      MembershipLevel: DataTypes.TEXT
    });
    
    return Members;
  };