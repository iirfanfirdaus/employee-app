const path = require('path')
const fs = require('fs')

const ResponseUtil = require('../helper/ResponseUtil');
const LoggerUtil = require('../helper/LoggerUtil');
const StringUtil = require('../helper/StringUtil');
const MessageUtil = require('../helper/MessageUtil');
const db = require('../model');
const { sequelize } = db;
const Employee = db.employee;
const EmployeeProfile = db.employeeProfile;
const Education = db.education;
const EmployeeFamily = db.employeeFamily;

class EmployeeController {
    search = async(req, res) => {
        try {
            let { page = 1, per_page = 10, order_by = 'created_at', dir = 'desc', nik, name } = req.query;
    
            page = parseInt(page);
            per_page = parseInt(per_page);
    
            const whereCondition = {};
            if (nik) {
                whereCondition.nik = nik;
            }

            if (name) {
                whereCondition.name = name;
            }
    
            const { count: total_rows, rows } = await Employee.findAndCountAll({
                where: whereCondition,
                include: [
                    { model: EmployeeProfile, as: 'profile' },
                    { model: Education, as: 'education' },
                    { model: EmployeeFamily, as: 'family' }
                ],
                order: [[order_by, dir]],
                limit: per_page,
                offset: (page - 1) * per_page
            });
    
            const total_pages = Math.ceil(total_rows / per_page);
    
            ResponseUtil.searchOk(res, page, per_page, total_rows, total_pages, rows);
        } catch (err) {
            LoggerUtil.error('EmployeeController.search', err)
            ResponseUtil.internalServerErr(res, MessageUtil.errorDuringSearch())
        }
    }

