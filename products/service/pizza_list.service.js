angular.module('pzWebApp.products').service('pizza_listService', function($http, $q) {

	var url = 'http://localhost:8080/pizza'
	//var url = "http://localhost:3017/pizzas"

	function handleResponse(response) {
		console.log("Success !")
		return response.data
	}

    this.getPizzas = function() {
        console.log("Get pizzas")
        return $http.get(url)
			.then(handleResponse)
    };

})



