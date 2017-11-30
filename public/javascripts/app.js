var Spotify = require('node-spotify-api');
var spotify = new Spotify({
  id: '19e02803b90448bd9bcef497dc877f5a',
  secret: 'a7faf797b2ef4433847f76e375f89af4'
});


var app = window.angular.module('app', [])

app.factory('pokemonFetcher', pokemonFetcher)
app.controller('mainCtrl', mainCtrl)

function pokemonFetcher ($http) {

  var API_ROOT = 'pokemon'
  return {
    get: function () {
      return $http
        .get(API_ROOT)
        .then(function (resp) {
          return resp.data
        })
    },
    tryit: function() {
      var politics = "/politics";
      return $http.get(politics).then(function(resp) {
        console.log("Get Worked");
        console.log(resp.data);
        return resp.data
      })
    }
  }

}

function mainCtrl ($scope, pokemonFetcher, $http) {

  $scope.pokemon = [];

  $scope.search = function() {
    spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
      if(err) {
        return console.log('Error occurred: ' + err);
      }
      console.log(data);
    });
  };

  pokemonFetcher.get()
    .then(function (data) {
      $scope.pokemon = data
    })

  pokemonFetcher.tryit()
    .then(function(data) {
      console.log("tryit");
      console.log(data);
    })
 
  $scope.addPoki = function() {
    var formData = {name:$scope.Name,avatarUrl:$scope.Url};
    console.log(formData);
    var pokiURL = 'pokemon';
    $http({
       url: pokiURL,
       method: "POST",
       data: formData
    }).success(function(data, status, headers, config) {
      console.log("Post worked");
    }).error(function(data, status, headers, config) {
      console.log("Post failed");
    });
  }
}
