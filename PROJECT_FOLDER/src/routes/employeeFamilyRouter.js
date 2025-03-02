const { celebrate } = require('celebrate');
const express = require('express');
const router = express.Router();

const Controller = require('../controller/EmployeeFamilyController');
const Schema = require('../schema/EmployeeFamilySchema');

router.post('/:employee_id', celebrate({ params: Schema.findSchema }, { body: Schema.createSchema }), Controller.create);

router.put('/:employee_id/:family_id', celebrate({ params: Schema.findSpecificSchema, body: Schema.updateSchema }), Controller.update);

router.delete('/:employee_id/:family_id', celebrate({ params: Schema.findSpecificSchema }), Controller.delete);

module.exports = router;