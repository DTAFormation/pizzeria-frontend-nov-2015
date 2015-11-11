angular.module('pzWebApp', [
    'ui.utils',
    'ngRoute',
    'ngAnimate',
    'pzWebApp.shared',
    'pzWebApp.home'
]);

angular.module('pzWebApp').config(function($routeProvider) {

    // Ici, les routes générales de l'application
    // Pas de route spécifique ici !
    // Elles doivent être déclarées dans des sous-modules (comme 'home')
    $routeProvider.otherwise({redirectTo:'/home'});
});

angular.module('pzWebApp').run(function($rootScope) {

});

// Contrôleur qui pilote globalement l'application
angular.module('pzWebApp').controller("pzWebAppCtrl", function() {
    this.title = "Pizzaria Web";
});
