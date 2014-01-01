app.config ($stateProvider) ->
  $stateProvider.state 'index',
    url: '/'
    templateUrl: '/routes/index/views/index.html'

  $stateProvider.state 'index.basic-properties',
    url: 'basic-properties'
    templateUrl: '/routes/1-basic-properties/views/basic-properties.html'

  $stateProvider.state 'index.custom-vertices',
    url: 'custom-vertices'
    templateUrl: '/routes/2-custom-vertices/views/custom-vertices.html'

  $stateProvider.state 'index.generic-shapes',
    url: 'generic-shapes'
    templateUrl: '/routes/3-generic-shapes/views/generic-shapes.html'
