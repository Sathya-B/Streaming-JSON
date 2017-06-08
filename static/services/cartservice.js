(function () {
    'use strict';

    angular
        .module('cartService', [])
        .service('CartService', [CartService]);

    function CartService() {
        var service = {};

        service.cartItems = _cartItems;
        service.addToCart = _addToCart;
        service.totalCartValue = _totalCartValue;
        service.removeFromCart = _removeFromCart;

        var cartItems = [];
        var totalCartValue = 0;
        return service;

        function _cartItems() {
            return cartItems;
        }

        function _totalCartValue() {
            return totalCartValue;
        }

        function _addToCart(item, qty) {
            var result = null;
            result = $.grep(cartItems, function (e) {
                return e.id == item.id;
            });
            if (result.length == 0) {
                item.quantity = qty
                cartItems.push(item);
                totalCartValue = parseFloat(totalCartValue) + Number((item.price.substring(1)) * qty);
                totalCartValue = totalCartValue.toFixed(2);
            } else if (result.length == 1) {
                result[0].quantity = result[0].quantity + qty;
                totalCartValue = parseFloat(totalCartValue) + Number((result[0].price.substring(1)) * qty);
                totalCartValue = totalCartValue.toFixed(2);
            }
        }

        function _removeFromCart(item) {
            for (var i = 0; i < cartItems.length; i++) {
                if (cartItems[i].id == item.id) {
                    cartItems.splice(i, 1);
                    totalCartValue = parseFloat(totalCartValue) - Number((item.price.substring(1)) * item.quantity);
                    totalCartValue = totalCartValue.toFixed(2);
                }
            }
        }

    }
})();