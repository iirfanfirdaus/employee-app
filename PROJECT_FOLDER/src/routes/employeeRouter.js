const { celebrate } = require('celebrate');
const express = require('express');
const formidableMiddleware = require('express-formidable');

const router = express.Router();

const Controller = require('../controller/EmployeeController');
const Schema = require('../schema/EmployeeSchema');

const formFieldsToBody = async (req, res, next) => {
    req.body = req.fields
    next()
}

router.post('/',
    formidableMiddleware({ multiples: false }),
    formFieldsToBody,
    Schema.createPars,
    celebrate({ body: Schema.createSchema }),
    Controller.create);

router.get('/', celebrate({ query: Schema.searchSchema }), Controller.search);

router.get('/report', celebrate({ query: Schema.searchSchema }), Controller.report);

router.get('/:employee_id', celebrate({ params: Schema.findSchema }), Controller.find);

router.put('/:employee_id',
    formidableMiddleware({ multiples: false }),
    formFieldsToBody,
    celebrate({ params: Schema.findSchema, body: Schema.updateSchema }),
    Controller.update);

router.delete('/:employee_id', celebrate({ params: Schema.findSchema }), Controller.delete);

module.exports = router;