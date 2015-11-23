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
    .when("/commande",{
        templateUrl:"orders/template/order.tpl.html",
        controller:"commandeCtrl",
        controllerAs: "ctrl"
    });
    

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
angular.module('pzWebApp.orders').controller('commandeCtrl', function (userService, paiementService, $localStorage, $location, $localStorage) {

    var self = this;
        
    self.title = "Commande";
    self.enLiv = false 
    $localStorage.order = []      
    
    self.type;
    self.adresse =  $localStorage.client.adresse

    console.log($localStorage.panierFinal.total)   

    this.saveForm = function(){  

        console.log(self.type)
        
        if(self.type == null){
            alert ("Merci d'indiquer un mode de retrait de la commande")
            return
        }

        $localStorage.order.id_client = $localStorage.client.id
        $localStorage.order.type = self.type
        $localStorage.order.total = $localStorage.panierFinal.total       

        console.log($localStorage.order)

        $location.path('/paiement')
    }

    this.enLivraison = function(i){       
       self.enLiv = true;
        console.log(self.enLiv)
      
    }

    this.surPlace = function(i){
        self.enLiv = false;
        console.log(self.enLiv)
    }

    this.aEmporter = function(i){
        self.enLiv = false;
        console.log(self.enLiv)
    }

    this.etat = function(){
        console.log(self.enLiv)
        return self.enLiv
    }

    this.actualise = function(){
        console.log("actualisation adresse client")
    }
     
     

})
;