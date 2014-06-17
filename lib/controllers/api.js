'use strict';

var config = require('../config/aws.json');
var ddb = require('dynamodb').ddb({ accessKeyId: config.accessKeyId, secretAccessKey: config.secretAccessKey });
/**
 * Get awesome things
 */
exports.awesomeThings = function(req, res) {
  res.json([
    {
      name : 'HTML5 Boilerplate',
      info : 'HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.',
      awesomeness: 10
    }, {
      name : 'AngularJS',
      info : 'AngularJS is a toolset for building the framework most suited to your application development.',
      awesomeness: 10
    }, {
      name : 'Karma',
      info : 'Spectacular Test Runner for JavaScript.',
      awesomeness: 10
    }, {
      name : 'Express',
      info : 'Flexible and minimalist web application framework for node.js.',
      awesomeness: 10
    }
  ]);
};

exports.getClientConfig = function (req, res, next) {
    return res.json(200, {
        awsConfig: {
            bucket: config.bucket
        }
    });
};

exports.listTables = function(req,res){
    console.log("Listing tables : api.js");
    ddb.listTables({}, function(err, data) {
        if (err) {
            console.log(err);
            return res.send(500, err);
        } else {
            console.log('ListTable:');
            console.log(data);
            return res.send(200, data);
        }
    });
};

exports.describeTable = function(req,res){
    console.log("describe table");
    ddb.describeTable('admin.item', function(err, data) {
        if (err) {
            console.log(err);
            return res.send(500, err);
        } else {
            console.log('DescribeTable:');
            console.log(data);
            res.send(200,data);
        }
    });
};


