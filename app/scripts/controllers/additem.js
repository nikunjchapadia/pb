'use strict';

angular.module('pbApp').
    controller('AddItemCtrl', function ($scope, $http) {
//        $scope.item = { name : undefined, brandName : undefined,
//                        itemType: undefined, color: undefined,
//                        realPrice : undefined,price : undefined
//                       };
        $scope.message = "Add New Item";
        $scope.item = $scope.item = { name : 'Bamboo Shoes', brandName : 'Bamboo',
            itemType: 'shoe', color: 'mint',
            realPrice : 50.00,price : 27.00
        };

        $scope.saveOrders = function () {
            console.log($scope.item);
            // take this one and save into db
        };
    });
