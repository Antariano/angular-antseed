define([
    "angular"
    ,"app/controllers/index"
    ,"app/services/index"
    ,"app/filters/index"
    ,"app/directives/index"
], function (ng) {

    var $this = ng.module('app', [
        'app.services'
        ,'app.controllers'
        ,'app.filters'
        ,'app.directives'
    ]);

    $this.run(["$rootScope", function ($rootScope) {

        /**
         * Alternative to AngularJS' standard apply().
         * Useful for when there's a lot of applying going on, prevents errors.
         *
         * @param  {Function} fn The function passed to apply()
         */
        $scope.safeApply = function(fn) {
            var phase = this.$root.$$phase;
            if(phase == '$apply' || phase == '$digest') {
                if(fn && (typeof(fn) === 'function')) {
                    fn();
                }
            } else {
                this.$apply(fn);
            }
        };

    }]);

    return $this;

});