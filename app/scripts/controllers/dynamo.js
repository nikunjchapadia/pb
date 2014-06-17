
angular.module('pbApp').
    controller('DynamoCtrl', ['$scope', '$http', function ($scope, $http) {
        $scope.title = "Dynamo Experiment";
        $scope.data = [];

        $scope.listTables = function(){
            console.log("List tables : dynamo.js");
            var url = "/api/list?";
            $http.get(url).
                success(function (data) {
                    console.log(data);
                }).
                error(function (error) {
                    console.log(error);
                });
        };

        $scope.describeTable = function () {
            $http.get("/api/describe?").
                success(function (data) {
                    console.log(data);
                }).
                error(function (error) {
                    console.log(error);
                });
        };
    }]);