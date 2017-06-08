(function () {
    'use strict';
    
    angular
        .module('asciiApp', ['infinite-scroll', 'dataService', 'cartService', 'my-src'])
        .controller('asciiController', function ($filter, $rootScope, DataService, CartService) {

            var vm = this;
            vm.ascii = {};
            vm.addToCart = _addToCart;
            vm.ascii.totalcartvalue = _totalCartValue;
            vm.isApiEnd = _isApiEnd;
            vm.isHidden = _isHidden;
            vm.loadMore = _loadMore;
            vm.removeFromCart = _removeFromCart;
            vm.showCart = _showCart;
            vm.sortList = _sortList;

            vm.cart = {};
            vm.ascii.products = [];
            vm.cart.cartitems = [];

            vm.ascii.sort = 'id';
            var limitCount = 20;

            function _addToCart(item, qty) {
                CartService.addToCart(item, qty);
            }

            function _totalCartValue() {
                return CartService.totalCartValue();
            }

            function _isApiEnd() {
                return DataService.apiEnd();
            }

            function _isHidden() {
                return DataService.isLoading();
            }

            function _loadMore() {
                if (!DataService.apiEnd())
                    DataService.getProducts('cont', vm.ascii.sort, limitCount);
            }

            function _removeFromCart(item) {
                CartService.removeFromCart(item);
            }

            function _showCart() {
                angular.element('#update-cart').modal('show');
            }

            function _sortList() {
                DataService.getProducts('start', vm.ascii.sort, limitCount);
                vm.ascii.products = DataService.listOfProducts();
            }

            $rootScope.fullpage = function () {
                var bodyclass = DataService.isLoading() ? 'stop-scrolling' : '';
                return bodyclass;
            }

            var init = function () {
                vm.cart.cartitems = CartService.cartItems();
                DataService.getProducts('start', vm.ascii.sort, limitCount);
                vm.ascii.products = DataService.listOfProducts();
            }

            init();
        });
})();