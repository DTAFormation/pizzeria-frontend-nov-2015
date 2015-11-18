angular.module('pzWebApp.products').service('detPizService', function ($http, $q) {

        function handleResponse(response) {
        console.log("Success !")
        return response.data
    }

        this.getPizza = function(id) {
        	console.log("Get pizzas")        	
        	var url = 'http://localhost:8080/pizzaUne?id='+id;
        	console.log(url)
	        return $http.get(url).
	        	then(handleResponse)
    	};
        
});
