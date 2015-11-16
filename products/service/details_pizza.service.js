angular.module('pzWebApp.products').service('detPizService', function ($http) {

        function handleResponse(response) {
                return response.data;
        }

        var url = "http://127.0.0.1:8080/details_pizza.json";

        this.promesse = $http.get(url)
                .then(handleResponse)
        
});
