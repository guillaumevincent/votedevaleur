(function () {
    'use strict';

    angular
        .module('app', [
            'ngRoute'
        ])
        .config(routesConfig);


    routesConfig.$inject = ['$routeProvider', '$locationProvider'];

    function routesConfig($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'static/html/components/index/index.html'
            });
        $locationProvider.html5Mode(true);
    }

})();
