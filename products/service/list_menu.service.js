angular.module('pzWebApp.products').service('listMenuService', function($http, $q) {

	function handleResponse(response) {
		console.log("Success !")
		return response.data
	}

    this.getMenus = function() {
        console.log("Recuperation menus")
        	return $http.get('http://localhost:8080/menu')
			.then(handleResponse)
    };

});
