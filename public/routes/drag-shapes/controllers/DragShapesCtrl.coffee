app.controller 'DragShapesCtrl', [
  '$scope', '$state', 'bxSocket', 'bxNotify', 'bxLogger'
  ($scope, $state, Socket, Notify, Logger) ->

    createCube = (size, color) ->
      ###
      color = Math.random() * 0xffffff
      console.log 'Got color.', color
      ###

      geometry = new THREE.CubeGeometry size, size, size
      material = new THREE.MeshLambertMaterial
        color: color
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
    # renderer = new THREE.WebGLRenderer()
    renderer = new THREE.WebGLRenderer
      antialias: true
    renderer.setClearColor 0xEEEEEE, 1.0
    renderer.setSize w, h
    renderer.shadowMapEnabled = true
    renderer.sortObjects = false

    # create ground plane
    planeGeometry = new THREE.PlaneGeometry 100, 100, 10, 10
    planeMaterial = new THREE.MeshLambertMaterial
      color: 0xffffff
      wireframe: true
    plane = new THREE.Mesh planeGeometry, planeMaterial
    plane.receiveShadow = true

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

    # add subtle ambient lighting
    ambientLight = new THREE.AmbientLight 0x0c0c0c
    scene.add ambientLight

    # add spotlight for shadows
    spotLight = new THREE.SpotLight 0xffffff
    spotLight.position.set -40, 60, 20
    spotLight.castShadow = true
    scene.add spotLight

    # # # # # # # # # #
    # # # # # # # # # #

    color = 13258525.865980228

    shape = createCube 10, color
    shape.position.x = 5
    shape.position.y = 5
    shape.position.z = 5
    scene.add shape

    shape = createCube 10, color
    shape.position.x = 15
    shape.position.y = 5
    shape.position.z = -35
    scene.add shape

    shape = createCube 10, color
    shape.position.x = -45
    shape.position.y = 5
    shape.position.z = 25
    scene.add shape

    shape = createCube 10, color
    shape.position.x = -15
    shape.position.y = 5
    shape.position.z = 25
    scene.add shape

    shape = createCube 10, color
    shape.position.x = -45
    shape.position.y = 5
    shape.position.z = 45
    scene.add shape

    shape = createCube 10, color
    shape.position.x = -35
    shape.position.y = 5
    shape.position.z = -35
    scene.add shape

    shape = createCube 10, color
    shape.position.x = -25
    shape.position.y = 5
    shape.position.z = -15
    scene.add shape

    shape = createCube 10, color
    shape.position.x = 25
    shape.position.y = 5
    shape.position.z = 35
    scene.add shape

    ###
    # add controls
    controls = new ->
      @rotationSpeed = 0.02

      @addCube = () ->
        _size = Math.ceil Math.random() * 3

        scene.add _cube

      @addSphere = () ->
        _size = Math.ceil Math.random() * 3
        _geometry = new THREE.SphereGeometry _size, 20, 20
        _material = new THREE.MeshLambertMaterial
          color: Math.random() * 0xffffff
        _sphere = new THREE.Mesh _geometry, _material
        _sphere.name = 'cube-' + scene.children.length

        # position cube somewhere random on the scene
        _sphere.position.x = -30 +
          Math.round Math.random() * planeGeometry.width
        _sphere.position.y = Math.round Math.random() * 5
        _sphere.position.z = Math.round Math.random() * planeGeometry.height

        scene.add _sphere

      @addCylinder = () ->
        _size = Math.ceil Math.random() * 3
        _geometry = new THREE.CylinderGeometry _size, _size, _size * 3
        _material = new THREE.MeshLambertMaterial
          color: Math.random() * 0xffffff
        _shape = new THREE.Mesh _geometry, _material
        _shape.name = 'cube-' + scene.children.length

        # position cube somewhere random on the scene
        _shape.position.x = -30 +
          Math.round Math.random() * planeGeometry.width
        _shape.position.y = Math.round Math.random() * 5
        _shape.position.z = Math.round Math.random() * planeGeometry.height

        scene.add _shape

      return @

    gui = new dat.GUI()
    gui.add controls, 'rotationSpeed', 0, 0.5
    gui.add controls, 'addCube'
    gui.add controls, 'addSphere'
    gui.add controls, 'addCylinder'

    guiContainer = document.getElementById 'gui'
    guiContainer.appendChild gui.domElement
    ###

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

    # bind resize func to window resize
    window.addEventListener 'resize', resize, false

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





    # # # # # # # # # #
    # # # # # # # # # #

    render()

    apply = (scope, fn) ->
      if scope.$$phase or scope.$root.$$phase
        fn()
      else
        scope.$apply fn
]
