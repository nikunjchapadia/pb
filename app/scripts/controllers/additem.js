'use strict';

angular.module('pbApp').
    controller('AddItemCtrl', ['$scope', '$http','$upload','$rootScope', function ($scope, $http, $upload,$rootScope) {
        $scope.uploadedImages = [];
        $scope.title = "Add New Item";
        $scope.item = $scope.item = {
            name: 'Bamboo Shoes',
            brandName: 'Bamboo',
            itemType: 'shoe',
            color: 'mint',
            realPrice: 50.00,
            price: 27.00
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

        $scope.saveOrder = function () {
            $scope.item.images = [];
            _.each($scope.uploadedImages,function(e){
                $scope.item.images.push(e);
            });
            console.log(JSON.stringify($scope.item));
            // take this one and save into db
        };

    }]);
