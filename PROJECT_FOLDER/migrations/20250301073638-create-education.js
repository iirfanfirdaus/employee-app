'use strict';
const Constants = require('../src/helper/Constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable('education', {
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
            name: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            level: {
                type: Sequelize.ENUM(Object.values(Constants.EDUCATION_LEVEL)),
                allowNull: false
            },
            description: {
                type: Sequelize.STRING(255),
                allowNull: false
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
        await queryInterface.dropTable('education');
    }
};
