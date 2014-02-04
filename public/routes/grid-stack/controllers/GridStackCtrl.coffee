app.controller 'GridStackCtrl', [
  '$scope', '$state', 'bxLogger'
  ($scope, $state, Logger) ->
    # container for rendering
    wrap = document.getElementById 'wrap'

    # create scene to hold objects, cameras, and lights
    scene = new THREE.Scene()

    w = $('#wrap').width()
    h = $('#wrap').height()

    # create camera to define perspective
    camera = new THREE.PerspectiveCamera 45, w / h, 0.1, 1000

    # create a renderer and set size
    renderer = new THREE.WebGLRenderer()

    renderer.setClearColor 0xEEEEEE, 1.0
    renderer.setSize w, h
    renderer.shadowMapEnabled = true

    # position + point camera to center of the scene
    camera.position.x = -60
    camera.position.y = 60
    camera.position.z = 60
    camera.lookAt scene.position

    # add subtle ambient lighting
    ambientLight = new THREE.AmbientLight 0x0c0c0c
    scene.add ambientLight

    # add spotlight for shadows
    spotLight = new THREE.SpotLight 0xffffff
    spotLight.position.set -40, 60, 20
    spotLight.castShadow = true
    scene.add spotLight

    # add to document
    $('#output').append renderer.domElement

    resize = () ->
      w = wrap.clientWidth
      h = wrap.clientHeight

      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize w, h

      orbitControls.handleResize()

    render = () ->
      requestAnimationFrame(render)
      renderer.render scene, camera

      orbitControls.update()

    # bind resize func to window resize
    window.addEventListener 'resize', resize, false

    # add mouse controls
    orbitControls = new THREE.OrbitControls camera, renderer.domElement

    orbitControls.rotateSpeed = 1.0
    orbitControls.zoomSpeed = 1.2
    orbitControls.panSpeed = 0.8

    orbitControls.noZoom = false
    orbitControls.noPan = false

    # trackballControls.staticMoving = true
    # trackballControls.dynamicDampingFactor = 0.3

    # # # # # # # # # #
    # # # # # # # # # #

    # create plane
    helper = new THREE.GridHelper 100, 10
    helper.setColors 0x333333, 0x333333

    helper.rotation.x = 0
    helper.rotation.y = 0
    helper.rotation.z = 0

    helper.position.x = 0
    helper.position.y = 0
    helper.position.z = 0

    scene.add helper

    render()


    apply = (scope, fn) ->
      if scope.$$phase or scope.$root.$$phase
        fn()
      else
        scope.$apply fn
]
