const ResponseUtil = require('../helper/ResponseUtil');
const LoggerUtil = require('../helper/LoggerUtil');
const StringUtil = require('../helper/StringUtil');
const MessageUtil = require('../helper/MessageUtil');
const db = require('../model');
const Employee = db.employee;
const EmployeeProfile = db.employeeProfile;
const Education = db.education;
const EmployeeFamily = db.employeeFamily;

class EducationController {
    create = async(req, res) => {
        const body = req.body;
        const { employee_id } = req.params;
        try {
            const employee = await Employee.findByPk(employee_id);
            if (!employee) {
                ResponseUtil.badRequest(res, MessageUtil.notFoundInMasterMessage(`Employee ID: ${employee_id}`))
                return
            }

            // store data
            body.employee_id = employee_id;
            StringUtil.addIdentity(body, new Date(), body.name, true);
            await Education.create(body);

            const result = await Employee.findByPk(employee.id, {
                include: [
                    { model: EmployeeProfile, as: 'profile' },
                    { model: Education, as: 'education' },
                    { model: EmployeeFamily, as: 'family' }
                ]
            });
            ResponseUtil.ok(res, MessageUtil.savedSuccessfully(), result)
        } catch(err) {
            LoggerUtil.error('EducationController.create', err)
            ResponseUtil.internalServerErr(res, MessageUtil.errorDuringSave())
        }
    }

    update = async(req, res) => {
        const { employee_id, education_id } = req.params;
        const body = req.body;
        try {
            const employee = await Employee.findByPk(employee_id);
            if (!employee) {
                ResponseUtil.badRequest(res, MessageUtil.notFoundInMasterMessage(`Employee ID: ${employee_id}`))
                return
            }

            const education = await Education.findByPk(education_id);
            if (!education) {
                ResponseUtil.badRequest(res, MessageUtil.notFoundInMasterMessage(`Education ID: ${education_id}`))
                return
            }

            // update data
            StringUtil.addIdentity(body, new Date(), employee.name);
            await Education.update(body, { where: { id: education_id } });

            const result = await Employee.findByPk(employee.id, {
                include: [
                    { model: EmployeeProfile, as: 'profile' },
                    { model: Education, as: 'education' },
                    { model: EmployeeFamily, as: 'family' }
                ]
            });
            ResponseUtil.ok(res, MessageUtil.updatedSuccessfully(), result)
        } catch(err) {
            LoggerUtil.error('EducationController.update', err)
            ResponseUtil.internalServerErr(res, MessageUtil.errorDuringSave())
        }
    }

    delete = async(req, res) => {
        const { employee_id, education_id } = req.params;
        try {
            const employee = await Employee.findByPk(employee_id);
            if (!employee) {
                ResponseUtil.badRequest(res, MessageUtil.notFoundInMasterMessage(`Employee ID: ${employee_id}`))
                return
            }

            const education = await Education.findByPk(education_id);
            if (!education) {
                ResponseUtil.badRequest(res, MessageUtil.notFoundInMasterMessage(`Education ID: ${education_id}`))
                return
            }

            await Education.destroy({ where: { id: education_id } });
            ResponseUtil.ok(res, MessageUtil.deletedSuccessfully())
        } catch(err) {
            LoggerUtil.error('EducationController.delete', err)
            ResponseUtil.internalServerErr(res, MessageUtil.errorDuringDelete())
        }
    }
}

module.exports = new EducationController()