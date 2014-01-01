app.controller 'IndexCtrl', [
  '$scope', '$state', 'bxSocket', 'bxNotify', 'bxLogger'
  ($scope, $state, Socket, Notify, Logger) ->
    $scope.state = $state

    apply = (scope, fn) ->
      if scope.$$phase or scope.$root.$$phase
        fn()
      else
        scope.$apply fn
]
