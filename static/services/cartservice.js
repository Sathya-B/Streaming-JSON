(function () {
    'use strict';

    angular
        .module('cartService', [])
        .service('CartService', [CartService]);

    function CartService() {
        var service = {};

        service.cartItems = _cartItems;
        service.addToCart = _addToCart;
        service.removeFromCart = _removeFromCart;

        var cartItems = [];
        return service;

        function _cartItems() {
            return cartItems;
        }

        function _addToCart(item, qty) {
            var result = null;
            result = $.grep(cartItems, function (e) {
                return e.id == item.id;
            });
            if (result.length == 0) {
                item.quantity = qty
                cartItems.push(item);
            } else if (result.length == 1) {
                result[0].quantity = result[0].quantity + qty;
            }
        }

        function _removeFromCart(item) {
            for (var i = 0; i < cartItems.length; i++) {
                if (cartItems[i].id == item.id) {
                    cartItems.splice(i, 1);
                }
            }
        }

    }
})();