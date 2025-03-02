'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('employee', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            nik: {
                type: Sequelize.STRING(50),
                allowNull: true
            },
            name: {
                type: Sequelize.STRING(255),
                allowNull: true
            },
            is_active: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            start_date: {
                type: Sequelize.DATE,
                allowNull: false
            },
            end_date: {
                type: Sequelize.DATE,
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

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('employee');
    }
};