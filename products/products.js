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
            templateUrl: "products/template/details_pizza.tpl.html",
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
.controller('details_pizzaCtrl', function (userService, detPizService) {

    var self = this;
    var id = 0;
    
    self.title = "Détails pizza";
    detPizService.promesse.then(function (pizza) {
        self.pizza = pizza[id];
        
    }.bind(this))
    
})
.controller('pizza_listCtrl', function (pizza_listService) {

    var self = this;
    self.title = "Liste de pizzas";

    self.pizzas = null; 

    pizza_listService.getPizzas().then(function(data){
       self.pizzas = data;
   })

    this.redirect = function(adresse){

        console.log("Redirection");
        $window.location.href = 'details_pizza?pizza=adresse'
    }

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
.controller('dessertCtrl', function(dessertService, $location, $sessionStorage) {

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

        if($sessionStorage.products == null)
        {
            $sessionStorage.products = [];
        }
        $sessionStorage.products.push(self.dessert);

        console.log("Target dessert is "+self.dessert);

        $location.path('/')
    }

})
.controller('boissonCtrl', function(boissonService, $location, $sessionStorage) {

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

        if($sessionStorage.products == null)
        {
            $sessionStorage.products = [];
        }
        $sessionStorage.products.push(self.boisson);

        console.log("Target boisson is "+self.boisson);
        $location.path('/')
    }

})
.controller('cardCtrl', function(boissonService, dessertService, pizza_listService, $location, $sessionStorage) {

    var self = this;

    self.title = "Choisissez un produit parmis la carte:";

    self.cardForm = null; //formulaire correspondant au choix d'un produit de la carte

    self.product = null; //produit sélectionné par l'utilisateur

    //liste des boissons
    boissonService.getBoissons().then(function(data){
       self.boissons = data;
   })

    //liste des desserts
    dessertService.getDesserts().then(function(data){
       self.desserts = data;
   })

    //sauvegarde du choix du produit de l'utilisateur
    this.saveForm = function(){

        if(this.cardForm.$invalid || self.product == null)
        {
            alert("Merci de sélectionner un produit");
            return;
        }

        if($sessionStorage.products == null)
        {
            $sessionStorage.products = [];
        }
        $sessionStorage.products.push(self.product);

        console.log("Target product is "+self.product);
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
