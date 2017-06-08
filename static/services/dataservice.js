(function () {
    'use strict';

    angular
        .module('dataService', ['ngOboe'])
        .service('DataService', ['$http', '$filter', 'Oboe', DataService]);

    function DataService($http, $filter, Oboe) {
        var service = {};

        service.apiEnd = _apiEnd;
        service.getProducts = _getProducts;
        service.isLoading = _isLoading;
        service.listOfProducts = _listOfProducts;

        var products = [];
        var endOfStream = false;
        var skipcount = 0;
        var apibusy = false;

        return service;

        function _apiEnd() {
            return endOfStream;
        }

        function _getProducts(req, sort, limitcount) {
             if (req == 'start') {
                products = [];
                skipcount = 0;
            }

            if (apibusy == false) {
                apibusy = true;
                Oboe({
                    url: 'http://localhost:8000/api/products?sort=' + sort + '&limit=' + limitcount + '&skip=' + skipcount,
                    pattern: '{index}',
                    start: function (stream) {
                        stream.on('end', function (result) {
                            skipcount = skipcount + limitcount;
                            apibusy = false;
                        });
                        stream.on('done', function (parsedJSON) {
                            if (parsedJSON.id === undefined) {
                                endOfStream = true;
                            }
                            else {
                                formatData(parsedJSON);
                                apibusy = true;
                            }

                        })
                    },
                })
                    .then(function (result) {
                        apibusy = false;
                    }, function (error) {
                        console.log("error");
                    }, function (node) {
                        console.log("node");
                    });
            }
        }

        function _listOfProducts() {
            return products;
        }

        function _isLoading() {
            return apibusy;
        }

        function formatData(data) {
            var addeddate = $filter('date')(new Date(data.date), 'dd-MM-yyyy');
            var today = $filter('date')(new Date(), 'dd-MM-yyyy');
            var a = moment(addeddate, 'D/M/YYYY');
            var b = moment(today, 'D/M/YYYY');
            var diffDays = b.diff(a, 'days');
            if (diffDays < 8) {
                data.date = diffDays + " days ago"
            }
            else {
                data.date = "on " + addeddate;
            }
            data.price = "$" + (data.price / 100);
            data.height = data.size + 30;
            products.push(data);
        }

        function dateDiffInDays(a, b) {
            var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
            var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
            return Math.floor((utc2 - utc1) / _MS_PER_DAY);
        }
    }
})();

