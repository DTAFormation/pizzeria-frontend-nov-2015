angular.module('pzWebApp.users').service('inscriptionService', function($http) {

function handleResponse(response) {
        return response.data
    }

console.log('inscriptionService')

// TODO A remplacer par la connection à la BDD
var url = 'http://localhost:2000/client'

this.promessePost = function promessePost(client) { 
    return $http.post(url + '/', client)
                    .then(handleResponse)}
});
