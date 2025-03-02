const { Joi } = require('celebrate');
const Constants = require('../helper/Constants');

module.exports = {
    findSchema: Joi.object().keys({
        employee_id: Joi.string().max(50).required(),
    }).unknown(true),
    findSpecificSchema: Joi.object().keys({
        employee_id: Joi.string().max(50).required(),
        education_id: Joi.string().max(50).required(),
    }).unknown(true),
    createSchema: Joi.object().keys({
        name: Joi.string().required(),
        level: Joi.string().valid(...Object.values(Constants.EDUCATION_LEVEL)).required(),
        description: Joi.string().max(255).required(),
    }).unknown(false),
    updateSchema: Joi.object().keys({
        name: Joi.string().required(),
        level: Joi.string().valid(...Object.values(Constants.EDUCATION_LEVEL)).required(),
        description: Joi.string().max(255).required(),
    }).unknown(false),
}