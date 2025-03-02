const { Joi } = require('celebrate')

const PagingBaseSchema = Joi.object().keys({
    page: Joi.number().integer().default(1).min(1).optional(),
    per_page: Joi.number().integer().default(10).min(1).optional(),
    order_by: Joi.string().allow("").optional(),
    dir: Joi.string().allow("").optional()
})

module.exports = { PagingBaseSchema }