app.controller 'BasicPropertiesSphereCtrl', [
  '$scope', '$state', 'bxSocket', 'bxNotify', 'bxLogger'
  ($scope, $state, Socket, Notify, Logger) ->
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

    renderer.setClearColorHex 0xEEEEEE, 1.0
    renderer.setSize w, h
    renderer.shadowMapEnabled = true

    # create ground plane
    planeGeometry = new THREE.PlaneGeometry 60, 40, 1, 1
    planeMaterial = new THREE.MeshLambertMaterial
      color: 0xffffff
    plane = new THREE.Mesh planeGeometry, planeMaterial
    plane.receiveShadow = true

    # rotate + position the plane
    plane.rotation.x = -0.5 * Math.PI
    plane.position.x = 0
    plane.position.y = 0
    plane.position.z = 0

    # add plane to the scene
    scene.add plane

    # position + point camera to center of the scene
    camera.position.x = -30
    camera.position.y = 40
    camera.position.z = 30
    camera.lookAt scene.position

    # add subtle ambient lighting
    ambientLight = new THREE.AmbientLight 0x0c0c0c
    scene.add ambientLight

    # add spotlight for shadows
    spotLight = new THREE.SpotLight 0xffffff
    spotLight.position.set -40, 60, 20
    spotLight.castShadow = true
    scene.add spotLight

    # add shape
    material = new THREE.MeshLambertMaterial
      color: 0x44ff44
    geometry = new THREE.SphereGeometry 5, 20, 20
    shape = new THREE.Mesh geometry, material
    shape.position.y = 4
    shape.castShadow = true
    scene.add shape

    # add controls
    controls = new ->
      @scaleX = 1
      @scaleY = 1
      @scaleZ = 1

      @positionX = 0
      @positionY = 4
      @positionZ = 0

      @rotationX = 0
      @rotationY = 0
      @rotationZ = 0
      @scale = 1

      @translateX = 0
      @translateY = 0
      @translateZ = 0

      @translate = () =>
        shape.translateX @translateX
        shape.translateY @translateY
        shape.translateZ @translateZ

        @positionX = shape.position.x
        @positionY = shape.position.y
        @positionZ = shape.position.z

      return @

    gui = new dat.GUI()

    guiScale = gui.addFolder 'scale'
    guiScale.add controls, 'scaleX', 0, 5
    guiScale.add controls, 'scaleY', 0, 5
    guiScale.add controls, 'scaleZ', 0, 5

    guiPosition = gui.addFolder 'position'
    contX = guiPosition.add controls, 'positionX', -10, 10
    contY = guiPosition.add controls, 'positionY', -4, 20
    contZ = guiPosition.add controls, 'positionZ', -10, 10

    contX.listen()
    contX.onChange (value) ->
      shape.position.x = controls.positionX

    contY.listen()
    contY.onChange (value) ->
      shape.position.y = controls.positionY

    contZ.listen()
    contZ.onChange (value) ->
      shape.position.z = controls.positionZ

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

    render = () ->
      # attach shape to controls
      shape.scale.set controls.scaleX, controls.scaleY, controls.scaleZ

      # update radius
      shape.radius = controls.radius

      requestAnimationFrame(render)
      renderer.render scene, camera

    # bind resize func to window resize
    window.addEventListener 'resize', resize, false

    render()

    ###
    # destroy GUI on scope destroy
    $scope.$on '$destroy', () ->
      Logger.debug 'Scope destroyed.'
      gui.destroy() if gui
    ###


    apply = (scope, fn) ->
      if scope.$$phase or scope.$root.$$phase
        fn()
      else
        scope.$apply fn
]
