angular.module('pzWebApp.products').service('boissonService', function($http, $q, pizzConfig) {

	function handleResponse(response) {
		console.log("Success !")
		return response.data
	}

    this.getBoissons = function() {
        console.log("Get boissons")
        	return $http.get(pizzConfig.DRINK_RESOURCE_URL)
			.then(handleResponse)
    };

});
