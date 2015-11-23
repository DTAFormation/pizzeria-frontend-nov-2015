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
angular.module('pzWebApp.orders').controller('paiementCtrl', function (userService, paiementService, $localStorage, $location) {

    var self = this;

    self.type;
        
    self.title = "Paiement";

    if(!$localStorage.panierFinal){
         alert ("aucune commande en cours")
          $location.path('/')
    }

    paiementService.promesse.then(function () {        
        
    }.bind(this))


    this.paiementLiquide= function (){        
        self.type = 'LIQUIDE'
        console.log(self.type)
    }
    this.paiementCarte = function(){         
         self.type = 'CARTE'
         console.log(self.type)
    }

    this.paiementLigne= function(){        
        self.type = 'EN_LIGNE'
        console.log(self.type)
    }

    this.saveForm = function(){
        if(!self.type){
            alert ("Selectionner mode de paiment")
            return
        }

       $localStorage.order.paiement = self.type
       $localStorage.order.paye = false
       $localStorage.order.etat = 'EN_COURS'
       console.log($localStorage.order)

    }
    
    

})
angular.module('pzWebApp.orders').controller('commandeCtrl', function (userService, paiementService, $localStorage, $location, $localStorage) {

    var self = this;
        
    self.title = "Commande";
    self.enLiv = false 
    $localStorage.order = []      
    
    self.type;
    self.adresse =  $localStorage.client.adresse     


    if(!$localStorage.panierFinal){
         alert ("aucune commande en cours")
          $location.path('/')
    }


    this.saveForm = function(){  

        console.log(self.type)
        
        if(self.type == null){
            alert ("aucune commande en cours")
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