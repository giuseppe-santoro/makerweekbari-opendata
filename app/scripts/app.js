'use strict';

/**
 * @ngdoc overview
 * @name makerWeekApp
 * @description
 * # makerWeekApp
 *
 * Main module of the application.
 */
console.log('definisco la mia applicazione angular');
angular
  .module('makerWeekApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'rzModule',
    'uiGmapgoogle-maps'
  ])
  .config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyBeSx-ctB2GTusftGsEZLXaaTrYLfwKfOU',
      v: '3.20', //defaults to latest 3.X anyhow
      libraries: 'weather,geometry,visualization'
    });
  })
  .config(function ($routeProvider) {
    console.log('configuro il $routerProvider');
    $routeProvider
      .when('/', {
        templateUrl: 'views/map.html',
        controller: 'MapCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
