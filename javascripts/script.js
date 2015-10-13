angular.module('ListApp', [
  'ListApp.controllers'
]);
angular.module('ListApp.controllers', []).
controller('ListController', function($scope) {
  Parse.initialize("hwuCW86Rrccf475zyfz5yGDRPxId0bx5SqkLAYq9", "GeNguXVS4H8IV66CpHujoYm7HBo7lGtvgxMvnDCv");
  var TodoObject = Parse.Object.extend("TodoObject");
  var query = new Parse.Query(TodoObject);
  $scope.todoList = [];

  $scope.deleteItem = function(index) {
    console.log("delete item:" + JSON.stringify($scope.todoList[0]));

    query.get($scope.todoList[index].objectId, {
      success: function(todo) {
        todo.destroy({
          success: function(result) {
            console.log("destroy success:" + JSON.stringify(result));
            $scope.$evalAsync(function() {
              $scope.todoList.splice(index, 1);
            });
          },
          error: function(object, error) {
            console.log("destroy fail");
          }
        });
      },
      error: function(object, error) {
        // The object was not retrieved successfully.
        // error is a Parse.Error with an error code and message.
      }
    });
  };

  $scope.addItem = function(todoItem) {
    $scope.todoList.push({name: todoItem});

    var TodoObject = Parse.Object.extend("TodoObject");
    var todoObject = new TodoObject();
    todoObject.save({name: todoItem}).then(function(result) {
      console.log("add todo item response:" + JSON.stringify(result));
    });
  };

  query.find( {
    success: function(result) {
      var todolist = [];
      // console.log("result:" + JSON.stringify(result));
      result.forEach(function(todo) {
          todolist.push({name: todo.get("name"), objectId: todo.id});
      });

      $scope.$evalAsync(function() {
        $scope.todoList = todolist;
        console.log("todo list:" + JSON.stringify($scope.todoList));
      });
    },
    error: function(object, error) {
      console.log("find error");
      // The object was not retrieved successfully.
      // error is a Parse.Error with an error code and message.
    }
  });
});