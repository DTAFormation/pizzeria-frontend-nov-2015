// Déclaration du module 'products'
angular.module('pzWebApp.products', [
    'ngRoute',
    'pzWebApp.shared'
]);

// Configuration du module 'products'
angular.module('pzWebApp.products').config(function ($routeProvider) {

    // TODO Définir les routes spécifiques au module 'products' ici
    $routeProvider
        .when("/details_pizza", {
            templateUrl: "products/template/details_pizza.tpl.html",
            controller: "details_pizzaCtrl",
            controllerAs: "ctrl"
        })
        .when("/pizza_list",{
            templateUrl:"products/template/pizza_list.tpl.html",
            controller:"pizza_listCtrl",
            controllerAs: "ctrl"
        });
});

// Contrôleur principal du module 'products'
// Usage de la syntaxe 'controller as', pas besoin du '$scope'
angular.module('pzWebApp.products').controller('details_pizzaCtrl', function (userService, detPizService) {

    var self = this;
    var id = 0;
    
    self.title = "Détails pizza";
    detPizService.promesse.then(function (pizza) {
        self.pizza = pizza[id];
        
    }.bind(this))
    
    // ...

}),
angular.module('pzWebApp.products').controller('pizza_listCtrl', function (userService, pizza_listService) {

    var self = this;
    var id = 1;
    self.title = "Liste de pizzas";

    pizza_listService.promesse.then(function (pizza) {
        self.pizzas = pizza;
        
    }.bind(this))
    
    // ...

})
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
;
