const { DataTypes } = require('sequelize');
const sequelize = require('../helper/DBUtil');

const db = {};

db.DataTypes = DataTypes;
db.sequelize = sequelize;

db.employee = require("./employee")(sequelize, DataTypes);
db.employeeProfile = require("./employeeProfile")(sequelize, DataTypes);
db.education = require("./education")(sequelize, DataTypes);
db.employeeFamily = require("./employeeFamily")(sequelize, DataTypes);

// Define Associations
db.employee.hasOne(db.employeeProfile, { foreignKey: 'employee_id', as: 'profile' });
db.employee.hasMany(db.education, { foreignKey: 'employee_id', as: 'education' });
db.employee.hasMany(db.employeeFamily, { foreignKey: 'employee_id', as: 'family' });

db.employeeProfile.belongsTo(db.employee, { foreignKey: 'employee_id', as: 'employee' });

db.education.belongsTo(db.employee, { foreignKey: 'employee_id', as: 'education' });
db.employeeFamily.belongsTo(db.employee, { foreignKey: 'employee_id', as: 'family' });

module.exports = db;
