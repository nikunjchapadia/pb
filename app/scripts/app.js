'use strict';

angular.module('pbApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
]).config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/main',
            controller: 'MainCtrl'
        })
        .when('/additem', {
            templateUrl: 'partials/addnewitem',
            controller: 'AddItemCtrl'
        })
        .otherwise({
            templateUrl: 'partials/main',
            controller: 'MainCtrl'
        });

    $locationProvider.html5Mode(true);
});
