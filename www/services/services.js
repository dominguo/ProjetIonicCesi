angular.module('app.services', [])
    .factory('Auth', [
        '$firebaseAuth',
        function ($firebaseAuth) {
            return $firebaseAuth();
        }
    ])
    .factory('User', function ($firebaseObject, $firebaseArray) {
        return {
            getUserNameByUid: function (uid) {
                var ref = firebase.database().ref('users/' + uid);
                
                // access additional user info in the database via profile
               return $firebaseObject(ref).name;
            }
        }
    })
    .factory('Chats', function () {
      // Might use a resource here that returns a JSON array

      // Some fake testing data
      var chats = [{
          id: 0,
          name: 'Ben Sparrow',
          lastText: 'You on your way?',
          face: 'img/ben.png'
      }, {
          id: 1,
          name: 'Max Lynx',
          lastText: 'Hey, it\'s me',
          face: 'img/max.png'
      }, {
          id: 2,
          name: 'Adam Bradleyson',
          lastText: 'I should buy a boat',
          face: 'img/adam.jpg'
      }, {
          id: 3,
          name: 'Perry Governor',
          lastText: 'Look at my mukluks!',
          face: 'img/perry.png'
      }, {
          id: 4,
          name: 'Mike Harrington',
          lastText: 'This is wicked good ice cream.',
          face: 'img/mike.png'
      }];

      return {
          all: function () {
              return chats;
          },
          remove: function (chat) {
              chats.splice(chats.indexOf(chat), 1);
          },
          get: function (chatId) {
              for (var i = 0; i < chats.length; i++) {
                  if (chats[i].id === parseInt(chatId)) {
                      return chats[i];
                  }
              }
              return null;
          }
      };
  })
    .factory('Message', function ($firebaseObject) {
        return {
            all: function (roomId) {
                var messages = $firebaseObject(firebase.database().ref('room/' + roomId + "/message"));
                return messages;
            },
            add: function (roomId, content, userId, userName) {
                
                var message = {
                    "user_id": userId,
                    "content": content,
                    "created_at": Date.now(),
                    "user_name": userName};
               firebase.database().ref('room/' + roomId + "/message").push(message);
                return message;
            }

        }
    })
    .factory('Rooms', function ($firebaseObject) {
    return {
        all: function () {
            return $firebaseObject(firebase.database().ref('room'));
        },
        get: function (roomId) {
            console.log(roomId);
            return $firebaseObject(firebase.database().ref('room/' + roomId));;
        },
        add: function (title, slug, description, userId) {
            var id = Math.floor(Math.random() * 5000001);
            var newRoom = {
                "id": id,
                "creation-date": Date.now(),
                "creator-name": userId,
                "description": description,
                "img": "test / img",
                "message": {},
                "slug": slug,
                "title": title
            };
            firebase.database().ref('room/' + id).set(newRoom);
            return id;
        }
    }

  });