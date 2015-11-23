angular.module('pzWebApp.users').service('validationService', function ($http, pizzConfig) {


	console.log('validationService')
	
	this.promessePut = function promessePut(id, hash) {
		console.log("je passe dans la promesse put id : "+id +" hash : "+hash)
		return $http.get(pizzConfig.CLIENT_RESOURCE_URL+'/validation?id='+id+'&hash='+hash)			
	}
});