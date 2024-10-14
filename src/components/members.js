const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database'); // อาจต้องเปลี่ยนตามที่ตั้งของไฟล์ database.js ของคุณ

class Members extends Model {}

Members.init({
  MemberID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Point: DataTypes.INTEGER,
  JoinDate: DataTypes.DATE,
  MembershipLevel: DataTypes.STRING,
}, { sequelize, modelName: 'members' });

module.exports = Members;
