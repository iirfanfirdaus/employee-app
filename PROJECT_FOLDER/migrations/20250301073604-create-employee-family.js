'use strict';
const Constants = require('../src/helper/Constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable('employee_family', {
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
                allowNull: true
            },
            identifier: {
                type: Sequelize.STRING(255),
                allowNull: true
            },
            job: {
                type: Sequelize.STRING(255),
                allowNull: true
            },
            place_of_birth: {
                type: Sequelize.STRING(255),
                allowNull: true
            },
            date_of_birth: {
                type: Sequelize.DATE,
                allowNull: true
            },
            religion: {
                type: Sequelize.ENUM(Object.values(Constants.RELIGION)),
                allowNull: true
            },
            is_life: {
                type: Sequelize.BOOLEAN,
                allowNull: true
            },
            is_divorced: {
                type: Sequelize.BOOLEAN,
                allowNull: true
            },
            relation_status: {
                type: Sequelize.ENUM(Object.values(Constants.RELATION_STATUS)),
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
        await queryInterface.dropTable('employee_family');
    }
};
