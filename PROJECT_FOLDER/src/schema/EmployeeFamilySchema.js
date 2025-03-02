const { Joi } = require('celebrate');
const Constants = require('../helper/Constants');

module.exports = {
    findSchema: Joi.object().keys({
        employee_id: Joi.string().max(50).required(),
    }).unknown(true),
    findSpecificSchema: Joi.object().keys({
        employee_id: Joi.string().max(50).required(),
        family_id: Joi.string().max(50).required(),
    }).unknown(true),
    createSchema: Joi.object().keys({
        name: Joi.string().max(50).required(),
        identifier: Joi.string().max(50).required(),
        job: Joi.string().max(50).optional(),
        place_of_birth: Joi.string().max(50).optional(),
        date_of_birth: Joi.date().optional(),
        religion: Joi.string().valid(...Object.values(Constants.RELIGION)).required(),
        is_life: Joi.boolean().required(),
        is_divorced: Joi.boolean().required(),
        relation_status: Joi.string().valid(...Object.values(Constants.RELATION_STATUS)).required(),
    }).unknown(false),
    updateSchema: Joi.object().keys({
        name: Joi.string().max(50).required(),
        identifier: Joi.string().max(50).required(),
        job: Joi.string().max(50).optional(),
        place_of_birth: Joi.string().max(50).optional(),
        date_of_birth: Joi.date().optional(),
        religion: Joi.string().valid(...Object.values(Constants.RELIGION)).required(),
        is_life: Joi.boolean().required(),
        is_divorced: Joi.boolean().required(),
        relation_status: Joi.string().valid(...Object.values(Constants.RELATION_STATUS)).required(),
    }).unknown(false),
}