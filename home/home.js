// Déclaration du module 'home'
angular.module('pzWebApp.home', [
    'ngRoute',
    'pzWebApp.shared',
    'ngMap'
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
angular.module('pzWebApp.home').controller('infoCtrl', function(userService, $sessionStorage) {
    console.log($sessionStorage.products)
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

angular.module('pzWebApp.home').controller('panierCtrl', function(panierService,$localStorage, $sessionStorage, $routeParams, $scope){

    var self = this;
    

    self.title = "Mon panier";

    
    self.data = [];
    self.dataprovi= [];
    self.datafinal = [];

    self.product = null
    self.iterator = 0
    self.iterator2 = 1
    self.datai = 0
    
    console.log($localStorage.products.length)
    
    if($localStorage.products.length>1){
      console.log("la")

     $localStorage.products.forEach(function(y){     
               
        self.data.push(JSON.parse(y))
        console.log(self.data)

      })



        var i =  self.data.length, j , val ;     
        console.log(i) 

        if(i>=2){
          console.log("dans le if")
          self.datafinal[0] = self.data[0]                     
          self.datafinal[0].nombre = 1
           while (i--) {
            val = self.data[i];
            j = i;
            
            while (j--) {
              if(self.data[j].id == val.id){
                console.log("lala")                 
                self.datafinal[self.datai].nombre++
                console.log(self.datafinal[self.datai].nombre)
              } 
              else{
                self.datafinal.push(val)
                self.datafinal[self.datai].nombre = 1
              }            
            }
      }
        }

        else{
          self.datafinal.push(JSON.parse(y))
          self.datafinal[0].nombre=1;         
        }
      }
     
    

     


     this.add = function(id) {
      console.log(id)   
      self.iterator = 0
      self.datafinal.forEach(function(y){      
       
        if (y.id == id){
          console.log(y)
          self.datafinal[self.iterator].nombre++
        }        
     
     })
        
     }

     this.supp = function(id) {
      self.iterator = 0
      self.datafinal.forEach(function(y){      
       
        if (y.id == id){
          console.log(y)
          self.datafinal[self.iterator].nombre--
          if( self.datafinal[self.iterator].nombre == 0 ){
            self.datafinal.splice(self.iterator,1)
            $localStorage.products.splice(self.iterator,1)
          }
        }        
     
     })
        
     }


});

