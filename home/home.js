// Déclaration du module 'home'
angular.module('pzWebApp.home', [
    'ngRoute',
    'pzWebApp.shared',
    'ngMap',
    'ngStorage'  
]);


// Configuration du module 'home'
angular.module('pzWebApp.home').config(function($routeProvider) {

    // TODO Définir les routes spécifiques au module 'home' ici
    $routeProvider
        .when("/home",{
            templateUrl:"home/template/home.tpl.html",
            controller:"homeCtrl",
            controllerAs: "ctrl"
        })
        .when("/info",{
            templateUrl:"home/template/info.tpl.html",
            controller:"infoCtrl",
            controllerAs: "ctrl"
        })
        .when("/panier",{
            templateUrl:"home/template/panier.tpl.html",
            controller:"panierCtrl",
            controllerAs: "ctrl"
        });

});

// Contrôleur principal du module 'home'
// Usage de la syntaxe 'controller as', pas besoin du '$scope'
angular.module('pzWebApp.home').controller('homeCtrl', function(userService) {

    var self = this;
    self.title = "Page Home";

});
angular.module('pzWebApp.home').controller('infoCtrl', function(userService) {

    var self = this;

    self.title = "Page information";

    var vm = this;

    vm.cities = {
      chicago: {population:2714856, position: [41.878113, -87.629798]},
      newyork: {population:8405837, position: [40.714352, -74.005973]},
      losangeles: {population:3857799, position: [34.052234, -118.243684]},
      vancouver: {population:603502, position: [49.25, -123.1]},
    }
    vm.getRadius = function(num) {
      return Math.sqrt(num) * 100;
    }


});

angular.module('pzWebApp.home').controller('panierCtrl', function(panierService,$scope, $localStorage){

    var self = this;  


    self.title = "Mon panier";
    self.datas


   panierService.product.then(function (product){        
        self.product = product.data.product
        self.menu = product.data.menu                         
    }.bind(this))
    
     $scope.save = function() {

                    $localStorage.data = [{"id": 1,"nom": "margarita","prix": 10,"type":"pizzas","taille":"XLarge","format": "","nombre" : 1 },
                    {"id": 1,"nom": "margarita","prix": 10,"type":"pizzas","taille":"XLarge","format": "","nombre" : 1 },
                    {"id": 1,"nom": "margarita","prix": 10,"type":"pizzas","taille":"XLarge","format": "","nombre" : 1 },
                    {"id": 1,"nom": "margarita","prix": 10}]
                    self.datas = $localStorage.data                                         
                }.bind(this)
 
     $scope.load = function() {
                
                            $scope.data = $localStorage.data 
                        
                                        
                } 
    
        

});

