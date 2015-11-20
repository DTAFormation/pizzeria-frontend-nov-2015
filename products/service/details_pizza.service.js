angular.module('pzWebApp.products').service('detPizService', function ($http, $q, pizzConfig)  {

        function handleResponse(response) {
        console.log("Success !")
        return response.data
    }

        this.getPizza = function(id) {
        	console.log("Get pizzas")        	
        	var url = pizzConfig.DETAIL_PIZZA_RESOURCE_URL + id;
        	console.log(url)
	        return $http.get(url).
	        	then(handleResponse)
    	};
        
});
