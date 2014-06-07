'use strict';
var express = require('express');


/**
 * Main application file
 */

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./lib/config/config');

// Setup Express
var app = express();
require('./lib/config/express')(app);
require('./lib/routes')(app);

// Start server
app.listen(config.port, config.ip, function () {
  console.log('Express server listening on %s:%d, in %s mode', config.ip, config.port, app.get('env'));
});

// configure dynamo db
var ddb = require('dynamodb').ddb(
    {
        accessKeyId: 'AKIAJ4HSSZEK5MXW2B6Q',
        secretAccessKey: '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',
        endpoint : 'dynamodb:us-west-2.amazonaws.com'
    }
);
//console.log(ddb);
ddb.describeTable('admin.tem', function(err, res) {
    console.log(err);
    console.log(res);
});
console.log(ddb.listTables({}, function(err, res) {}));

// Expose app
exports = module.exports = app;
