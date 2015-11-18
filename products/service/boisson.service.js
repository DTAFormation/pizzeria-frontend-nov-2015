angular.module('pzWebApp.products').service('boissonService', function($http, $q, pzConfig) {

	function handleResponse(response) {
		console.log("Success !")
		return response.data
	}

    this.getBoissons = function() {
        console.log("Get boissons")
        	return $http.get(pzConfig.DRINK_RESOURCE_URL)
			.then(handleResponse)
    };

});
