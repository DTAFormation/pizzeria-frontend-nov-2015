angular.module('pzWebApp.products').service('boissonService', function($http, $q) {

	function handleResponse(response) {
		console.log("Success !")
		return response.data
	}

    this.getBoissons = function() {
        console.log("Get boissons")
        return $http.get('http://localhost:1236/boissons')
			.then(handleResponse)
    };

});
