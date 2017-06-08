
(function () {
    'use strict';

    angular
        .module('my-src', [])
        .directive('mySrc', ['$http', '$q', function ($http, $q) {
            var img = "";
            var imageobj = {};
            imageobj.data = "";
            return {
                restrict: 'A',
                link: function (scope, elem, attrs) {
                    getAd(imageobj).then(function (result) {
                        elem.attr('src', result.adlink);
                        imageobj.data = result.data;
                    });
                }
            };

            function getAd(img) {
                return asyncImageFetch().then(function (image) {
                    if (img.data == image.data) {
                        return getAd(img);
                    } else {
                        return image;
                    }
                });
            }

            function asyncImageFetch() {
                var image = {};
                var deferred = $q.defer();
                image.adlink = "/ad/?r=" + Math.floor((Math.random() * 1000));
                $http.get(image.adlink)
                    .then(function (result) {
                        image.data = result.data;
                        deferred.resolve(image);
                    }, function (error) {
                        console.log(error);
                    });
                return deferred.promise;
            }
        }]);
})();