'use strict';

var filters = angular.module('filters', []);

filters.filter('currency', ['$rootScope', function($rootScope) {
    return function(number) {
        var separator = ' ';
        var decimalPoint = ',';
        var monney = ' €';
        console.log('monnaie');
        if($rootScope.language == 'en') {
            separator = ',';
            decimalPoint = '.';
            monney = '$';
        }
        
        var parts = number.toString().split(".");
        return parts[0].replace(/\B(?=(\d{3})+(?=$))/g, separator) + (parts[1] ? decimalPoint + parts[1] : '') + money;
    }
}]);