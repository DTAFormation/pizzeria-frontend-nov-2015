angular.module('pzWebApp.products').service('listMenuService', function($http, $q, pizzConfig) {

	function handleResponse(response) {
		console.log("Success !")
		return response.data
	}

    this.getMenus = function() {
        console.log("Recuperation menus")
        	return $http.get(pizzConfig.MENU_LIST_RESOURCE_URL)
			.then(handleResponse)
    };

});
