// Déclaration du module 'users'
angular.module('pzWebApp.users', [
    'ngRoute',
    'pzWebApp.shared'
]);

// Configuration du module 'users'
angular.module('pzWebApp.users').config(function ($routeProvider) {

    // TODO Définir les routes spécifiques au module 'users' ici
    $routeProvider
        .when("/inscription", {
            templateUrl: "users/template/inscription.tpl.html",
            controller: "inscriptionCtrl",
            controllerAs: "ctrl"
        })
        .when("/edition", {
            templateUrl: "users/template/edition.tpl.html",
            controller: "editionCtrl",
            controllerAs: "ctrl"
        })
        .when("/connexion", {
            templateUrl: "users/template/connexion.tpl.html",
            controller: "connexionCtrl",
            controllerAs: "ctrl"
        }).when("/validation", {
            templateUrl: "users/template/validation.tpl.html",
            controller: "validationCtrl",
            controllerAs: "ctrl"
        });
});

// Contrôleur principal du module 'users'
// Usage de la syntaxe 'controller as', pas besoin du '$scope'
angular.module('pzWebApp.users').controller('inscriptionCtrl', function (userService, inscriptionService, $location) {
    function handleResponse(response) {
        return response.data
    }

    var self = this;

    self.title = "Page d'inscription";
    self.response = null;

    this.saveForm = function () {
        if (this.inscriptionForm.$invalid) {
            alert('Un champs est vide ou invalide !')
            return
        }
        self.client = this.client;
        inscriptionService.promessePost(this.client)
            .then(function (reponse) {
                userService.login(reponse.data);
                //$location.path('/')
            }, function (reason) {
                if (reason.status == 400)
                    alert(reason.data);
                else
                    alert('Une erreur est intervenue')
            }
                );
    }

});

angular.module('pzWebApp.users').controller('editionCtrl', function (userService, editionService, $location, $localStorage) {

    var self = this;

    self.title = "Page d'edition";
    self.client = {};
    angular.copy($localStorage.client, self.client);
    self.change = false;
    self.login = self.client.login;
    self.mdp = self.client.mdp;

    function putClient(client) {
        editionService.promessePut(client)
            .then(function () {
                $localStorage.client = self.client
                alert("Vos informations personnelles ont bien été mises à jour.")
                $location.path('/')
            });
    }

    this.saveForm = function () {
        if (this.editionForm.$dirty) {

            if (this.editionForm.$invalid) {
                alert('Un champs est vide ou invalide !')
                return
            }
            var confirmMessage = undefined
            if (this.client.login != self.login) {
                confirmMessage = "Voulez-vous vraiment modifier votre login ?"
            }

            if (this.client.mdp != self.mdp) {
                if (confirmMessage) {
                    confirmMessage = confirmMessage.replace("?", "et votre mdp ?")
                } else {
                    confirmMessage = "Voulez-vous vraiment modifier votre mdp ?"
                }
            }

            if (confirmMessage) {
                if (confirm(confirmMessage)) {
                    putClient(this.client)
                } else {
                    self.client.login = self.login;
                    self.client.mdp = self.mdp;
                }
            } else {
                putClient(this.client)
            }
        }
    }
});

angular.module('pzWebApp.users').controller('connexionCtrl', function (userService, connexionService, $location) {

    var self = this;

    self.title = "Page de connexion";
    self.client = ""
    this.saveForm = function () {
        if (this.connexionForm.$invalid) {
            alert('Un champs est vide ou invalide !')
            return
        }
        //Redirection vers le home
        connexionService.promessePut(this.login, this.mdp)
            .then(function (response) {
                userService.login(response.data);
                $location.path('/');
            }, function (reason) {
                if (reason.status == 400)
                    alert(reason.data);
                else
                    alert('Une erreur est intervenue')
            });
    }

});

angular.module('pzWebApp.users').controller('validationCtrl', function (userService, validationService, $location, $routeParams) {

    var self = this;
    self.id = $routeParams.id
    self.hash = $routeParams.hash
    self.information =""
    self.title = "Page de validation";
    
    
    validationService.promessePut(self.id, self.hash)
        .then(function (response) {
            self.information = "Votre compte a bien été validé."
            userService.login(response.data);
        }, function (reason) {
            if (reason.status == 400) {
                self.information=reason.data               
            }
            else {                
                alert('Une erreur est intervenue')
            }
        });

});