    report = async(req, res) => {
        try {
            const employees = await Employee.findAll({
                where: { is_active: true },
                attributes: ['id', 'nik', 'name', 'is_active'],
                include: [
                    {
                        model: EmployeeProfile,
                        as: 'profile',
                        attributes: [
                            'gender',
                            [sequelize.literal("AGE(profile.date_of_birth)"), 'age']
                        ]
                    },
                    {
                        model: Education,
                        as: 'education',
                        attributes: ['name', 'level']
                    },
                    {
                        model: EmployeeFamily,
                        as: 'family',
                        attributes: [
                            'relation_status',
                            [sequelize.fn('COUNT', sequelize.col('family.id')), 'count_relation_status']
                        ],
                        required: false,
                        group: ['family.employee_id', 'family.relation_status'],
                        duplicating: false
                    }
                ],
                group: ['employee.id', 'profile.id', 'education.id', 'family.id']
            });            
            
            const result = employees.map(employee => {
                const familyCounts = employee.family.reduce((acc, member) => {
                    if (!acc[member.relation_status]) {
                        acc[member.relation_status] = 0;
                    }
                    acc[member.relation_status] += 1;
                    return acc;
                }, {});
        
                const formattedFamily = Object.keys(familyCounts).map(relation_status => ({
                    relation_status,
                    count_relation_status: familyCounts[relation_status]
                }));
        
                return {
                    ...employee.toJSON(),
                    family: formattedFamily
                };
            });

            res.status(200).json({ message: 'Data found', data: result });
        } catch (err) {
            console.error('Error fetching employees:', err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    find = async(req, res) => {
        const { employee_id } = req.params
        try {
            const employee = await Employee.findByPk(employee_id, {
                include: [
                    { model: EmployeeProfile, as: 'profile' },
                    { model: Education, as: 'education' },
                    { model: EmployeeFamily, as: 'family' }
                ]
            });

            if (!employee) {
                ResponseUtil.badRequest(res, MessageUtil.notFoundInMasterMessage(`Employee ID: ${employee_id}`))
                return
            }

            ResponseUtil.ok(res, MessageUtil.dataFound(), employee);
        } catch(err) {
            LoggerUtil.error('EmployeeController.find', err)
            ResponseUtil.internalServerErr(res, MessageUtil.errorDuringSearch())
        }
    }

    create = async(req, res) => {
        const body = req.body;
        const { prof_pict } = req.files;
        let photoProfile = null;
        const transaction = await sequelize.transaction();
        try {
            // check existing eployee
            const employee = await Employee.findOne({ where: { nik: body.nik }, transaction });
            if (employee) {
                ResponseUtil.badRequest(res, MessageUtil.duplicateMessage(`Nik: ${body.nik}`))
                return
            }

            // upload prof_pict
            if (prof_pict && !['.jpg', '.jpeg', '.png'].includes(path.extname(prof_pict.name).toLowerCase())) {
                ResponseUtil.badRequest(res, 'Photo profile hanya boleh berformat .jpg, .jpeg dan .png')
                return
            }
            if (prof_pict) {
                photoProfile = `photo_profile/${body.nik}${path.extname(prof_pict.name).toLowerCase()}`;
                fs.writeFileSync(path.join('./public/', photoProfile), fs.readFileSync(prof_pict.path));
            }

            // store employee
            StringUtil.addIdentity(body, new Date(), body.name, true);
            const currentEmployee = await Employee.create(body, { transaction });

            body.employee_id = currentEmployee.id;
            body.prof_pict = photoProfile;
            await EmployeeProfile.create(body, { transaction });

            // store education
            if (body.education?.length > 0) {
                await Promise.all(body.education.map(async (v) => {
                    const payload = {
                        ...body,
                        ...v,
                    }

                    await Education.create(payload, { transaction })
                }));
            }

            // store family
            if (body.family?.length > 0) {
                await Promise.all(body.family.map(async (v) => {
                    const payload = {
                        ...body,
                        ...v,
                    }

                    await EmployeeFamily.create(payload, { transaction })
                }));
            }

            const result = await Employee.findByPk(currentEmployee.id, {
                include: [
                    { model: EmployeeProfile, as: 'profile' },
                    { model: Education, as: 'education' },
                    { model: EmployeeFamily, as: 'family' }
                ],
                transaction,
            });
            await transaction.commit();
            ResponseUtil.ok(res, MessageUtil.savedSuccessfully(), result)
        } catch(err) {
            await transaction.rollback();
            LoggerUtil.error('EmployeeController.create', err)
            ResponseUtil.internalServerErr(res, MessageUtil.errorDuringSave())
        }
    }

    update = async(req, res) => {
        const { employee_id } = req.params;
        const body = req.body;
        const { prof_pict } = req.files;
        let photoProfile = null;
        const transaction = await sequelize.transaction();
        try {
            const employee = await Employee.findByPk(employee_id);
            if (!employee) {
                ResponseUtil.badRequest(res, MessageUtil.notFoundInMasterMessage(`Employee ID: ${employee_id}`))
                return
            }

            const existingEmployee = await Employee.findOne({ where: { nik: body.nik }, transaction });
            if (existingEmployee && existingEmployee.id !== parseInt(employee_id)) {
                ResponseUtil.badRequest(res, MessageUtil.duplicateMessage(`Nik: ${body.nik}`))
                return
            }

            // upload prof_pict
            if (prof_pict && !['.jpg', '.jpeg', '.png'].includes(path.extname(prof_pict.name).toLowerCase())) {
                ResponseUtil.badRequest(res, 'Photo profile hanya boleh berformat .jpg, .jpeg dan .png')
                return
            }
            if (prof_pict) {
                photoProfile = `photo_profile/${body.nik}${path.extname(prof_pict.name).toLowerCase()}`;
                fs.writeFileSync(path.join('./public/', photoProfile), fs.readFileSync(prof_pict.path));
            } else {
                photoProfile = employee.prof_pict;
            }

            // update employee
            StringUtil.addIdentity(body, new Date(), body.name);
            body.prof_pict = photoProfile;
            await Employee.update(body, { where: { id: employee_id }, transaction });
            await EmployeeProfile.update(body, { where: { id: employee_id }, transaction });

            const result = await Employee.findByPk(employee.id, {
                include: [
                    { model: EmployeeProfile, as: 'profile' },
                    { model: Education, as: 'education' },
                    { model: EmployeeFamily, as: 'family' }
                ],
                transaction,
            });
            await transaction.commit();
            ResponseUtil.ok(res, MessageUtil.updatedSuccessfully(), result)
        } catch(err) {
            await transaction.rollback();
            LoggerUtil.error('EmployeeController.update', err)
            ResponseUtil.internalServerErr(res, MessageUtil.errorDuringSave())
        }
    }

    delete = async(req, res) => {
        const { employee_id } = req.params;
        const transaction = await sequelize.transaction();
        try {
            const employee = await Employee.findByPk(employee_id);
            if (!employee) {
                ResponseUtil.badRequest(res, MessageUtil.notFoundInMasterMessage(`Employee ID: ${employee_id}`))
                return
            }

            const employeeProfile = await EmployeeProfile.findOne({ where: { employee_id }, transaction });
            if (employeeProfile) {
                await EmployeeProfile.destroy({ where: { employee_id }, transaction });
            }

            const education = await Education.findAll({ where: { employee_id }, transaction });
            if (education.length > 0) {
                await Education.destroy({ where: { employee_id }, transaction });
            }

            const employeeFamily = await EmployeeFamily.findAll({ where: { employee_id }, transaction });
            if (employeeFamily.length > 0) {
                await EmployeeFamily.destroy({ where: { employee_id }, transaction });
            }
            
            await Employee.destroy({ where: { id: employee_id }, transaction });

            await transaction.commit();
            ResponseUtil.ok(res, MessageUtil.deletedSuccessfully())
        } catch(err) {
            await transaction.rollback();
            LoggerUtil.error('EmployeeController.delete', err)
            ResponseUtil.internalServerErr(res, MessageUtil.errorDuringDelete())
        }
    }
}

module.exports = new EmployeeController()