// Déclaration du module 'orders'
angular.module('pzWebApp.orders', [
    'ngRoute',
    'pzWebApp.shared'
]);

// Configuration du module 'orders'
angular.module('pzWebApp.orders').config(function($routeProvider) {

    // TODO Définir les routes spécifiques au module 'orders' ici
    $routeProvider
    .when("/paiement",{
        templateUrl:"orders/template/paiement.tpl.html",
        controller:"paiementCtrl",
        controllerAs: "ctrl"
    })
    ;

});

// Contrôleur principal du module 'orders'
// Usage de la syntaxe 'controller as', pas besoin du '$scope'
angular.module('pzWebApp.orders').controller('paiementCtrl', function (userService, paiementService) {

    var self = this;
        
    self.title = "Paiement";
    paiementService.promesse.then(function () {
        
        
    }.bind(this))
    
    // ...

})
;