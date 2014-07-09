require([
    "angular",
    "app/app"
],
function (angular, app) {

    angular.bootstrap(document, [app['name']]);

});
