angular.module('pzWebApp.orders').service('paiementService', function ($http, pizzConfig) {

		var self = this;
   
   function handleResponse(response) {
                return response.data;
        }

   
     self.saveCommand = function(command) {
    console.log(command);
    return $http.post(pizzConfig.COMMAND_RESOURCE_URL, command).then(
      function Success(response) {
        console.log(response);
      }, function Error(response) {
        console.log(response);
      }
    );
  };
   
});
