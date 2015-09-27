angular.module('starter.controllers', [])

.controller('RestaurantsCtrl', function($scope, $cordovaGeolocation) {
  $scope.listing = [];
  var listNum = 0;
  var posOptions = {timeout: 10000, enableHighAccuracy: false};
  var location = $cordovaGeolocation.getCurrentPosition(posOptions);
  location.then(function (position) {
      var latitude  = position.coords.latitude;
      var longitude = position.coords.longitude;

      console.log(latitude);
      console.log(longitude);

      // JSON.parse('https://api.soleo.com/businesses?Category=Restaurants&Latitude=' + latitude + '&Longitude=' + longitude + '&Radius=10&APIKey=hnqee6js7rekm8txj7p6fqbw', function(k, v) {
      //   console.log("test " + k);
      //   return v;
      // });

      var url = 'https://api.soleo.com/businesses?Category=Restaurants&Latitude=' + latitude + '&Longitude=' + longitude + '&Radius=10&APIKey=hnqee6js7rekm8txj7p6fqbw';

      $.getJSON(url,function(data) { dataResponse(data.businesses); });
    }, function(err) {
      // error
    });
  //function dataResponse(data) { listing = data; console.log(listing); };
  function dataResponse(data) {
    for (i = 0; i < data.length; i++) {
      $scope.listing[i] = data[i];
      console.log($scope.listing[i]);
      console.log(data[i]);
      listNum++;
    }
  };
})

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
