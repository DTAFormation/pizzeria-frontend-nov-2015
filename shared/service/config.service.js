var BACKEND_BASE_URL = 'http://localhost:8080';

angular.module('pzWebApp.shared').constant('pizzConfig',{	

	'DRINK_RESOURCE_URL': BACKEND_BASE_URL + '/drink',	
	'HOME_RESOURCE_URL': BACKEND_BASE_URL + '/home',
	'MENU_LIST_RESOURCE_URL': BACKEND_BASE_URL + '/menus',
	'DETAIL_PIZZA_RESOURCE_URL': BACKEND_BASE_URL + '/pizza?id=',
	'DESSERT_RESOURCE_URL': BACKEND_BASE_URL + '/dessert',
	'MENU_RESOURCE_URL': BACKEND_BASE_URL + '/menu/',
	'COMMAND_RESOURCE_URL' : BACKEND_BASE_URL + '/command',
	'CLIENT_RESOURCE_URL': BACKEND_BASE_URL + '/client',
	'IMG_PIZZA_URL' : 'http://dtaformation.github.io/pizzeria-web-image-nov-2015/PIZZA/',
	'IMG_BOISSON_URL' : 'http://dtaformation.github.io/pizzeria-web-image-nov-2015/BOISSON/',
	'IMG_DESSERT_URL' : 'http://dtaformation.github.io/pizzeria-web-image-nov-2015/DESSERT/',
	'IMG_URL_Default' : 'http://dtaformation.github.io/pizzeria-web-image-nov-2015/Error.jpg'	

})

