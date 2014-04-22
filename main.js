// I use this a lot
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};
// Modern people
define('modernizr', [], Modernizr);
// We have to do this because everything is beautiful and everybody is happy
define("d3.global", ["d3"], function(_) {
    window.d3 = _;
});
// Config
require.config({
    noGlobal: true,
    baseUrl: 'js',
    paths: {
         'depend'               : "libs/requirejs-plugins/src/depend"
        ,'angular'              : "libs/angular/angular"
        ,'jquery'               : "libs/jquery/jquery"
        ,'jquery-migrate'       : "libs/jquery/jquery-migrate"
        ,'jstree'               : "clibs/jquery.jstree"
        ,'_'                    : "libs/underscore/underscore"
        ,'angular-ui'           : "libs/angular-ui-bootstrap-bower/ui-bootstrap-tpls.min"
        ,'angular-table'        : "clibs/ng-table/ng-table.src"
        ,'moment'               : "libs/moment/moment"
        ,'angular-moment'       : "libs/angular-moment/angular-moment"
        ,'angular-animate'      : "libs/angular-animate/angular-animate"
        ,"d3"                   : "libs/d3/d3"
        ,'picker'               : "libs/angular-pickadate.js/pickadate/picker"
        ,'angular-pickadate'    : "libs/angular-pickadate.js/script"
        ,"rickshaw"             : "libs/rickshaw/rickshaw"
        ,"nouislider"           : "libs/nouislider/jquery.nouislider"
        ,'jquery.datatables'    : "libs/datatables/media/js/jquery.dataTables"
        ,'jquery.dataTables.columnFilter': "clibs/jquery.dataTables.columnFilter"
        ,'angular-tagsinput'    : "libs/bootstrap-tagsinput/src/bootstrap-tagsinput-angular"
        ,'ace'                  : "libs/ace-builds/src-min-noconflict/ace"
        ,'ui-ace'               : "libs/angular-ui-ace/ui-ace.min"
    },
    shim: {
        // Core libs
         "angular"              : {exports: "angular"}
        // Plugins
        ,"rickshaw"             : ["d3.global"]
        ,"jquery.datatables"    : ["jquery"]
        ,"jquery.datatables.columnFilter"    : ["jquery", "jquery.datatables"]
        ,"jstree"               : ["jquery"]
        // Angulare Modules
        ,"angular-ui"           : ["angular"]
        ,"angular-table"        : ["angular"]
        ,"angular-animate"      : ["angular"]
        ,"angular-pickadate"    : ["angular", "jquery", "libs/angular-pickadate.js/pickadate/picker.date", "libs/angular-pickadate.js/pickadate/picker.time", "picker"]
        ,"angular-nouislider"   : ["angular", "jquery", "nouislider"]
        ,"angular-tagsinput"    : ["angular"]
        ,"angular-moment"       : ["angular", "moment", "clibs/moment"]
        ,"ui-ace"               : ["angular", "ace"]
    },
    priority: [
        "angular"
    ]
});
// Start
require([
    "angular",
    "modernizr",
    "login",
    "app/app"
],
function (angular, modernizr, login, app) {

    var loggedIn = angular.element(document.querySelector('meta[name=loggedIn]')).attr('content') == 'true';
    angular.element(document.querySelector('body')).removeClass('spacecp-loading spacecp-loading-huge');

    login.start(loggedIn, function() {
        angular.bootstrap(document, [app['name']]);
    });

});