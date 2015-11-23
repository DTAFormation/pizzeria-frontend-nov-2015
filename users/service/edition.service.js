angular.module('pzWebApp.users').service('editionService', function ($http, pizzConfig) {

	function handleResponse(response) {
        return response.data
    }


	this.promessePut = function promessePut(client) {
		return $http.put(pizzConfig.CLIENT_RESOURCE_URL, client)
			.then(handleResponse)
	}
});
