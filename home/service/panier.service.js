angular.module('pzWebApp.home').service('panierService', function($http){

	function handleResponse(response) {
        return response.data
    }

    var url = 'http://127.0.0.1:49779/home/source/panier.json'

    this.product = $http.get(url).then(handleResponse(url));

});