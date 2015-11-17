angular.module('pzWebApp.users').service('editionService', function ($http) {

	function handleResponse(response) {
        return response.data
    }

	console.log('editionService')
	//TODO à remplacer par la variable de cession
	var id = 1
	
	var url = 'http://localhost:8080/client'
	this.promesseGet = $http.get(url+"/"+id)
		.then(handleResponse)

	this.promessePut = function promessePut(client) {
		console.log("je passe dans la promesse put : "+client.nom)
		return $http.put(url, client)
			.then(handleResponse)
	}
});
