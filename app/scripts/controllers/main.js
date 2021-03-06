'use strict';

angular.module('pbApp')
    .controller('MainCtrl', function ($scope, $http) {

        $http.get('/api/awesomeThings').success(function (awesomeThings) {
            $scope.awesomeThings = "";
        });

        $scope.getLoginStatus = function () {
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
                    $scope.expiresIn = response.authResponse.expiresIn;
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

        $scope.getCurrentUserInfo = function(){
            var fields = "id,name,picture,age_range,address,about,email,gender,cover,birthday,hometown,locale,location";
            var params = {
                fields : fields,
                access_token : $scope.accessToken
            }
            var url = "https://graph.facebook.com/me?" + $.param(params);
            console.log(url);
            $http.get(url).
                success(function(data){
                    console.log("GETCURRENTUSERINFO : ");
                    console.log(data);
                    $scope.user = data;
                }).
                error(function(error){
                    console.log(error);
                });
        }


    });
