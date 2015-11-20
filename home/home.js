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

angular.module('pzWebApp.home').controller('panierCtrl', function(userService, panierService,$localStorage, $sessionStorage, $routeParams, $location){

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

    self.dataMenu = []

    var cache = {};

     


    if(!$localStorage.products)
        {
            $localStorage.products = [];
        }

    if(!$localStorage.menu)
        {
            $localStorage.menu = [];
        }

    if((!$localStorage.panierConnexion) || ($localStorage.panierConnexion == 1)){
      $localStorage.panierConnexion = 0
      console.log('$localStorage.panierConnexion', $localStorage.panierConnexion)
    }


    //Récupération données localstorage
    console.log($localStorage.products)    
    $localStorage.products.forEach(function(y){   
               
        self.data.push(y)
        console.log(self.data)

      })

    console.log("menu",$localStorage.menu)
    self.dataMenu = $localStorage.menu






  //Trier tableau par id
  self.datatrie = self.data  
  self.datatrie.sort(function(a, b){   
    return a.id-b.id})

  console.log('Tableau trié\n',   self.datatrie)

  //Création tableau unique
  self.datauni = self.datatrie.filter(function(elem, index, array){
          return cache[elem.id]?0:cache[elem.id]=1;
  });


  console.log('Tableau unique\n', self.datauni)

//calcul du nombre d'éléments
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

    
   // console.log('id',self.datauni[self.iterator2].id )
    //console.log('nombre',self.datauni[self.iterator2].nombre )

    console.log(compt)
    
    if(self.datauni[self.iterator2].id != self.datatrie[self.iterator].id)
    {
      self.iterator2++      
    }
    self.datauni[self.iterator2].nombre = compt
    console.log('compteur',compt)
    console.log('self.datauni',self.datauni)
    console.log('self.iterator2',self.iterator2) 
    
      
    self.iterator++
    
  })


//FONCTION ajouter ou supprimer produit
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
      
      upload()
     }
//FONCTION ajouter ou supprimer produit
     this.supp = function(id) {
      self.iterator3 = 0            
      self.datauni.forEach(function(y){    
       
        if (y.id == id){          
          self.datauni[self.iterator3].nombre--
          if(self.datauni[self.iterator3].nombre<=0){                       
            if(self.datauni.length == 1 ){
              self.datauni = []
              $localStorage.products = []
            }
            self.datauni.splice(self.iterator3,1)
                    
          }      
        }
        self.iterator3++       
      
     })
      
      upload()  
     }
      


     upload = function(){
     var products = []
      self.datauni.forEach(function(y){
        console.log("la")
        var elementPanier = new Object();        
        elementPanier.id = y.id
        elementPanier.format = y.format
        elementPanier.ingredients = y.ingredients
        elementPanier.nom = y.nom                   
        elementPanier.prix = y.prix
        elementPanier.taille = y.taille
        elementPanier.type = y.type

        for(var i = 0 ; i<y.nombre ; i++ ){
          console.log('elementPanier', elementPanier)
          console.log(y.nombre)          
          products.push(elementPanier)
         
        }
         $localStorage.products = products;
        
      })
      console.log('$localStorage.products', $localStorage.products)
     } 


     this.supprimerMenu = function(menu){
      console.log(menu.id)
      var i = 0
      self.dataMenu.forEach(function(y){        
        if(menu == y){
          console.log("testOK")
          self.dataMenu.splice(i,1)
        }
        i++
      })
     }


     this.save = function(){
      $localStorage.panierFinal = []
      if($localStorage.products == null){
        $localStorage.panierFinal.push($localStorage.products)
      }

      if($localStorage.menu == null){
        $localStorage.panierFinal.push($localStorage.menu)
      }

      console.log("localstorage panier final",$localStorage.panierFinal)
       if(userService.isConnected()){
        console.log("client connecté")
       }
       else {$location.path('/connexion')}
      
     }

     this.total = function(){
      var total = 0 ;
      $localStorage.products.forEach(function(y){
        total += y.prix;
      })
       $localStorage.menu.forEach(function(y){
        total += y.prix;
      })
      return total
     }


     this.hideCommand = function(){
      if((self.datauni.length == 0) && (self.dataMenu.length == 0)){
        return true;
      }
      else{ return false;}
     
     }

});

