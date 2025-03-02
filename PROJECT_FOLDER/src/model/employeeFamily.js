const Employee = require('./employee');
const Constants = require('../helper/Constants');

module.exports = (sequelize, DataTypes) => {
    const EmployeeFamily = sequelize.define("employee_family", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        employee_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Employee,
                key: 'id'
            }
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        identifier: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        job: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        place_of_birth: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        date_of_birth: { 
            type: DataTypes.DATE,
            allowNull: true
        },
        religion: {
            type: DataTypes.ENUM(Object.values(Constants.RELIGION)),
            allowNull: true
        },
        is_life: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        is_divorced: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        relation_status: {
            type: DataTypes.ENUM(Object.values(Constants.RELATION_STATUS)),
            allowNull: false
        },
        created_by: {
            type: DataTypes.STRING,
            allowNull: true
        },
        updated_by: {
            type: DataTypes.STRING,
            allowNull: true
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        }
    }, {
        timestamps: false,
        freezeTableName: true,
    });
  
    return EmployeeFamily;
};
