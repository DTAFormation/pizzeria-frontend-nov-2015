angular.module('pzWebApp.products').service('dessertService', function($http, $q) {

	function handleResponse(response) {
		console.log("Success !")
		return response.data
	}

    this.getDesserts = function() {
        console.log("Get desserts")
        return $http.get('http://localhost:1235/desserts')
			.then(handleResponse)
    };

});
