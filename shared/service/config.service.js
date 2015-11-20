var BACKEND_BASE_URL = 'http://localhost:8080';

angular.module('pzWebApp.shared').constant('pizzConfig',{	

	'DRINK_RESOURCE_URL': BACKEND_BASE_URL + '/drink',	
	'HOME_RESOURCE_URL': BACKEND_BASE_URL + '/home',
	'MENU_LIST_RESOURCE_URL': BACKEND_BASE_URL + '/menus',
	'DETAIL_PIZZA_RESOURCE_URL': BACKEND_BASE_URL + '/pizzaUne?id=',
	'DESSERT_RESOURCE_URL': BACKEND_BASE_URL + '/dessert',
	'MENU_RESOURCE_URL': BACKEND_BASE_URL + '/menu',
	'PIZZA_RESOURCE_URL': BACKEND_BASE_URL + '/pizza'	


})