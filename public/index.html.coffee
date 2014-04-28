doctype 5
html 'ng-controller':'bxCtrl', ->
  head ->
    title 'Topolabs | 3D Rendering + Printing'
    meta name:'description', content:'Topolabs | 3D Rendering + Printing'
    meta charset:'utf-8'
    base href:'/'
    link media:'screen', rel:'stylesheet', href:'/assets/css/app.css'
    link media:'screen', rel:'stylesheet', href:'/assets/vendor/bootstrap/dist/css/bootstrap.css'
    link media:'screen', rel:'stylesheet', href:'/assets/vendor/bootflat/css/bootflat-extensions.css'
    link media:'screen', rel:'stylesheet', href:'/assets/vendor/bootflat/css/bootflat-square.css'
    link media:'screen', rel:'stylesheet', href:'/assets/vendor/ngToolboxx/dist/css/ngToolboxx.css'
    script src:'/assets/vendor/jquery/jquery.js'
    script src:'/assets/vendor/bootstrap/dist/js/bootstrap.js'
    script src:'/assets/vendor/angular/angular.js'
    script src:'/assets/vendor/angular-ui-router/release/angular-ui-router.js'
    script src:'/assets/vendor/angular-resource/angular-resource.js'
    script src:'/assets/vendor/ngToolboxx/dist/js/ngToolboxx.js'
    script src:'/assets/vendor/three.js/build/three.js'
    script src:'/assets/vendor/three.js/lib/ConvexGeometry.js'
    script src:'/assets/vendor/three.js/lib/STLLoader.js'
    script src:'/assets/vendor/three.js/lib/Detector.js'
    script src:'/assets/vendor/three.js/lib/stats.min.js'
    script src:'/assets/vendor/three.js/lib/dat.gui.min.js'
    script src:'/assets/vendor/three.js/lib/OBJLoader.js'
    script src:'/assets/vendor/three.js/lib/TrackballControls.js'
    script src:'/assets/vendor/three.js/lib/OrbitControls.js'
    script src:'/assets/vendor/three.js/lib/Plane.js'
    script src:'/assets/js/app.js'
    '''
    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="/assets/bootflat/js/html5shiv.js"></script>
      <script src="/assets/bootflat/js/respond.min.js"></script>
    <![endif]-->
    '''
  body '.full-screen',  ->
    div '.notification-container.ng-cloak', ->
      div class:'alert alert-dismissable alert-{{notification.type}}',
      'ng-repeat':'notification in notifications', ->
        button '.close', type:'button', 'aria-hidden':'true',
        'ng-click':'removeNotification($index)', ->
          text '&times;'
        text '{{notification.message}}'

    div '.loading-container.ng-cloak', 'ng-class':'{hidden: queue.length == 0}', ->

    div '.container.full-screen', ->
      div '.row.tall', ->
        div '.col-md-3', ->
            h2 ->
              a href:'/', 'Topo Experiments'
            ul '.nav.nav-stacked.nav-pills', ->
              li 'ng-class':"{active: bxState.current.name=='trackball-camera'}", ->
                a href:'/trackball-camera', 'Trackball Camera'
              li 'ng-class':"{active: bxState.current.name=='add-shapes'}", ->
                a href:'/add-shapes', 'Add Shapes'
              li 'ng-class':"{active: bxState.current.name=='custom-vertices'}", ->
                a href:'/custom-vertices', 'Custom Vertices'
              li 'ng-class':"{active: bxState.current.name=='convex-geometry'}", ->
                a href:'/convex-geometry', 'Convex Geometry'
              li 'ng-class':"{active: bxState.current.name=='basic-properties'}", ->
                a href:'/basic-properties', 'Basic Properties (Cube)'
              li 'ng-class':"{active: bxState.current.name=='basic-properties-sphere'}", ->
                a href:'/basic-properties-sphere', 'Basic Properties (Sphere)'
              li 'ng-class':"{active: bxState.current.name=='advanced-properties-sphere'}", ->
                a href:'/advanced-properties-sphere', 'Advanced Properties (Sphere)'
              li 'ng-class':"{active: bxState.current.name=='grid-stack'}", ->
                a href:'/grid-stack', 'Grid Stack'
              li 'ng-class':"{active: bxState.current.name=='select-shapes'}", ->
                a href:'/select-shapes', 'Select Shapes'
              li 'ng-class':"{active: bxState.current.name=='drag-shapes'}", ->
                a href:'/drag-shapes', 'Drag Shapes'
        div '.col-md-9.tall', ->
          div '.full-screen', 'ui-view':' ', ->

    div '.clear-20', ->
