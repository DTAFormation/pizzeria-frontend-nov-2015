angular.module('pzWebApp.users').service('connexionService', function ($http, pizzConfig) {


	console.log('editionService')
	
	this.promessePut = function promessePut(login, mdp) {
		console.log("je passe dans la promesse put : "+login +' mdp : '+mdp)
		return $http.get(pizzConfig.CLIENT_RESOURCE_URL+'/connexion/'+login+'/'+mdp)			
	}
});
