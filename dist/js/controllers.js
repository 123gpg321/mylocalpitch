angular.module('app.controllers', ['app.services']);

angular.module('app.controllers').controller('MainController', function($scope, mainService, $timeout) {
  $scope.scrollTop = 0;
  $scope.selected_price_plan = 'monthly';
  $scope.selected_zoo_slide = 0;
  $scope.switchSelectedPricePlan = function() {
    return $scope.selected_price_plan = $scope.selected_price_plan === 'monthly' ? 'hourly' : 'monthly';
  };
  $scope.zoo_slides_data = {
    dragstart: 0,
    dragend: 0,
    drag_in_progress: false,
    drag_direction: 'left',
    drag_distance: 0,
    current_translate: 0
  };
  return $scope.zoo_slides = {
    '0': {
      index: 0,
      price: {
        monthly: '5',
        hourly: '0.007'
      },
      memory: '512KG',
      cpu: '1 Core',
      hdd: '20GB',
      transfer: '1TB',
      active: false
    },
    '1': {
      index: 1,
      price: {
        monthly: '10',
        hourly: '0.015'
      },
      memory: '1MT',
      cpu: '1 Core',
      hdd: '30GB',
      transfer: '2TB',
      active: false
    },
    '2': {
      index: 2,
      price: {
        monthly: '20',
        hourly: '0.03'
      },
      memory: '2MT',
      cpu: '2 Core',
      hdd: '40GB',
      transfer: '3TB',
      active: true
    },
    '3': {
      index: 3,
      price: {
        monthly: '40',
        hourly: '0.06'
      },
      memory: '4MT',
      cpu: '2 Core',
      hdd: '60GB',
      transfer: '4TB',
      active: false
    },
    '4': {
      index: 4,
      price: {
        monthly: '80',
        hourly: '0.119'
      },
      memory: '4MT',
      cpu: '4 Core',
      hdd: '80GB',
      transfer: '5TB',
      active: false
    }
  };
});
