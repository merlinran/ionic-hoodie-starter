'use strict';

angular.module('ionic-hoodie')
.controller('PetIndexCtrl', function($scope) {
  var hoodie = new Hoodie();
  hoodie.store.findAll().done(function(pets) {
    $scope.pets = pets;
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
});
