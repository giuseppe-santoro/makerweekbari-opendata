'use strict';

/**
 * @ngdoc service
 * @name makerWeekApp.poiApi
 * @description
 * # poiApi
 * Service in the makerWeekApp.
 */
angular.module('makerWeekApp')
  .service('poiApi', function ($http, $q) {

    this.getMunicipi = function () {
      return $http.get('http://146.185.165.167:9100/odlab/v1/municipi');
    };

    this.score = function (servizi, ambiente, cultura, salute) {
      function getUrlOfMunicipio(municipio) {
        return 'http://146.185.165.167:9100/odlab/v1/score/' +
          municipio + '/' +
          servizi + '/' +
          ambiente + '/' +
          cultura + '/' +
          salute;
      }

      var deferred = $q.defer();

      async.parallel([
        function (callback) {
          $http.get(getUrlOfMunicipio(1))
            .then(function (result) {
              callback(null, { municipio: 1, score: result.data });
            }).catch(function (err) {
              callback(err);
            });
        },
        function (callback) {
          $http.get(getUrlOfMunicipio(3))
            .then(function (result) {
              callback(null, { municipio: 3, score: result.data });
            }).catch(function (err) {
            callback(err);
          });
        },
        function (callback) {
          $http.get(getUrlOfMunicipio(4))
            .then(function (result) {
              callback(null, { municipio: 4, score: result.data });
            }).catch(function (err) {
            callback(err);
          });
        },
        function (callback) {
          $http.get(getUrlOfMunicipio(5))
            .then(function (result) {
              callback(null, { municipio: 5, score: result.data });
            }).catch(function (err) {
            callback(err);
          });
        }
      ], function (err, results) {
        if (err) {
          deferred.reject(err);
        } else {
          var total = _.reduce(results, function(acc, result) {
            return acc+parseInt(result.score);
          }, 0);

          var scores = {};

          _.forEach(results, function(result){
            scores[result.municipio] = {
              score: result.score,
              scorePercentage: result.score / total * 100
            }
          });

          deferred.resolve(scores);
        }
      });

      return deferred.promise;
    };


  });
