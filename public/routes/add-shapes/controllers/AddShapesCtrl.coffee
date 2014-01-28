app.controller 'AddShapesCtrl', [
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
    geometry = new THREE.CubeGeometry 5, 8, 3
    shape = new THREE.Mesh geometry, material
    shape.position.y = 4
    shape.castShadow = true
    scene.add shape

    # add controls
    controls = new ->
      @rotationSpeed = 0.02

      @addCube = () ->
        _size = Math.ceil Math.random() * 3
        _geometry = new THREE.CubeGeometry _size, _size, _size
        _material = new THREE.MeshLambertMaterial
          color: Math.random() * 0xffffff
        _cube = new THREE.Mesh _geometry, _material
        _cube.name = 'cube-' + scene.children.length

        # position cube somewhere random on the scene
        _cube.position.x = -30 + Math.round Math.random() * planeGeometry.width
        _cube.position.y = Math.round Math.random() * 5
        _cube.position.z = Math.round Math.random() * planeGeometry.height

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

    # add to document
    $('#output').append renderer.domElement

    resize = () ->
      w = wrap.clientWidth
      h = wrap.clientHeight

      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize w, h

    render = () ->
      # rotate the shapes
      scene.traverse (e) ->
        if e instanceof THREE.Mesh and e != plane
          e.rotation.x += controls.rotationSpeed
          e.rotation.y += controls.rotationSpeed
          e.rotation.z += controls.rotationSpeed

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
