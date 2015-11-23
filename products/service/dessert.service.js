angular.module('pzWebApp.products').service('dessertService', function($http, $q, pizzConfig) {

	function handleResponse(response) {
		console.log("Success !")
		return response.data
	}

    this.getDesserts = function() {
        console.log("Get desserts")
			return $http.get(pizzConfig.DESSERT_RESOURCE_URL)
			.then(handleResponse)
    };

});
