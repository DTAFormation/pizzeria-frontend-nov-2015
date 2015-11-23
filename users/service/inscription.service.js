angular.module('pzWebApp.users').service('inscriptionService', function ($http, pizzConfig) {


    console.log('inscriptionService')

    this.promessePost = function promessePost(client) {
        console.log("le nom du client envoyé est : " + client.nom)
        return $http.post(pizzConfig.CLIENT_RESOURCE_URL + '/', client)
    }
});
