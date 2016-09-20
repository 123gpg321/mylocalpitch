angular.module('app.directives', []);

angular.module('app.directives').directive('loginForm', function() {
  return {
    restrict: 'AE',
    link: function(scope, el, attrs) {}
  };
});

angular.module('app.directives').directive('keyPoints', function(mainService) {
  return {
    restrict: 'AE',
    link: function(scope, el, attrs) {
      return scope.keypoints = mainService.getKeyPoints();
    }
  };
});

angular.module('app.directives').directive('zooSlides', function($timeout, mainService) {
  return {
    restrict: 'AE',
    link: function(scope, el, attrs) {
      var init, mouseTouchHandler;
      mouseTouchHandler = function() {
        angular.element(el).on('dragstart', function(e) {
          scope.$broadcast('zooSlides:dragstart');
          scope.zoo_slides_data.dragstart = e.clientX;
          scope.zoo_slides_data.current_translate = parseInt(angular.element(el).css('transform').toString().match(/-{0,1}\d+/));
          angular.element(el).removeClass('transition-all-5000ms');
          return mainService.preventDefault(e);
        });
        angular.element(el).on('mousemove', function(e) {
          var drag_distance;
          if (scope.zoo_slides_data.drag_in_progress) {
            scope.zoo_slides_data.drag_distance = (scope.zoo_slides_data.dragstart - e.clientX) * -1;
            if (scope.zoo_slides_data.drag_distance < 0) {
              scope.zoo_slides_data.drag_direction = 'right';
            } else {
              scope.zoo_slides_data.drag_direction = 'left';
            }
            drag_distance = scope.zoo_slides_data.current_translate + scope.zoo_slides_data.drag_distance;
            angular.element(this).css('transform', 'translate(' + drag_distance + 'px)');
            return scope.zoo_slides_data.drag_distance = drag_distance;
          }
        });
        angular.element(el).on('mouseleave mouseup', function(e) {
          if (scope.zoo_slides_data.drag_in_progress) {
            scope.$broadcast('zooSlides:dragend');
            return scope.zoo_slides_data.dragend = e.clientX;
          }
        });
        scope.$on('zooSlides:dragend', function() {
          var combined_slide_widths, key, last_slide_key, ref, ref1, slide;
          scope.zoo_slides_data.drag_in_progress = false;
          scope.selected_zoo_slide = 0;
          combined_slide_widths = 0;
          ref = scope.zoo_slides;
          for (key in ref) {
            slide = ref[key];
            slide.active = false;
          }
          scope.selected_zoo_slide = null;
          ref1 = scope.zoo_slides;
          for (key in ref1) {
            slide = ref1[key];
            combined_slide_widths += slide.offsetWidth;
            if (combined_slide_widths >= scope.ZOO_SLIDES_PIVOT_POINT - scope.zoo_slides_data.drag_distance) {
              scope.selected_zoo_slide = slide.index;
              scope.zoo_slides[key].active = true;
              break;
            }
          }
          if (scope.selected_zoo_slide == null) {
            last_slide_key = Object.keys(scope.zoo_slides).length - 1;
            scope.zoo_slides[last_slide_key].active = true;
            scope.selected_zoo_slide = scope.zoo_slides[last_slide_key];
          }
          scope.$apply();
          return scope.shiftZooSlides(scope.selected_zoo_slide);
        });
        return scope.$on('zooSlides:dragstart', function() {
          return scope.zoo_slides_data.drag_in_progress = true;
        });
      };
      mouseTouchHandler();
      scope.shiftZooSlides = function(index) {
        var additional, key, prop, ref, ref1, translate_amount, val;
        angular.element(el).addClass('transition-all-5000ms');
        translate_amount = 0;
        ref = scope.zoo_slides;
        for (key in ref) {
          val = ref[key];
          if (key <= index) {
            additional = parseInt(key) === index ? val.offsetWidth / 2 : val.offsetWidth;
            translate_amount += additional;
          }
        }
        ref1 = scope.zoo_slides;
        for (prop in ref1) {
          val = ref1[prop];
          if (val.index === index) {
            val.active = true;
          } else {
            val.active = false;
          }
        }
        angular.element(el).css('transform', 'translate(' + (scope.ZOO_SLIDES_PIVOT_POINT - translate_amount) + 'px)');
        return true;
      };
      init = function() {
        var key, ref, results, val;
        ref = scope.zoo_slides;
        results = [];
        for (key in ref) {
          val = ref[key];
          if (val.active === true) {
            results.push(scope.shiftZooSlides(val.index));
          } else {
            results.push(void 0);
          }
        }
        return results;
      };
      return $timeout(function() {
        var i, j, len, slide, slides;
        slides = document.querySelectorAll('[zoo-slide]');
        scope.ZOO_SLIDES_PIVOT_POINT = 0;
        for (i = j = 0, len = slides.length; j < len; i = ++j) {
          slide = slides[i];
          scope.ZOO_SLIDES_PIVOT_POINT += slide.offsetWidth;
          scope.zoo_slides[i].offsetWidth = slide.offsetWidth;
        }
        scope.ZOO_SLIDES_PIVOT_POINT = scope.ZOO_SLIDES_PIVOT_POINT / 2;
        return init();
      });
    }
  };
});

angular.module('app.directives').directive('appHeader', function(mainService) {
  return {
    restrict: 'AE',
    link: function(scope, el, attrs) {
      return document.addEventListener('scroll', function() {
        scope.scrollTop = mainService.scrollTop();
        if (scope.scrollTop > 1) {
          return el.addClass('mobile-menu-active');
        } else {
          return el.removeClass('mobile-menu-active');
        }
      });
    }
  };
});
