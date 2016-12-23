angular.module('app.routes', [])
    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'menu.html',
                controller: 'AppCtrl',
                resolve: {
                    // controller will not be loaded until $requireSignIn resolves
                    // Auth refers to our $firebaseAuth wrapper in the example above
                    "currentAuth": [
                        'Auth', function (Auth) {
                            // $requireSignIn returns a promise so the resolve waits for it to complete
                            // If the promise is rejected, it will throw a $stateChangeError 
                            return Auth.$requireSignIn();
                        }
                    ]
                }
            })
            .state('app.rooms', {
                url: '/rooms',
                views: {
                    'menuContent': {
                        templateUrl: 'chat/room-list.html',
                        controller: 'ListChatRoomCtrl'
                    }
                }
            })
            .state('app.room', {
                url: '/rooms/:roomId',
                views: {
                    'menuContent': {
                        templateUrl: 'chat/room.html',
                        controller: 'RoomCtrl'
                    }
                }
            })
            .state('app.dashboard', {
                url: '/dashboard',
                views: {
                    'menuContent': {
                        templateUrl: 'dashboard.html',
                        controller: 'DashCtrl'
                    }
                }
            })
            .state('app.account', {
                url: '/account',
                views: {
                    'menuContent': {
                        templateUrl: 'auth/account.html',
                        controller: 'AccountCtrl'
                    }
                }
            })
            .state('signIn', {
                url: '/signin',
                templateUrl: 'auth/signin.html',
                controller: 'SignInCtrl'
            })
            .state('create', {
                url: '/create',
                templateUrl: 'auth/create.html',
                controller: 'CreateUserCtrl'
            });
        $urlRouterProvider.otherwise(function ($injector, $location) {
            var $state = $injector.get("$state");
            $state.go("app.dashboard");
        });

    });
