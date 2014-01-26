app.controller 'AdvancedPropertiesSphereCtrl', [
  '$scope', '$state', 'bxSocket', 'bxNotify', 'bxLogger'
  ($scope, $state, Socket, Notify, Logger) ->
    # create mesh function
    create = (geometry) ->
      material = new THREE.MeshLambertMaterial
        color: 0x44ff44
        wireframe: true
      shape = new THREE.Mesh geometry, material

      return shape

      material = new THREE.MeshNormalMaterial()
      material.side = THREE.DoubleSide
      wireframe = new THREE.MeshBasicMaterial()
      wireframe.wireframe = true

      # return object
      obj = THREE.SceneUtils.createMultiMaterialObject(
        geometry, [material, wireframe])

      obj.position.y = 4
      obj.castShadow = true

      return obj

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

    ###
    # create ground plane
    planeGeometry = new THREE.PlaneGeometry 60, 40, 10, 10
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
    ###

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
    shape = create new THREE.SphereGeometry 5, 20, 20
    scene.add shape

    Logger.debug 'Added shape.', shape

    # add controls
    controls = new ->
      @radius = shape.geometry.radius
      @widthSegments = shape.geometry.widthSegments
      @heightSegments = shape.geometry.heightSegments

      ###
      @radius = shape.children[0].geometry.radius
      @widthSegments = shape.children[0].geometry.widthSegments
      @heightSegments = shape.children[0].geometry.heightSegments
      ###

      ###
      @radius = 5
      @widthSegments = 20
      @heightSegments = 20
      ###

      @phiStart = 0
      @phiLength = Math.PI * 2
      @thetaStart = 0
      @thetaLength = Math.PI

      @redraw = () =>
        Logger.debug 'Redrawing.',
          radius: @radius
          widthSegments: @widthSegments
          heightSegments: @heightSegments

        scene.remove shape

        shape = create(new THREE.SphereGeometry(
          @radius, @widthSegments, @heightSegments,
          @phiStart, @phiLength, @thetaStart, @thetaLength))

        scene.add shape

        return @

      return @

    gui = new dat.GUI()

    gui.add(controls, 'radius', 0, 50).onChange controls.redraw
    gui.add(controls, 'widthSegments', 0, 50).onChange controls.redraw
    gui.add(controls, 'heightSegments', 0, 50).onChange controls.redraw
    gui.add(controls, 'phiStart', 0, Math.PI).onChange controls.redraw
    gui.add(controls, 'phiLength', 0, 2 * Math.PI).onChange controls.redraw
    gui.add(controls, 'thetaStart', 0, 2 * Math.PI).onChange controls.redraw
    gui.add(controls, 'thetaLength', 0, 2 * Math.PI).onChange controls.redraw

    guiContainer = document.getElementById 'gui'
    guiContainer.appendChild gui.domElement

    # add mouse controls
    mouseControls = new THREE.TrackballControls camera

    mouseControls.rotateSpeed = 1.0
    mouseControls.zoomSpeed = 1.2
    mouseControls.panSpeed = 0.8

    mouseControls.noZoom = false
    mouseControls.noPan = false

    mouseControls.staticMoving = true
    mouseControls.dynamicDampingFactor = 0.3

    mouseControls.keys = [ 65, 83, 68 ]

    mouseControls.addEventListener 'change', render

    # add to document
    $('#output').append renderer.domElement

    resize = () ->
      w = wrap.clientWidth
      h = wrap.clientHeight

      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize w, h

      mouseControls.handleResize()

    render = () ->
      requestAnimationFrame(render)
      renderer.render scene, camera

      mouseControls.update()

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
