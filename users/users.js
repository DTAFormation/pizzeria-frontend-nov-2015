// Déclaration du module 'users'
angular.module('pzWebApp.users', [
    'ngRoute',
    'pzWebApp.shared'
]);

// Configuration du module 'users'
angular.module('pzWebApp.users').config(function($routeProvider) {

    // TODO Définir les routes spécifiques au module 'users' ici
    $routeProvider
        .when("/inscription",{
            templateUrl:"users/template/inscription.tpl.html",
            controller:"inscriptionCtrl",
            controllerAs: "ctrl"
        })
        .when("/edition",{
            templateUrl:"users/template/edition.tpl.html",
            controller:"editionCtrl",
            controllerAs: "ctrl"
        });
});

// Contrôleur principal du module 'users'
// Usage de la syntaxe 'controller as', pas besoin du '$scope'
angular.module('pzWebApp.users').controller('inscriptionCtrl', function(userService, inscriptionService, $location) {
    function handleResponse(response) {
        return response.data
    }

    var self = this;

    self.title = "Page d'inscription";

    this.saveForm = function () {
		if (this.inscriptionForm.$invalid) {
			alert('Un champs est vide ou invalide !')
			return
		}        
        //Redirection vers le home
        inscriptionService.promessePost(this.client) .then(function () {
				$location.path('/')
			});
     }

});

angular.module('pzWebApp.users').controller('editionCtrl', function(userService, editionService,$location) {
    
    var self = this;

    self.title = "Page d'edition";
    
    
     editionService.promesseGet.then(function (client) {
         console.log("client : " + client)
            self.client =client
        }.bind(this))
        
     this.saveForm = function () {
		if (this.editionForm.$invalid) {
			alert('Un champs est vide ou invalide !')
			return
		}
        //Redirection vers le home
        editionService.promessePut(this.client)
            .then(function () {
				$location.path('/')
			});
     }
});
