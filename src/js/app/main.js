require.config({
    baseUrl: './js',
    paths: {
        'jquery': 'vendor/jquery'
    },
    shim: {
    }
});
require([
    "angular",
    "app"
],
function (angular, app) {

    angular.bootstrap(document, [app['name']]);

});