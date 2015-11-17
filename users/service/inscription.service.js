angular.module('pzWebApp.users').service('inscriptionService', function($http) {

function handleResponse(response) {
        return response.data
    }

console.log('inscriptionService')

var url = 'http://localhost:8080/client'

this.promessePost = function promessePost(client) { 
    console.log("le nom du client envoyé est : "+client.nom)
    return $http.post(url + '/', client)
                    .then(handleResponse)}
});
