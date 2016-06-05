'use strict';

/**
 * @ngdoc function
 * @name makerWeekApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the makerWeekApp
 */
angular.module('makerWeekApp')
  .controller('MapCtrl', function ($scope, poiApi) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.loading = false;

    function calcola() {
      $scope.loading = true;
      poiApi.score(
        $scope.servizi.value,
        $scope.ambiente.value,
        $scope.cultura.value,
        $scope.salute.value
      ).then(function(results){
        console.log(results);
        $scope.scores = results;
        $scope.currentScore = $scope.scores[1].scorePercentage;
        $scope.currentName = names[1];
      }).catch(function(err){
        console.error(err);
      }).finally(function(){
        $scope.loading = false;
      });
    }

    $scope.ambiente = {
      value:1,
      options: {
        floor: 0,
        ceil: 10,
        onChange: calcola
      }
    };
    $scope.cultura = {
      value:1,
      options: {
        floor: 0,
        ceil: 10,
        onChange: calcola
      }
    };
    $scope.salute = {
      value:1,
      options: {
        floor: 0,
        ceil: 10,
        onChange: calcola
      }
    };
    $scope.servizi = {
      value:1,
      options: {
        floor: 0,
        ceil: 10,
        onChange: calcola
      }
    };

    $scope.currentScore = undefined;
    $scope.scores = {};
    $scope.currentName = '';

    var names = {
      1: 'PICONE-POGGIOFRANCO-CARRASSI-SAN PASQUALE-MUNGIVACCA',
      3: 'PALESE-S.SPIRITO-CATINO-SAN PIO',
      4: 'SAN PAOLO-STANIC-VILLAGGIO DEL LAVORATORE-SAN GIROLAMO-FESCA-MARCONI',
      5: 'CARBONARA-CEGLIE-LOSETO'
    };

    $scope.map = {center: {latitude: 41.16, longitude: 16.8}, zoom: 12};
    poiApi.getMunicipi().success(function (res) {
      $scope.polygons = _(res.results)
        .filter(function(municipio){
          return municipio.properties.OBJECTID != 2;
        }).map(function (municipio) {

        return {
          id: municipio.properties.OBJECTID,
          path: _.map(municipio.geometry.coordinates[0], function (pos) {
            return {
              latitude: pos[1],
              longitude: pos[0]
            };
          }),
          stroke: {
            color: '#6060FB',
            weight: 1
          },
          geodesic: false,
          visible: true
        }
      }).value();

      $scope.polygons[0].events = {
        'mouseover': function () {
          $scope.currentScore = $scope.scores[1].scorePercentage;
          $scope.currentName = names[1];
        }
      };
      $scope.polygons[0].fill={
        municipio: 1,
        color: '#00ff00', //verde
          opacity: 0.8
      };


      $scope.polygons[1].events = {
        'mouseover': function () {
          $scope.currentScore = $scope.scores[5].scorePercentage;
          $scope.currentName = names[5];
        }
      };
      $scope.polygons[1].fill={
        municipio: 5,
        color: '#ff0000', //rosso
        opacity: 0.8
      };

      $scope.polygons[2].events = {
        'mouseover': function () {
          $scope.currentScore = $scope.scores[3].scorePercentage;
          $scope.currentName = names[3];
        }
      };
      $scope.polygons[2].fill={
        municipio: 3,
        events: {
          'mouseover': function () {
            console.log($scope.scores[3].scorePercentage);
            //$scope.currentScore = $scope.score
          }
        },
        color: '#00ffff', //azzurro
        opacity: 0.8
      };

      $scope.polygons[3].events = {
        'mouseover': function () {
          $scope.currentScore = $scope.scores[4].scorePercentage;
          $scope.currentName = names[4];
        }
      };
      $scope.polygons[3].fill={
        municipio: 4,
        events: {
          'mouseover': function () {
            console.log($scope.scores[4].scorePercentage);
            //$scope.currentScore = $scope.score
          }
        },
        color: '#ffff00', //giallo
        opacity: 0.8
      };

      $scope.polygonsMun3 = _(res.results[2].geometry.coordinates)
        .map(function (polygon) {
          return {

            path: _.map(polygon[0], function (pos) {
              return {
                latitude: pos[1],
                longitude: pos[0]
              };
            }),
            fill: {
              color: '#0000ff'
            },
            stroke:{
              color:'#6060FB',
              weight: 1
            },
            geodesic: false,
            visible: true
          }
        }).value();
    });

    calcola();

  });






