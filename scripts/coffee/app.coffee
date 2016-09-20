paths = [
	'js/vendor/jquery.js',
	'js/controllers.js',
	'js/services.js',
	'js/directives.js'
]
require_config_paths = {}
for path in paths
	require_config_paths[path] = path
console.log require_config_paths
require.config
	paths: require_config_paths
	shim:
		'angular':
			exports: 'angular'
require(paths,
	() ->		
		angular.module 'app', ['app.controllers', 'app.services', 'app.directives']	
		.config ($rootScopeProvider) ->
		angular.bootstrap document, ['app']
)