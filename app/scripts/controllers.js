'use strict';

angular.module('ionic-hoodie')
.controller('PetIndexCtrl', function($scope) {
  var hoodie = new Hoodie();
  hoodie.account.signUp('joe@example.com', 'secret');
  hoodie.account.signIn('joe@example.com', 'secret');

  function refresh() {
    hoodie.store.findAll().done(function(pets) {
      $scope.pets = pets;
    });
  }

  hoodie.remote.on('change', function (eventName, changedObject) {
    refresh();
    $scope.$apply();
  });

  $scope.addPet = function() {
    hoodie.store.add('pets', {name: $scope.newPetName})
    .done(function(newPet) {
      $scope.pets.push(newPet);
    });
  };

  $scope.removePet = function(index) {
    var pet = $scope.pets[index];
    hoodie.store.remove('pets', pet.id)
    .done(function() {
      $scope.pets.splice(index, 1);
    });
  };

  refresh();
});
