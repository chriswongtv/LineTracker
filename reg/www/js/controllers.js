angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
  var reservationHandler = new WaitingListHandler();


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
