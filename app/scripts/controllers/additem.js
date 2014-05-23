'use strict';

angular.module('pbApp').
    controller('AddItemCtrl', ['$scope', '$http','$upload','$rootScope', function ($scope, $http, $upload,$rootScope) {
//        $scope.item = { name : undefined, brandName : undefined,
//                        itemType: undefined, color: undefined,
//                        realPrice : undefined,price : undefined
//                       };
        $scope.uploadedImages = [];
        $scope.message = "Add New Item";
        $scope.item = $scope.item = { name: 'Bamboo Shoes', brandName: 'Bamboo',
            itemType: 'shoe', color: 'mint',
            realPrice: 50.00, price: 27.00
        };

        $scope.saveOrder = function () {
            $scope.item.images = [];
            _.each($scope.uploadedImages,function(e){
                $scope.item.images.push(e);
            });
            console.log(JSON.stringify($scope.item));
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

        $scope.renderUploadedImages = function () {
//            if ($scope.uploadedImages && $scope.uploadedImages.length > 0) {
//                _.each($scope.uploadedImages,function(e){
//                    var image = {name: e.key, url: e.location};
//                    $scope.images.push(image);
//                });
//            }
        };


        $scope.onFileSelect = function ($files) {

            _.each($files, function (file) {
                console.log(file);
                $http.get('/api/s3Policy?mimeType='+ file.type).success(function(response) {
                    var s3Params = response;
                    $upload.upload({
                        url: 'https://pbcreative.s3.amazonaws.com/',
                        method: 'POST',
                        data: {
                            'key' : 's3UploadExample/'+ Math.round(Math.random()*10000) + '$$' + file.name,
                            'acl' : 'public-read',
                            'Content-Type' : file.type,
                            'AWSAccessKeyId': s3Params.AWSAccessKeyId,
                            'success_action_status' : '201',
                            'Policy' : s3Params.s3Policy,
                            'Signature' : s3Params.s3Signature
                        },
                        file: file
                    }).then(function(response) {
                        file.progress = parseInt(100);
                        if (response.status === 201) {
                            console.log(response.data);
                            var data = xml2json.parser(response.data), parsedData;
                            parsedData = {
                                location: data.postresponse.location,
                                bucket: data.postresponse.bucket,
                                key: data.postresponse.key,
                                etag: data.postresponse.etag
                            };
                            $scope.uploadedImages.push(parsedData);
                            console.log($scope.uploadedImages);
                        } else {
                            alert('Upload Failed');
                        }
                    }, null, function(evt) {
                        file.progress =  parseInt(100.0 * evt.loaded / evt.total);
                    });
                });
                console.log("Render images ")
            });
        };
    }]);
