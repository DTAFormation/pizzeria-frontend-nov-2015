// Déclaration du module 'products'
angular.module('pzWebApp.products', [
    'ngRoute',
    'pzWebApp.shared'
]);

// Configuration du module 'products'
angular.module('pzWebApp.products').config(function($routeProvider) {

    // TODO Définir les routes spécifiques au module 'products' ici
    $routeProvider
        .when("/details_pizza",{
            templateUrl:"products/template/details_pizza.tpl.html",
            controller:"details_pizzaCtrl",
            controllerAs: "ctrl"
        });
});

// Contrôleur principal du module 'products'
// Usage de la syntaxe 'controller as', pas besoin du '$scope'
angular.module('pzWebApp.products').controller('details_pizzaCtrl', function(userService) {

    var self = this;

    self.title = "Page Détails pizza";

    // ...

});
