angular.module 'app.services', []

angular.module 'app.services'
	.factory 'mainService', () ->
		getKeyPoints: () ->
			'0': 
				title: 'Destroy in seconds'
				description: 'Daar er woud heen te. Eigenaars in ad uitgaande afscheidt. Zelfs ze geest de meter eerst thans.'
				image_url: 'http://placehold.it/150x150/66a5ff/ffffff'
			'1': 
				title: 'ABC Conformance'
				description: ' Grayah lengte mijnen dat groeit ook men men. Caoutchouc onderlinge dividenden wantrouwen opgegraven meesleuren en al of.'
				image_url: 'http://placehold.it/150x150/66a5ff/ffffff'
			'2': 
				title: 'Simple Hay is Why'
				description: 'Behoorden nam voorspoed inlandsen heb rug wellesley ontgonnen mag. Ad ik onzer perak eigen maakt juist ze te onder.'
				image_url: 'http://placehold.it/150x150/66a5ff/ffffff'
			'3': 
				title: 'Highly suspicious mortgage'
				description: ' Doel vast vrij te land en ging zeer er. Ruimer boomen mijnen in eerste daarin kintya en.'
				image_url: 'http://placehold.it/150x150/66a5ff/ffffff'
			'4': 
				title: 'Lightning strikes network'
				description: 'Hoeveel hiertoe op ad ze de geweest besluit sneller schenen. Van allen als zeven het negri uit markt ouden.'
				image_url: 'http://placehold.it/150x150/66a5ff/ffffff'
			'5': 
				title: 'Elephants eat trees'
				description: 'Dal dit rijk diep jaar veel hout. Tin zes dat twisten aardige are houweel. Die had beschaving zes inspanning verdwijnen men.'
				image_url: 'http://placehold.it/150x150/66a5ff/ffffff'

		scrollTop: () ->
			return document.body.scrollTop || $(document).scrollTop()

		preventDefault: (e) ->
			e.preventDefault() if e.preventDefault
			e.stopPropagation() if e.stopPropagation
							    