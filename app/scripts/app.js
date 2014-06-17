'use strict';

angular.module('pbApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'angularFileUpload'
]).config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/main',
            controller: 'MainCtrl'
        })
        .when('/additem', {
            templateUrl: 'partials/additem',
            controller: 'AddItemCtrl'
        })
        .when('/edititem', {
            templateUrl: 'partials/edititem',
            controller: 'EditItemCtrl'
        })
        .when('/manage', {
            templateUrl: 'partials/manage',
            controller: 'ManageCtrl'
        })
        .when('/orders', {
            templateUrl: 'partials/orders',
            controller: 'OrdersCtrl'
        })
        .when('/dynamo', {
            templateUrl: 'partials/dynamo',
            controller: 'DynamoCtrl'
        })
        .otherwise({
            templateUrl: 'partials/main',
            controller: 'MainCtrl'
        });

    $locationProvider.html5Mode(true);
});
