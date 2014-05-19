'use strict';

angular.module('pbApp')
    .controller('NavbarCtrl', function ($scope, $location) {
        $scope.menu = [
            {
                'title': 'pb',
                'link': '/'
            }
        ];

        $scope.isActive = function (route) {
            return route === $location.path();
        };

        $scope.getUserInfo = function () {
            $scope.userId = undefined;
            $scope.accessToken = undefined;
            FB.getLoginStatus(function(response) {
                if (response.status === 'connected') {
                    // the user is logged in and has authenticated your
                    // app, and response.authResponse supplies
                    // the user's ID, a valid access token, a signed
                    // request, and the time the access token
                    // and signed request each expire
                    $scope.userId = response.authResponse.userID;
                    $scope.accessToken = response.authResponse.accessToken;
                    console.log($scope.userId);
                    console.log($scope.accessToken);
                } else if (response.status === 'not_authorized') {
                    // the user is logged in to Facebook,
                    // but has not authenticated your app
                } else {
                    // the user isn't logged in to Facebook.
                }
            });
        };
    });
