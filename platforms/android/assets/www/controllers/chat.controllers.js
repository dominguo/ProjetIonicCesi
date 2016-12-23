angular.module('chat.controllers', [])
    .controller('ListChatRoomCtrl', function ($scope, Rooms, $timeout, $ionicModal, $ionicLoading) {
        $scope.auth.$onAuthStateChanged(function (firebaseUser) {
            // access Firebase auth user via signedInUser
            $scope.signedInUser = firebaseUser;
        });

        $scope.rooms = Rooms.all();

        $scope.addNewRoom = function (form, room) {
            if (form.$valid) {
                $ionicLoading.show({
                    template: 'Ajout en cours ...'
                });
            }
            var roomId = Rooms.add(room.title, "", room.description, $scope.signedInUser.uid);

            $ionicLoading.hide();
            $scope.modal.hide();
        }

        $scope.closeModal = function () {
            $scope.modal.hide();
        };
        $ionicModal.fromTemplateUrl('/views/chat/room-new.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.openModal = function () {
            $scope.modal.show();
        };

        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function () {
            $scope.modal.remove();
        });

        $scope.onRefresh = function () {
            var stop = $timeout(function () {
                $scope.$broadcast('scroll.refreshComplete');
            }, 1000);
        };
    })
    .controller('RoomCtrl', function ($scope, $stateParams, Message, Rooms, User) {
        $scope.auth.$onAuthStateChanged(function (firebaseUser) {
            // access Firebase auth user via signedInUser
            $scope.signedInUser = firebaseUser;
        });

        $scope.getUserName = function (uid) {

            return  User.getUserNameByUid(uid);
           
        };

        $scope.newMessage = "";
        $scope.roomInformation = Rooms.get($stateParams.roomId);
        console.log($scope.roomInformation);
        $scope.messages = Message.all($stateParams.roomId);

        $scope.submitAddMessage = function (form, message) {

            var position = geoLocation.getGeolocation();
            Message.add($stateParams.roomId, message.content, $scope.signedInUser.uid, $scope.signedInUser.displayName, position);

            $scope.newMessage = "";
        };

        $scope.onRefresh = function () {
            var stop = $timeout(function () {
                $scope.$broadcast('scroll.refreshComplete');
            }, 1000);
        };
    });