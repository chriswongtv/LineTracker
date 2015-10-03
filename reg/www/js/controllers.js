angular.module('reg.controllers', [])

.controller('DashCtrl', function($scope, $ionicPopup) {
  // <!-- class -->
  function Reservation(inName, inPartySize) {
    // <!-- variables -->
    this.username = inName;
    this.partySize = inPartySize;
    this.waitTime = 0;
    this.posInQueue = 0;
  }
    

    // <!-- constructor -->
    Reservation.prototype = {
      constructor: Reservation,
      //this.username = inName;
      //this.partySize = inPartySize;
      //console.log("constructor called");
    };
    // <!-- functions -->
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
  
    // <!-- class -->
    function WaitingListHandler() {}

      WaitingListHandler.prototype.waitingListQueue = [];
      WaitingListHandler.prototype.waitingListSearchKeys = [];
      WaitingListHandler.prototype.numOfReservations = 0;

      WaitingListHandler.prototype.getWaitTime = function() {
        return this.numOfReservations * 10;
      }

      WaitingListHandler.prototype.updateQueuePositions = function (){
        for(var i = 0; i < this.numOfReservations; i++) {
          this.waitingListQueue[i].setPosInQueue(i+1);
          this.waitingListQueue[i].calculateWaitTime();
        }
      };
      WaitingListHandler.prototype.removeReservation = function (name){
        var targetIndex = this.waitingListSearchKeys.indexOf(name);
        var target = this.waitingListQueue[targetIndex];

        // <!-- remove item from both arrays -->
        this.waitingListQueue.splice(targetIndex, 1);
        this.waitingListSearchKeys.splice(targetIndex, 1);

        // <!-- decrement the number of reservations -->
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
  
  $scope.reservationHandler = new WaitingListHandler();

  $scope.addCount = function(inPartyName, inPartySize) {
    //console.log(inPartyName + ' ' + inPartySize);

    $scope.reservationHandler.addReservation(new Reservation(inPartyName, inPartySize));
    // var link = 'https://prod-mmx-001.magnet.com:5221/mmxmgmt/api/v1/topics?topicName=test';
    // var JSonData = '{"content":"I would like to recommend a new restaurant to you all", "messageType":"normal","contentType":"text"}';
    // $.ajax({
    //    url : link,
    //    data : JSON.stringify(JSonData),
    //    type : 'POST',
    //    contentType : "application/json",
    //    dataType : 'json',
    //    success : function(Result) {
    //     console.log('success');
    //    },
    //    beforeSend: function (xhr) {
    //       xhr.setRequestHeader('X-mmx-app-id', 'gudif1h0wj3');
    //       xhr.setRequestHeader('X-mmx-api-key', '69a7082d-b1f6-4c28-8f5d-2412da584590');
    //    },
    //    error: function (RcvData, error) {
    //       console.log(RcvData);
    //    }
  }

  $scope.showAlert = function() {
    var time = $scope.reservationHandler.getWaitTime();
    var alertPopup = $ionicPopup.alert({
       title: 'Estimated Waiting Time',
       template: '<center>' + time + ' minutes</center>'
     });
  }

  $scope.removeUser = function(name) {
    $scope.reservationHandler.removeReservation(name);
  }
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
