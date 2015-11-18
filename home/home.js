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
    self.datauni = [] ;
    self.datafinal = [];

    self.product = null
    self.iterator = 0
    self.iterator2 = 0
    self.datai = 0

    var cache = {};
    console.log($localStorage.products)
    $localStorage.products.forEach(function(y){     
               
        self.data.push(JSON.parse(y))
        console.log(self.data)

      })
    function filtrerParID(obj) {
  if ('id' in obj && typeof(obj.id) === 'number' && !isNaN(obj.id)) {
    return true;
 } else {
    elementsInvalides++;
    return false;
  }
}





  self.datatrie = self.data.filter(filtrerParID)
  console.log('Tableau filtré\n',   self.datatrie)


  self.datauni = self.datatrie.filter(function(elem, index, array){
          return cache[elem.id]?0:cache[elem.id]=1;
  });


  console.log('Tableau unique\n', self.datauni)


  self.datatrie.forEach(function(x){    
    var compt = 0
    console.log('self.iterator',self.iterator)
    
    self.datatrie.forEach(function(z){  

      if (self.datatrie[self.iterator].id == z.id)
      {
        compt++ 
      }
      console.log('compteur',compt)

    })

    
    console.log('id',self.datauni[self.iterator2].id )
    console.log('nombre',self.datauni[self.iterator2].nombre )


    if(self.datauni[self.iterator2].id != self.datatrie[self.iterator].id)
    {
      self.iterator2++
    }
    self.datauni[self.iterator2].nombre = compt
    console.log('self.iterator2',self.iterator2)   
    self.iterator++
    


  })



     this.add = function(id) {
      console.log(id)   
      self.iterator3 = 0
      self.datauni.forEach(function(y){      
       
        if (y.id == id){
          console.log(y)
          self.datauni[self.iterator3].nombre++
        }
        self.iterator3++        
     
     })
        
     }

     this.supp = function(id) {
      self.iterator3 = 0
      self.datauni.forEach(function(y){     
       
        if (y.id == id){
          console.log(y)
          self.datauni[self.iterator3].nombre--        
        }
        self.iterator3++       
      
     })
        
     }


});

