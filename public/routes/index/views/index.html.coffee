div '.container.full-screen', 'ng-controller':'IndexCtrl', ->
  div '.row.tall', ->
    div '.col-md-3', ->
      h2 ->
        a href:'/', 'Topo Experiments'
      ul '.nav.nav-stacked.nav-pills.nav-pills.square', ->
        li 'ng-class':"{active: state.current.name=='index.basic-properties'}", ->
          a href:'/basic-properties', 'Basic Properties'
        li 'ng-class':"{active: state.current.name=='index.custom-vertices'}", ->
          a href:'/custom-vertices', 'Custom Vertices'
        li 'ng-class':"{active: state.current.name=='index.add-shapes'}", ->
          a href:'/add-shapes', 'Add Shapes'
    div '.col-md-9.tall', ->
      div '.full-screen', 'ui-view':' ', ->