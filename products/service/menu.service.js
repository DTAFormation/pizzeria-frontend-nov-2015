angular.module('pzWebApp.products').service('menuService', function($http, $q) {

	function handleResponse(response) {
		console.log("Success !")
		return response.data
	}

    this.getMenu = function(id) {
        console.log("Recuperation menu")
        	return $http.get('http://localhost:8080/menu/'.id)
			.then(handleResponse)
    };

});
