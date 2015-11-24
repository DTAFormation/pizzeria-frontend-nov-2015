// Déclaration du module 'products'
angular.module('pzWebApp.products', [
    'ngRoute',
    'pzWebApp.shared',
]);

angular.module('fallback',[]).directive('fallbackSrc', function () {
    return{
        link: function postLink(scope, element, attrs) {
            element.bind('error', function () {
                angular.element(this).attr("src", attrs.fallbackSrc);
            });
        }
    }
});

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
.controller('details_pizzaCtrl', function (userService, detPizService, pizzConfig, $routeParams) {
    var id = $routeParams.id
    var self = this;
    
    self.title = "Détails pizza";
    self.pizza = null;

    self.url=pizzConfig.IMG_PIZZA_URL;
    self.urlDefault=pizzConfig.IMG_URL_Default;
    
    console.log(id)
    detPizService.getPizza(id).then(function(data){
       self.pizza = data;
   })
})
.controller('pizza_listCtrl', function (pizza_listService,pizzConfig) {

    var self = this;
    self.title = "Liste de pizzas";

    self.pizzas = null; 
    self.configService = pizzConfig;

    pizza_listService.getPizzas().then(function(data){
       self.pizzas = data;
   })

})
.controller('productsCtrl', function(userService) {

    var self = this;

    self.title = "Page Products";

})

.controller('dessertCtrl', function(dessertService, $location, $localStorage, pizzConfig) {

    var self = this;

    self.configService = pizzConfig;

    self.title = "Choisissez un dessert:";

    self.dessertForm = null; //formulaire correspondant au choix du dessert

    self.dessert = null; //dessert sélectionné par l'utilisateur

    self.selectDessert = function(dessert) {
        self.dessert = dessert;
    }

    self.getDessertClass = function(dessert) {
        if(angular.equals(self.dessert , dessert)) {
            return "produitselectionne";
        }
    }

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

        $localStorage.products.push(self.dessert);

        console.log("Target dessert is "+self.dessert);

        $location.path('/')
    }

})
.controller('boissonCtrl', function(boissonService, $location, $localStorage, pizzConfig) {
    var self = this;

    self.configService = pizzConfig;

    self.title = "Choisissez une boisson:";

    self.boissonForm = null; //formulaire correspondant au choix de la boisson

    self.boisson = null; //boisson sélectionnée par l'utilisateur

    //liste des boissons
    boissonService.getBoissons().then(function(data){
       self.boissons = data;
    })

    self.selectBoisson = function(boisson) {
        self.boisson = boisson;
    }

    self.getBoissonClass = function(boisson) {
        if(angular.equals(self.boisson , boisson)) {
            return "produitselectionne";
        }
    }

    //sauvegarde du choix de la boisson de l'utilisateur
    self.saveForm = function(){

        if(this.boissonForm.$invalid || self.boisson == null)
        {
            alert("Merci de sélectionner une boisson");
            return;
        }

        if(!$localStorage.products)
        {
            $localStorage.products = [];
        }
        $localStorage.products.push(self.boisson);

        console.log("Target boisson is "+self.boisson);

        $location.path('/')
    }

})
.controller('cardCtrl', function(boissonService, dessertService, pizza_listService, $location, $localStorage, pizzConfig) {

    var self = this;

    self.configService = pizzConfig;

    self.title = "Notre carte:";

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
.controller('menuCtrl', function(menuService, $routeParams, $localStorage, $location, pizzConfig) {
    console.log($localStorage.menu)
    
    var self = this;

    self.configService = pizzConfig;

    self.title = "Menu:";
    var id = $routeParams.idMenu

    self.filterProducts = function(prods,type) {
        console.log(prods);
        if(prods)  return prods.filter(function(prod){  return prod.type === type})
            else return [];
       ;
    }
    self.pizza = null
    self.boisson = null
    self.dessert = null

    //contenu d'un menu
    menuService.getMenu(id).then(function(data){
        self.menu = data;
    })

    this.saveForm = function(){
        if(this.menuForm.$invalid || self.pizza == null || self.boisson == null || self.dessert == null)
        {
            alert("Merci de sélectionner un élément dans chaque catégorie");
            return;
        }
        
        if(!$localStorage.menu)
        {
            $localStorage.menu = [];
        }
        $localStorage.menu.push(self.menu);
        if(!$localStorage.menu.pizza)
        {
            $localStorage.menu.pizza = [];
        }
        $localStorage.menu.pizza.push(self.pizza);
        if(!$localStorage.menu.boisson)
        {
            $localStorage.menu.boisson = [];
        }
        $localStorage.menu.boisson.push(self.boisson);
        if(!$localStorage.menu.dessert)
        {
            $localStorage.menu.dessert = [];
        }
        $localStorage.menu.dessert.push(self.dessert);
        console.log(self.pizza)
        console.log(self.boisson)
        console.log(self.dessert)
    
        $location.path('/panier')
    }

});
