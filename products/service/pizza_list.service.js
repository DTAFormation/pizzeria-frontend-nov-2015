angular.module('pzWebApp.products').service('pizza_listService', function($http, $q, pizzConfig) {

	function handleResponse(response) {
		console.log("Success !")
		return response.data
	}

    this.getPizzas = function() {
        console.log("Get pizzas")
        return $http.get(pizzConfig.PIZZA_RESOURCE_URL)
			.then(handleResponse)
    };

})



