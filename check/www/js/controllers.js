angular.module('starter.controllers', [])

.controller('RestaurantsCtrl', function($scope, $cordovaGeolocation) {
  // document.addEventListener("deviceready", function () {
  //   $cordovaPlugin.someFunction().then(success, error);
  // }, false);

  var posOptions = {timeout: 10000, enableHighAccuracy: false};
  var location = $cordovaGeolocation.getCurrentPosition(posOptions);
  location.then(function (position) {
      var latitude  = position.coords.latitude;
      var longitude = position.coords.longitude;

      console.log(latitude);
      console.log(longitude);

      var url = 'https://api.soleo.com/businesses?Category=Restaurants&Latitude=' + latitude + '&Longitude=' + longitude + '&Radius=20&APIKey=hnqee6js7rekm8txj7p6fqbw';

      $.getJSON(url,function(data) {
        $scope.listing = data.businesses; 
            for (i = 0; i < 7; i++) {
              var radlat1 = Math.PI * latitude/180;
              var radlat2 = Math.PI * $scope.listing[i].latitude/180;
              var radlon1 = Math.PI * longitude/180;
              var radlon2 = Math.PI * $scope.listing[i].longitude/180;
              var theta = longitude-$scope.listing[i].longitude;
              var radtheta = Math.PI * theta/180;
              var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
              dist = Math.acos(dist);
              dist = dist * 180/Math.PI;
              dist = dist * 60 * 1.1515;
              dist = dist.toFixed(2);

              var list = document.getElementById('listing').innerHTML + '<div class="list card"><div class="item"><h2>' + $scope.listing[i].name + '</h2><p>' + $scope.listing[i].address + " " + $scope.listing[i].city + " " + $scope.listing[i].state + " " + $scope.listing[i].zip + '</p></div><a class="item item-icon-left assertive" href="#"><i class="icon ion-android-navigate"></i>Navigate (' + dist + ' miles)</a>';
              document.getElementById('listing').innerHTML = list;
              }
      });
  }, function(err) {
    // error
  });

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
