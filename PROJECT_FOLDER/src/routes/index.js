const { Router } = require('express');

const routes = Router();

routes.use('/employee', require('./employeeRouter'));
routes.use('/employee-education', require('./educationRouter'));
routes.use('/employee-family', require('./employeeFamilyRouter'));

module.exports = routes