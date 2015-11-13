angular.module('pzWebApp.info', [
    'ngRoute',
    'pzWebApp.shared'
]);


angular.module('pzWebApp.info').config(function($routeProvider) {

    $routeProvider
        .when("/info",{
            templateUrl:"home/template/info.tpl.html",
            controller:"infoCtrl",
            controllerAs: "ctrl"
        });
});


angular.module('pzWebApp.info').controller('infoCtrl', function(userService) {

    var self = this;

    self.title = "Page information";


});