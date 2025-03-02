require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');

const routes = require('./src/routes');
const { InfoFilter } = require('./src/middleware/RequestFilter');
const logger = require('./src/helper/LoggerUtil');
const sequelize = require('./src/helper/DBUtil');

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// register route filter
app.all('/*', InfoFilter);

// Middleware
app.use(bodyParser.json());

// register base path '/'
app.get('/', (req, res) => res.send(`${process.env.APP_NAME}-${process.env.APP_VERSION}`));

// register static file
app.use('/photo_profile', express.static('public/photo_profile'));

// register all route under '/api/v1'
app.use('/api/v1', routes);

// register error handler from Joi->Celebrate
app.use(errors());

const port = process.env.SERVER_PORT || 3000;

//sync database
sequelize
    .sync()
    .then(result => {
        app.listen(port, '0.0.0.0', () => {
            logger.info(`Server started, listening on port ${port}!`)
        });
    })
    .catch(err => console.log(err));