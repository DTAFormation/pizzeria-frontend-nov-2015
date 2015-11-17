angular.module('pzWebApp.products').service('pizza_listService', function($http, $q) {

	//var url = 'http://localhost:3000/'
	var url = "http://127.0.0.1:8080/pizza_list.json"


	function handleResponse(response){
		return response.data
	}

	this.promesse = $http.get(url)
                .then(handleResponse)

})



