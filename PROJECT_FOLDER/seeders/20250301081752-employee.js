'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.bulkInsert('employee', [
            {
                id: 1,
                nik: '11012',
                name: 'Budi',
                is_active: true,
                start_date: '2022-12-12',
                end_date: '2029-12-12',
                created_by: 'admin',
                updated_by: 'admin',
                created_at: '2022-12-12',
                updated_at: '2022-12-12',
            },
            {
                id: 2,
                nik: '11013',
                name: 'Jarot',
                is_active: true,
                start_date: '2021-09-01',
                end_date: '2028-09-01',
                created_by: 'admin',
                updated_by: 'admin',
                created_at: '2022-12-12',
                updated_at: '2022-12-12',
            }
        ]);

        await queryInterface.bulkInsert('education', [
            {
                employee_id: 1,
                name: 'SMKN 7 Jakarta',
                level: 'SMA',
                description: 'Sekolah Menengah Atas',
                created_by: 'admin',
                updated_by: 'admin',
                created_at: '2022-12-12',
                updated_at: '2022-12-12',
            },
            {
                employee_id: 2,
                name: 'Universitas Negeri Jakarta',
                level: 'Strata 1',
                description: 'Sarjana',
                created_by: 'admin',
                updated_by: 'admin',
                created_at: '2022-12-12',
                updated_at: '2022-12-12',
            }
        ]);

        await queryInterface.bulkInsert('employee_family', [
            {
                employee_id: 1,
                name: 'Marni',
                identifier: '32100594109960002',
                job: 'Ibu Rumah Tangga',
                place_of_birth: 'Denpasar',
                date_of_birth: '1955-10-17',
                religion: 'Islam',
                is_life: true,
                is_divorced: false,
                relation_status: 'Istri',
                created_by: 'admin',
                updated_by: 'admin',
                created_at: '2022-12-12',
                updated_at: '2022-12-12',
            },
            {
                employee_id: 1,
                name: 'Clara',
                identifier: '32100594109020004',
                job: 'Pelajar',
                place_of_birth: 'Bangkalan',
                date_of_birth: '2008-10-17',
                religion: 'Islam',
                is_life: true,
                is_divorced: false,
                relation_status: 'Anak',
                created_by: 'admin',
                updated_by: 'admin',
                created_at: '2022-12-12',
                updated_at: '2022-12-12',
            },
            {
                employee_id: 1,
                name: 'Stephanie',
                identifier: '32100594109020005',
                job: 'Pelajar',
                place_of_birth: 'Bangkalan',
                date_of_birth: '2008-10-17',
                religion: 'Islam',
                is_life: true,
                is_divorced: false,
                relation_status: 'Anak',
                created_by: 'admin',
                updated_by: 'admin',
                created_at: '2022-12-12',
                updated_at: '2022-12-12',
            }
        ]);

        await queryInterface.bulkInsert('employee_profile', [
            {
                employee_id: 1,
                place_of_birth: 'Jakarta',
                date_of_birth: '1997-05-02',
                gender: 'Laki-Laki',
                is_married: true,
                prof_pict: null,
                created_by: 'admin',
                updated_by: 'admin',
                created_at: '2022-12-12',
                updated_at: '2022-12-12',
            },
            {
                employee_id: 2,
                place_of_birth: 'Sukabumi',
                date_of_birth: '1996-05-02',
                gender: 'Laki-Laki',
                is_married: false,
                prof_pict: null,
                created_by: 'admin',
                updated_by: 'admin',
                created_at: '2022-12-12',
                updated_at: '2022-12-12',
            }
        ]);
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.bulkDelete('employee', null, {});
        await queryInterface.bulkDelete('education', null, {});
        await queryInterface.bulkDelete('employee_family', null, {});
        await queryInterface.bulkDelete('employee_profile', null, {});
    }
};