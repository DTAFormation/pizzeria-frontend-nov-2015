angular.module('pzWebApp.users').service('connexionService', function ($http) {

	function handleResponse(response) {
        return response.data
    }

	console.log('editionService')
	//TODO à remplacer par la variable de cession	
	var url = 'http://localhost:8080/client'
	
	this.promessePut = function promessePut(login, mdp) {
		console.log("je passe dans la promesse put : "+login +' mdp : '+mdp)
		return $http.get(url+'/connexion/'+login+'/'+mdp)
			.then(handleResponse)
	}
});
