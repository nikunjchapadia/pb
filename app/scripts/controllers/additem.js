'use strict';

angular.module('pbApp').
    controller('AddItemCtrl', ['$scope', '$http','$upload', function ($scope, $http, $upload) {
//        $scope.item = { name : undefined, brandName : undefined,
//                        itemType: undefined, color: undefined,
//                        realPrice : undefined,price : undefined
//                       };
        $scope.message = "Add New Item";
        $scope.item = $scope.item = { name: 'Bamboo Shoes', brandName: 'Bamboo',
            itemType: 'shoe', color: 'mint',
            realPrice: 50.00, price: 27.00
        };

        $scope.saveOrders = function () {
            console.log($scope.item);
            // take this one and save into db
        };

        $scope.loadPreviewImages = function () {
            //var url = "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=033e2f618063ad5e37d3f5bafd8b5c21&photoset_id=72157634587444986&extras=+license%2C+date_upload%2C+date_taken%2C+owner_name%2C+icon_server%2C+original_format%2C+last_update%2C+geo%2C+tags%2C+machine_tags%2C+o_dims%2C+views%2C+media%2C+path_alias%2C+url_sq%2C+url_t%2C+url_s%2C+url_m%2C+url_o&format=json&nojsoncallback=1&auth_token=72157644700009026-6e922b84bb102cbd&api_sig=ff93587d96ca9f2e2d35386cb4e17431";
            var url = "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=dfe23fe6f7bba7b041ccf9c713a4c54c&photoset_id=72157644744193312&extras=+license%2C+date_upload%2C+date_taken%2C+owner_name%2C+icon_server%2C+original_format%2C+last_update%2C+geo%2C+tags%2C+machine_tags%2C+o_dims%2C+views%2C+media%2C+path_alias%2C+url_sq%2C+url_t%2C+url_s%2C+url_m%2C+url_o&format=json&nojsoncallback=1&auth_token=72157644355448997-d7d0621fd0a859bc&api_sig=790b85b1865dcad9109771dc4bf8ef03";
            $http.get(url).
                success(function (data) {
                    $scope.images = [];
                    var photoset = data.photoset.photo;
                    _.each(photoset, function (e) {
                        var image = {name: e.name, url: e.url_m};
                        $scope.images.push(image);
                    });
                }).
                error(function (error) {
                    console.log(error);
                });
        };

        $scope.onFileSelect = function ($files) {
            _.each($files, function (file) {
                console.log(file);
//                $scope.upload = $upload.upload({
//                    url : '',
//                    file : file
//                }).
//                progress(function(e){
//                    console.log('% : ' + parseInt(100.0 * e.loaded / e.total));
//                }).
//                success(function(data,status,headrs,config){
//                    console.log(data);
//                });
            });
        };

    }]);
