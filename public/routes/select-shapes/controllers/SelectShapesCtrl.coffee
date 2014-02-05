app.controller 'SelectShapesCtrl', [
  '$scope', '$state', 'bxSocket', 'bxNotify', 'bxLogger'
  ($scope, $state, Socket, Notify, Logger) ->

    createCube = (size, color) ->
      ###
      color = Math.random() * 0xffffff
      console.log 'Got color.', color
      ###

      geometry = new THREE.CubeGeometry size, size, size
      material = new THREE.MeshBasicMaterial
        color: color
        opacity: 0.5
      shape = new THREE.Mesh geometry, material
      shape.name = 'cube-' + scene.children.length
      shape = new THREE.Mesh geometry, material

      return shape

    INTERSECTED = null
    SELECTED = null
    projector = null

    mouse = new THREE.Vector2()
    offset = new THREE.Vector3()

    # container for rendering
    wrap = document.getElementById 'wrap'

    # create scene to hold objects, cameras, and lights
    scene = new THREE.Scene()

    w = $('#wrap').width()
    h = $('#wrap').height()

    # create camera to define perspective
    camera = new THREE.PerspectiveCamera 45, w / h, 0.1, 1000

    # create a renderer and set size
    renderer = new THREE.CanvasRenderer()
    renderer.setClearColor 0xEEEEEE, 1.0
    renderer.setSize w, h

    # create ground plane
    planeGeometry = new THREE.PlaneGeometry 100, 100, 10, 10
    planeMaterial = new THREE.MeshBasicMaterial
      color: 0x333333
      wireframe: true
    plane = new THREE.Mesh planeGeometry, planeMaterial

    # rotate + position the plane
    plane.rotation.x = -0.5 * Math.PI
    plane.position.x = 0
    plane.position.y = 0
    plane.position.z = 0

    # add plane to the scene
    scene.add plane

    # axis helper
    axis = new THREE.AxisHelper 100
    axis.position.x = 0
    axis.position.y = 1
    axis.position.z = 0

    # add axis to scene
    scene.add axis

    # position + point camera to center of the scene
    camera.position.x = -125
    camera.position.y = 100
    camera.position.z = 25
    camera.lookAt scene.position

    ###
    # add subtle ambient lighting
    ambientLight = new THREE.AmbientLight 0x0c0c0c
    scene.add ambientLight
    ###

    ###
    # add spotlight for shadows
    spotLight = new THREE.SpotLight 0xffffff
    spotLight.position.set 0, 100, 0
    spotLight.castShadow = false
    scene.add spotLight
    ###

    # # # # # # # # # #
    # # # # # # # # # #

    color = 13258525.865980228
    shapes = []

    shape = createCube 10, color
    shape.position.x = 5
    shape.position.y = 5
    shape.position.z = 5
    shapes.push shape
    scene.add shape

    shape = createCube 10, color
    shape.position.x = 15
    shape.position.y = 5
    shape.position.z = -35
    shapes.push shape
    scene.add shape

    shape = createCube 10, color
    shape.position.x = -45
    shape.position.y = 5
    shape.position.z = 25
    shapes.push shape
    scene.add shape

    shape = createCube 10, color
    shape.position.x = -15
    shape.position.y = 5
    shape.position.z = 25
    shapes.push shape
    scene.add shape

    shape = createCube 10, color
    shape.position.x = -45
    shape.position.y = 5
    shape.position.z = 45
    shapes.push shape
    scene.add shape

    shape = createCube 10, color
    shape.position.x = -35
    shape.position.y = 5
    shape.position.z = -35
    shapes.push shape
    scene.add shape

    shape = createCube 10, color
    shape.position.x = -25
    shape.position.y = 5
    shape.position.z = -15
    shapes.push shape
    scene.add shape

    shape = createCube 10, color
    shape.position.x = 25
    shape.position.y = 5
    shape.position.z = 35
    shapes.push shape
    scene.add shape

    # selected object
    SELECTED = shape

    select = (newSelected) ->
      # SELECTED = s
      for s in shapes
        s.material = new THREE.MeshBasicMaterial
          color: 0x333
          opacity: 0.5

      SELECTED = newSelected
      SELECTED.material = new THREE.MeshBasicMaterial
        opacity: 0.9
        color: color

    select shape

    # add controls
    controls = new () ->
      @moveUp = () ->
        SELECTED.translateX 10

      @moveDown = () ->
        SELECTED.translateX -10

      @moveLeft = () ->
        SELECTED.translateZ -10

      @moveRight = () ->
        SELECTED.translateZ 10

      return @

    gui = new dat.GUI()
    gui.add controls, 'moveUp'
    gui.add controls, 'moveDown'
    gui.add controls, 'moveLeft'
    gui.add controls, 'moveRight'

    guiContainer = document.getElementById 'gui'
    guiContainer.appendChild gui.domElement

    # add to document
    $('#output').append renderer.domElement

    resize = () ->
      w = wrap.clientWidth
      h = wrap.clientHeight

      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize w, h

      trackballControls.handleResize()

    render = () ->
      requestAnimationFrame(render)
      renderer.render scene, camera

      trackballControls.update()

    # add mouse controls
    trackballControls = new THREE.TrackballControls camera, renderer.domElement

    trackballControls.rotateSpeed = 1.0
    trackballControls.zoomSpeed = 1.2
    trackballControls.panSpeed = 0.8

    trackballControls.noZoom = false
    trackballControls.noPan = false

    trackballControls.staticMoving = true
    trackballControls.dynamicDampingFactor = 0.3

    trackballControls.keys = [ 65, 83, 68 ]

    # # # # # # # # # #
    # # # # # # # # # #

    projector = new THREE.Projector()

    onDocumentMouseDown = (e) ->
      e.preventDefault()

      ###
      Logger.debug 'mousedown fired.',
        x: e.pageX
        y: e.pageY
        offsetLeft: $('#output').offset().left
        offsetTop: $('#output').offset().top
        newX: e.clientX - renderer.domElement.offsetLeft
        newY: e.clientY - renderer.domElement.offsetTop
      ###


      param1 = ((e.pageX - $('#output').offset().left) / w) * 2 - 1
      param2 = - ((e.pageY - $('#output').offset().top) / h) * 2 + 1

      vector = new THREE.Vector3 param1, param2, 0.5
      projector.unprojectVector vector, camera

      raycaster = new THREE.Raycaster(
        camera.position, vector.sub(camera.position).normalize() )

      intersects = raycaster.intersectObjects shapes

      if intersects.length > 0
        Logger.debug 'INTERSECTION DETECTED', intersects
        select intersects[0].object

    # # # # # # # # # #
    # # # # # # # # # #

    # bind resize func to window resize
    window.addEventListener 'resize', resize, false

    # bind onmousedown to document
    renderer.domElement.addEventListener 'mousedown', onDocumentMouseDown, false

    render()

    apply = (scope, fn) ->
      if scope.$$phase or scope.$root.$$phase
        fn()
      else
        scope.$apply fn
]
