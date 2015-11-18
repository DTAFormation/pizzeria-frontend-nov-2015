angular.module('pzWebApp.shared').service('userService', function ($http, $q, $localStorage) {

    var connected = false;

    return {
        isConnected: function () {
            return connected;
        },

        login: function (client) {
            $localStorage.client = client;
            connected = true;
        },

        logout: function () {
            delete $localStorage.client;
            connected = false;
        }
    };

});
