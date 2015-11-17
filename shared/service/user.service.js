angular.module('pzWebApp.shared').service('userService', function($http, $q) {

    var connected = false;    

    return{
        isConnected : function() {
            return connected;
        },
    
        login : function(login, password) {
            // TODO : Gestion de la connexion
        },
    
        logout : function() {
            // TODO Gestion de la déconnexion
        }
    };

});
