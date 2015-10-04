(function () {
    'use strict';

    angular
        .module('app', [
            'ngRoute'
        ])
        .config(routesConfig);


    routesConfig.$inject = ['$routeProvider'];

    function routesConfig($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'static/html/components/index/index.html'
            })
            .when('/questions/', {
                templateUrl: 'static/html/components/questions/questions.html'
            })
            .when('/new/questions/:id/votes/', {
                templateUrl: 'static/html/components/votes/newVote.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    }

})();
