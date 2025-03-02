const { Joi } = require('celebrate');
const { PagingBaseSchema } = require('./BaseSchema');
const Constants = require('../helper/Constants');

const createPars = async (req, res, next) => {
    req.body.education = JSON.parse(req.body.education);
    req.body.family = JSON.parse(req.body.family);
    return next();
};

module.exports = {
    createPars,
    searchSchema: PagingBaseSchema.keys({
        nik: Joi.string().allow("").max(50).optional(),
        name: Joi.string().allow("").max(50).optional(),
    }).unknown(true),
    findSchema: Joi.object().keys({
        employee_id: Joi.string().max(50).required(),
    }).unknown(true),
    createSchema: Joi.object().keys({
        nik: Joi.string().max(50).required(),
        name: Joi.string().max(50).required(),
        is_active: Joi.boolean().required(),
        start_date: Joi.date().required(),
        end_date: Joi.date().required(),
        place_of_birth: Joi.string().max(50).required(),
        date_of_birth: Joi.date().required(),
        gender: Joi.string().valid(...Object.values(Constants.GENDER)).required(),
        is_married: Joi.boolean().required(),
        education: Joi.array().items({
            name: Joi.string().required(),
            level: Joi.string().valid(...Object.values(Constants.EDUCATION_LEVEL)).required(),
            description: Joi.string().max(255).required(),
        }),
        family: Joi.array().items({
            name: Joi.string().max(50).required(),
            identifier: Joi.string().max(50).required(),
            job: Joi.string().max(50).optional(),
            place_of_birth: Joi.string().max(50).optional(),
            date_of_birth: Joi.date().optional(),
            religion: Joi.string().valid(...Object.values(Constants.RELIGION)).required(),
            is_life: Joi.boolean().required(),
            is_divorced: Joi.boolean().required(),
            relation_status: Joi.string().valid(...Object.values(Constants.RELATION_STATUS)).required(),
        }),
    }).unknown(false),
    updateSchema: Joi.object().keys({
        nik: Joi.string().max(50).required(),
        name: Joi.string().max(50).required(),
        is_active: Joi.boolean().required(),
        start_date: Joi.date().required(),
        end_date: Joi.date().required(),
        place_of_birth: Joi.string().max(50).required(),
        date_of_birth: Joi.date().required(),
        gender: Joi.string().valid(...Object.values(Constants.GENDER)).required(),
        is_married: Joi.boolean().required(),
    }).unknown(false),
}