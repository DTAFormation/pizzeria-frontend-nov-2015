angular.module('pzWebApp.products').service('detPizService', function ($http, $q, pizzConfig)  {

    function handleResponse(response) {
        console.log("Success !")
        return response.data
    }


        this.getPizza = function(id) {
        	console.log("Get pizza")        	
        	var url = pizzConfig.PIZZA_RESOURCE_URL + "/" + id;
        	console.log(url)
            console.log("Retour")
	        return $http.get(url).
	        	then(handleResponse)
    	};
        
    });

