angular.module 'app.directives', []

angular.module 'app.directives'
	.directive 'loginForm', () ->
		restrict: 'AE'
		link: (scope, el, attrs) ->

angular.module 'app.directives'
	.directive 'keyPoints', (mainService) ->
		restrict: 'AE'
		link: (scope, el, attrs) ->
			scope.keypoints = mainService.getKeyPoints()
			
angular.module 'app.directives'
	.directive 'zooSlides', ($timeout, mainService) ->
		restrict: 'AE'
		link: (scope, el, attrs) ->
			
			# ^ * < ============================== > * ^ #
			# oOo | = 'Touch' handling for MOUSE = | oOo #
			# ^ * < ============================== > * ^ #

			mouseTouchHandler = () ->

				angular.element(el).on 'dragstart', (e) ->				
					scope.$broadcast 'zooSlides:dragstart'				
					scope.zoo_slides_data.dragstart = e.clientX				
					scope.zoo_slides_data.current_translate = parseInt(angular.element(el).css('transform').toString().match(/-{0,1}\d+/))
					angular.element(el).removeClass 'transition-all-5000ms'				
					mainService.preventDefault(e)

				angular.element(el).on 'mousemove', (e)	->				
					if scope.zoo_slides_data.drag_in_progress					
						scope.zoo_slides_data.drag_distance = ((scope.zoo_slides_data.dragstart - e.clientX)*-1)					
						if scope.zoo_slides_data.drag_distance < 0						
							scope.zoo_slides_data.drag_direction = 'right'					
						else						
							scope.zoo_slides_data.drag_direction = 'left'					
						drag_distance = scope.zoo_slides_data.current_translate + scope.zoo_slides_data.drag_distance

						angular.element @
							.css 'transform', 'translate(' + (drag_distance) + 'px)'
						
						scope.zoo_slides_data.drag_distance = drag_distance

				angular.element(el).on 'mouseleave mouseup', (e) ->
					
					if scope.zoo_slides_data.drag_in_progress						
						
						scope.$broadcast 'zooSlides:dragend'
						scope.zoo_slides_data.dragend = e.clientX

				scope.$on 'zooSlides:dragend', () ->				
					
					scope.zoo_slides_data.drag_in_progress = false					
					
					scope.selected_zoo_slide = 0				
					combined_slide_widths = 0
					
					for key, slide of scope.zoo_slides
						slide.active = false
					
					scope.selected_zoo_slide = null				
					for key, slide of scope.zoo_slides					
						combined_slide_widths += slide.offsetWidth					
						if combined_slide_widths >= scope.ZOO_SLIDES_PIVOT_POINT-scope.zoo_slides_data.drag_distance						
							scope.selected_zoo_slide = slide.index						
							scope.zoo_slides[key].active = true							
							break	

					if !scope.selected_zoo_slide?
						last_slide_key = Object.keys(scope.zoo_slides).length-1
						scope.zoo_slides[last_slide_key].active = true
						scope.selected_zoo_slide = scope.zoo_slides[last_slide_key]					
					
					scope.$apply()			
					
					scope.shiftZooSlides scope.selected_zoo_slide				
				
				scope.$on 'zooSlides:dragstart', () ->				
					
					scope.zoo_slides_data.drag_in_progress = true

			mouseTouchHandler()		

			scope.shiftZooSlides = (index) ->
				angular.element(el).addClass 'transition-all-5000ms'
				translate_amount = 0
				for key, val of scope.zoo_slides
					if key <= index						
						additional = if parseInt(key) == index then val.offsetWidth/2 else val.offsetWidth						
						translate_amount += additional				
				for prop, val of scope.zoo_slides						
					if val.index == index
						val.active = true
					else
						val.active = false
				angular.element(el).css('transform', 'translate(' + (scope.ZOO_SLIDES_PIVOT_POINT-translate_amount) + 'px)')
				return true
			init = () ->				
				for key, val of scope.zoo_slides
					if val.active == true
						scope.shiftZooSlides val.index
			$timeout () ->				
				slides = document.querySelectorAll('[zoo-slide]')
				scope.ZOO_SLIDES_PIVOT_POINT = 0				
				for slide, i in slides					
					scope.ZOO_SLIDES_PIVOT_POINT += slide.offsetWidth
					scope.zoo_slides[i].offsetWidth = slide.offsetWidth
				scope.ZOO_SLIDES_PIVOT_POINT = scope.ZOO_SLIDES_PIVOT_POINT / 2
				init()
			
angular.module 'app.directives'
	.directive 'appHeader', (mainService) ->
		restrict: 'AE'
		link: (scope, el, attrs) ->			
			document.addEventListener 'scroll', () ->
				scope.scrollTop = mainService.scrollTop()				
				if scope.scrollTop > 1					
					el.addClass 'mobile-menu-active'
				else
					el.removeClass 'mobile-menu-active'
