const Employee = require('./employee');
const Constants = require('../helper/Constants');


module.exports = (sequelize, DataTypes) => {
    const EmployeeProfile = sequelize.define("employee_profile", {
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
        place_of_birth: {
            type: DataTypes.STRING,
            allowNull: true
        },
        date_of_birth: {
            type: DataTypes.DATE,
            allowNull: true
        },
        gender: {
            type: DataTypes.ENUM(Object.values(Constants.GENDER)),
            allowNull: false
        },
        is_married: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        prof_pict: {
            type: DataTypes.STRING,
            allowNull: true
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
  
    return EmployeeProfile;
};
