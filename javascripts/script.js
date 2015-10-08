angular.module('ListApp', [
  'ListApp.controllers'
]);
angular.module('ListApp.controllers', []).
controller('ListController', function($scope) {
    $scope.todoList = [
      {
        name: "default1"
      },
      {
        name: "default2"
      }
    ];

  $scope.deleteItem = function(index) {
    console.log("delete item:" + index);
    $scope.todoList.splice(index, 1);
  };

  $scope.addItem = function(todoItem) {
    $scope.todoList.push({name: todoItem});
  };
});