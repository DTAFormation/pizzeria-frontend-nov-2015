angular.module('pzWebApp.products').service('menuService', function($http, $q, pizzConfig) {

	function handleResponse(response) {
		console.log("Success !")
		return response.data
	}

    this.getMenu = function(id) {
        console.log("Recuperation menu")
		console.log(id)
        	return $http.get(pizzConfig.MENU_RESOURCE_URL.id)
			.then(handleResponse)
    };

});
