'use strict';
const Constants = require('../src/helper/Constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable('employee_profile', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            employee_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                model: 'employee',
                key: 'id'
                }
            },
            place_of_birth: {
                type: Sequelize.STRING(255),
                allowNull: true
            },
            date_of_birth: {
                type: Sequelize.DATE,
                allowNull: true
            },
            gender: {
                type: Sequelize.ENUM(Object.values(Constants.GENDER)),
                allowNull: false
            },
            is_married: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            prof_pict: {
                type: Sequelize.STRING,
                allowNull: true
            },
            created_by: {
                type: Sequelize.STRING(255),
                allowNull: true
            },
            updated_by: {
                type: Sequelize.STRING(255),
                allowNull: true
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false
            },
        });
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.dropTable('employee_profile');
    }
};
