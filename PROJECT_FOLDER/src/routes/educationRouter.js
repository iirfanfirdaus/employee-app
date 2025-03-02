const { celebrate } = require('celebrate');
const express = require('express');
const router = express.Router();

const Controller = require('../controller/EducationController');
const Schema = require('../schema/EducationSchema');

router.post('/:employee_id', celebrate({ params: Schema.findSchema }, { body: Schema.createSchema }), Controller.create);

router.put('/:employee_id/:education_id', celebrate({ params: Schema.findSpecificSchema, body: Schema.updateSchema }), Controller.update);

router.delete('/:employee_id/:education_id', celebrate({ params: Schema.findSpecificSchema }), Controller.delete);

module.exports = router;