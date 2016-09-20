var i, len, path, paths, require_config_paths;

paths = ['js/vendor/jquery.js', 'js/controllers.js', 'js/services.js', 'js/directives.js'];

require_config_paths = {};

for (i = 0, len = paths.length; i < len; i++) {
  path = paths[i];
  require_config_paths[path] = path;
}

console.log(require_config_paths);

require.config({
  paths: require_config_paths,
  shim: {
    'angular': {
      exports: 'angular'
    }
  }
});

require(paths, function() {
  angular.module('app', ['app.controllers', 'app.services', 'app.directives']).config(function($rootScopeProvider) {});
  return angular.bootstrap(document, ['app']);
});
