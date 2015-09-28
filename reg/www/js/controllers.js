angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http) {
  var reservationHandler = new WaitingListHandler();


 function netcodeOPS(){}

netcodeOPS.prototype.sendMessage = function (appID, apiKey, contentType, channelName, message){

  var req = 
  {
      method: 'POST',
      url: ('https://prod-mmx-001.magnet.com:5221/mmxmgmt/api/v1/topics/' + channelName + '/publish'),
      data: '{"content": {"message":" ' + message + ' ", "messageType":"normal", "contentType":"text" }}',
      headers: {
      'X-mmx-app-id': appID,
      'X-mmx-api-key': apiKey,
      'Content-Type': contentType
    }
  }

  $http(req).
  success(function(data, status, headers, config) 
  {
      console.log("success23124");
  }).
  error(function(data, status, headers, config) 
  {
      //error
  });
  // //The url we want is `www.nodejitsu.com:1337/`
  // var options = {
  //   protocol: 'https',
  //   host: 'prod-mmx-001.magnet.com',
  //   path: '/mmxmgmt/api/v1/topics/' + channelName + '/publish',
  //   //since we are listening on a custom port, we need to specify it by hand
  //   port: '5221',

  //   headers: {
  //     'X-mmx-app-id': '' + appID + '',
  //     'X-mmx-api-key': '' + apiKey + '',
  //     'Content-Type': '' + contentType + '',

  //   },

  //   //This is what changes the request to a POST request
  //   method: 'POST'
  // };

  // callback = function(response) {
  //   var str = ''
  //   response.on('data', function (chunk) {
  //     str += chunk;
  //   });

  //   response.on('end', function () {
  //     console.log(str);//output
  //   });
  // }
  // var req = http.request(options, callback);
  // //This is the data we are posting, it needs to be a string or a buffer
  // req.write( '{"content": {"message":" ' + message + ' ", "messageType":"normal", "contentType":"text" }}' );//********maybe same as data
  // req.end();
}

var netOPS = new netcodeOPS();
netOPS.sendMessage('gudif1h0wj3', 
  '69a7082d-b1f6-4c28-8f5d-2412da584590', 
  'application/json',
  'testtopic4',
  'welcome from nodeJS -CanY');


  $scope.addCount = function(inPartyName, inPartySize) {
    var url = 'https://prod-mmx-001.magnet.com:5221/mmxmgmt/api/v1/topics';
    var currentName;

    reservationHandler.addReservation(new Reservation(inPartyName, inPartySize));
  };
  
  <!-- class -->
  function Reservation(inName, inPartySize) {
    <!-- variables -->
    this.username = inName;
    this.partySize = inPartySize;
    this.waitTime = 0;
    this.posInQueue = 0;
  }
    

    <!-- constructor -->
    Reservation.prototype = {
      constructor: Reservation,
      //this.username = inName;
      //this.partySize = inPartySize;
      //console.log("constructor called");
    };
    <!-- functions -->
    Reservation.prototype.getWaitTime = function (){
      calculateWaitTime();
      return this.waitTime;
    };

    Reservation.prototype.setPosInQueue = function (inPosInQueue){
      this.posInQueue = inPosInQueue;
    };

    Reservation.prototype.calculateWaitTime = function () {
      this.waitTime = (this.posInQueue)*10;
    };
  
    <!-- class -->
    function WaitingListHandler(){}
      WaitingListHandler.prototype.waitingListQueue = [];
      WaitingListHandler.prototype.waitingListSearchKeys = [];
      WaitingListHandler.prototype.numOfReservations = 0;

      WaitingListHandler.prototype.updateQueuePositions = function (){
        for(var i = 0; i < this.numOfReservations; i++){
          this.waitingListQueue[i].setPosInQueue(i+1);
          this.waitingListQueue[i].calculateWaitTime();
        }
      };
      WaitingListHandler.prototype.removeReservation = function (name){
        var targetIndex = this.waitingListSearchKeys.indexOf(name);
        var target = this.waitingListQueue[targetIndex];

        <!-- remove item from both arrays -->
        this.waitingListQueue.splice(targetIndex, 1);
        this.waitingListSearchKeys.splice(targetIndex, 1);

        <!-- decrement the number of reservations -->
        this.numOfReservations--;
        this.updateQueuePositions();
        return target;
      };
      WaitingListHandler.prototype.addReservation = function (reservation){
        this.waitingListQueue.push(reservation);
        this.waitingListSearchKeys.push(reservation.username);
        this.numOfReservations++;
        this.updateQueuePositions();
      };
  // $.post(url, data, function(response) {
  //   console.log('POST request success');
  // }, 'json');
})

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
