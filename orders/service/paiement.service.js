angular.module('pzWebApp.orders').service('paiementService', function ($http) {

        function handleResponse(response) {
                return response.data;
        }

        var url = "";

        this.promesse = $http.get(url)
                .then(handleResponse)
        
});
