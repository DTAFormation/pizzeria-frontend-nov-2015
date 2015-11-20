// Déclaration du module 'products'
angular.module('pzWebApp.products', [
    'ngRoute',
    'pzWebApp.shared'
]);

// Configuration du module 'products'
angular.module('pzWebApp.products').config(function($routeProvider) {

    // TODO Définir les routes spécifiques au module 'products' ici
    $routeProvider
    .when("/products",{
        templateUrl:"products/template/products.tpl.html",
        controller:"productsCtrl",
        controllerAs: "ctrl"
    })
    .when("/desserts",{
        templateUrl:"products/view/dessert.html",
        controller:"dessertCtrl",
        controllerAs: "ctrl"
    })
     .when("/details_pizza", {
            templateUrl: "products/view/details_pizza.html",
            controller: "details_pizzaCtrl",
            controllerAs: "ctrl"
        })
    .when("/pizza_list",{
            templateUrl:"products/view/pizza_list.html",
            controller:"pizza_listCtrl",
            controllerAs: "ctrl"
        })
    .when("/boissons",{
        templateUrl:"products/view/boisson.html",
        controller:"boissonCtrl",
        controllerAs: "ctrl"
    })
    .when("/card",{
        templateUrl:"products/view/card.html",
        controller:"cardCtrl",
        controllerAs: "ctrl"
    })
    .when("/menu_list",{
        templateUrl:"products/view/menu_list.html",
        controller:"listMenuCtrl",
        controllerAs: "ctrl"
    })
    .when("/menu/:idMenu",{
        templateUrl:"products/view/menu.html",
        controller:"menuCtrl",
        controllerAs: "ctrl"
    });
});

// Contrôleur principal du module 'products'
// Usage de la syntaxe 'controller as', pas besoin du '$scope'
angular.module('pzWebApp.products')
.controller('details_pizzaCtrl', function (userService, detPizService, $routeParams) {
    var id = $routeParams.pizza
    var self = this;
    
    self.title = "Détails pizza";
    self.pizza = null

    /*
    detPizService.promesse.then(function (pizza) {
        self.pizza = pizza[id];
        
    }.bind(this))
    */

    console.log(id)
    detPizService.getPizza(id).then(function(data){
       self.pizza = data;
   })
})
.controller('pizza_listCtrl', function (pizza_listService) {

    var self = this;
    self.title = "Liste de pizzas";

    self.pizzas = null; 

    pizza_listService.getPizzas().then(function(data){
       self.pizzas = data;
   })



})
/*
.filter('inSlicesOf', 
        ['$rootScope',  
        function($rootScope) {
            makeSlices = function(items, count) { 
                if (!count)            
                    count = 3;               
                if (!angular.isArray(items) && !angular.isString(items)) return items;               
                var array = [];
                for (var i = 0; i < items.length; i++) {
                    var chunkIndex = parseInt(i / count, 10);
                    var isFirst = (i % count === 0);
                    if (isFirst)
                        array[chunkIndex] = [];
                    array[chunkIndex].push(items[i]);
                }
                if (angular.equals($rootScope.arrayinSliceOf, array))
                    return $rootScope.arrayinSliceOf;
                else
                    $rootScope.arrayinSliceOf = array;
                    
                return array;
            };       
            return makeSlices; 
        }]
    )
*/
.controller('productsCtrl', function(userService) {

    var self = this;

    self.title = "Page Products";

})

.controller('dessertCtrl', function(dessertService, $location, $localStorage) {
    console.log($localStorage.products)
    var self = this;

    self.title = "Choisissez un dessert:";

    self.dessertForm = null; //formulaire correspondant au choix du dessert

    self.dessert = null; //dessert sélectionné par l'utilisateur

    //liste des desserts
    dessertService.getDesserts().then(function(data){
       self.desserts = data;
   })

    //sauvegarde du choix du dessert de l'utilisateur
    this.saveForm = function(){

        if(this.dessertForm.$invalid || self.dessert == null)
        {
            alert("Merci de sélectionner un dessert");
            return;
        }

        if($localStorage.products == null)
        {
            $localStorage.products = [];
        }

        $localStorage.products.push(JSON.parse(self.dessert));

        console.log(self.dessert)
        $location.path('/')
    }

})
.controller('boissonCtrl', function(boissonService, $location, $localStorage) {
    console.log($localStorage.products)
    var self = this;

    self.title = "Choisissez une boisson:";

    self.boissonForm = null; //formulaire correspondant au choix de la boisson

    self.boisson = null; //boisson sélectionnée par l'utilisateur

    //liste des boissons
    boissonService.getBoissons().then(function(data){
       self.boissons = data;
   })

    //sauvegarde du choix de la boisson de l'utilisateur
    this.saveForm = function(){

        if(this.boissonForm.$invalid || self.boisson == null)
        {
            alert("Merci de sélectionner une boisson");
            return;
        }

        if(!$localStorage.products)
        {
            $localStorage.products = [];
        }
        $localStorage.products.push(JSON.parse(self.boisson));

        //console.log("Target boisson is "+self.boisson);
        $location.path('/')
    }

})
.controller('cardCtrl', function(boissonService, dessertService, pizza_listService, $location, $localStorage) {

    var self = this;

    self.title = "Choisissez un produit parmis la carte:";

    self.cardForm = null; //formulaire correspondant au choix d'un produit de la carte

    //liste des boissons
    boissonService.getBoissons().then(function(data){
       self.boissons = data;
   })

    //liste des desserts
    dessertService.getDesserts().then(function(data){
       self.desserts = data;
   })

    //liste des pizzas
    pizza_listService.getPizzas().then(function(data){
       self.pizzas = data;
   })

    //sauvegarde du choix du produit de l'utilisateur
    this.saveForm = function(){

        var selectedPizzas = self.pizzas.filter(function(piz){  return piz.selected});
        var selectedDesserts = self.desserts.filter(function(piz){  return piz.selected});
        var selectedBoissons = self.boissons.filter(function(piz){  return piz.selected});

        if(this.cardForm.$invalid || (selectedPizzas.length == 0 && selectedDesserts.length == 0 && selectedBoissons.length == 0))
        {
            alert("Merci de sélectionner un produit");
            return;
        }

        if(!$localStorage.products)
        {
            $localStorage.products = [];
        }

        $localStorage.products = $localStorage.products.concat(selectedPizzas);
        $localStorage.products = $localStorage.products.concat(selectedDesserts);
        $localStorage.products = $localStorage.products.concat(selectedBoissons);

        console.log("Pizzas added are "+ selectedPizzas);
        console.log("Desserts added are "+ selectedDesserts);
        console.log("Boissons added are "+ selectedBoissons);
        
        //retour sur la home
        $location.path('/')
    }
})
.controller('listMenuCtrl', function(listMenuService) {
    var self = this;
    self.title = "Liste des menus";

    //liste des menus
    listMenuService.getMenus().then(function(data){
        self.menus = data;
    })

})
.controller('menuCtrl', function(menuService, $routeParams) {
    var self = this;
    self.title = "Menu:";
    var id = $routeParams.idMenu

    //contenu d'un menu
    menuService.getMenu(id).then(function(data){
        self.menu = data;
    })

});
