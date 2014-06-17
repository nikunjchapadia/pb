'use strict';

var api = require('./controllers/api'),
    index = require('./controllers'),
    aws = require('./controllers/aws');

/**
 * Application routes
 */
module.exports = function (app) {

    // Server API Routes
    app.route('/api/awesomeThings').get(api.awesomeThings);
    app.get('/api/config', api.getClientConfig);
    app.get('/api/s3Policy', aws.getS3Policy);

    //app.route('/api/dynamo/list').get(api.listTables);
    app.get('/api/list', api.listTables);
    app.get('/api/describe', api.describeTable);

    // All undefined api routes should return a 404
    app.route('/api/*').get(function (req, res) {
        res.send(404);
    });

    // All other routes to use Angular routing in app/scripts/app.js
    app.route('/partials/*').get(index.partials);
    app.route('/*').get(index.index);


};

