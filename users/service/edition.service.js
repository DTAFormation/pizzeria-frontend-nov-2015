angular.module('pzWebApp.users').service('editionService', function ($http) {

	function handleResponse(response) {
        return response.data
    }

	console.log('editionService')

	// TODO A remplacer par la connection à la BDD
	var url = 'http://localhost:2000/client'

	this.promesseGet = $http.get(url)
		.then(handleResponse)

	this.promessePut = function promessePut(client) {
		return $http.put(url + '/' + client.id, client)
			.then(handleResponse)
	}
});
