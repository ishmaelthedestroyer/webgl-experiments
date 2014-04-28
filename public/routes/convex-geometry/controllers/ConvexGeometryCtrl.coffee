app.controller 'ConvexGeometryCtrl', [
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

    ###
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

    ###
    # add shape
    material = new THREE.MeshLambertMaterial
      color: 0x44ff44
    geometry = new THREE.CubeGeometry 5, 8, 3
    shape = new THREE.Mesh geometry, material
    shape.position.y = 4
    shape.castShadow = true
    scene.add shape
    ###

    # reference to convex obj + visible group
    shape = null
    group = null

    createMesh = (geom) ->
      ###
      material = new THREE.MeshBasicMaterial()
      material.side = THREE.DoubleSide
      wireframeMaterial = new THREE.MeshBasicMaterial
        color: 0x00ff00
        transparent: true
        opacity: 0.2
      wireframeMaterial.wireframe = true
      ###
      material = new THREE.MeshNormalMaterial
        # color: 0x00ff00
        transparent: true
        opacity: 0.2
      material.side = THREE.DoubleSide
      wireframeMaterial = new THREE.MeshBasicMaterial()
      wireframeMaterial.wireframe = true

      # create multi material
      mesh = THREE.SceneUtils.createMultiMaterialObject geom, [
        material,
        wireframeMaterial
      ]

      return mesh

    # add controls
    controls = new ->
      @redraw = () ->
        # add 10 random spheres
        points = []
        i = 0
        while ++i <= 15
          x = Math.round(Math.random() * 30) - 20
          y = Math.round(Math.random() * 30) - 20
          z = Math.round(Math.random() * 30) - 20
          points.push new THREE.Vector3 x, y, z

        ###
        ###
        scene.remove(group) if group
        group = new THREE.Object3D()
        material = new THREE.MeshBasicMaterial
          color: 0xff0000
          transparent: false

        points.forEach (p) ->
          geom = new THREE.SphereGeometry 0.2
          mesh = new THREE.Mesh geom, material
          mesh.position = p
          group.add mesh

        scene.add group

        convexGeom = new THREE.ConvexGeometry points
        convexMesh = createMesh convexGeom

        scene.remove(shape) if shape
        shape = convexMesh
        scene.add shape

      @x = 0
      @y = 0
      @z = 0

      @rotateX = false
      @rotateY = true
      @rotateZ = false

      @rotationSpeed = 1

      return @

    controls.redraw()

    gui = new dat.GUI()
    gui.add controls, 'redraw'

    ###
    gui.add controls, 'x', -10, 10
    gui.add controls, 'y', -10, 10
    gui.add controls, 'z', -10, 10
    ###

    gui.add controls, 'rotateX'
    gui.add controls, 'rotateY'
    gui.add controls, 'rotateZ'

    gui.add controls, 'rotationSpeed', 0, 10


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
      ###
      # rotate the shapes
      scene.traverse (e) ->
        if e instanceof THREE.Mesh and e != plane
          e.rotation.x += controls.rotationSpeed
          e.rotation.y += controls.rotationSpeed
          e.rotation.z += controls.rotationSpeed
      ###

      rotationSpeed = controls.rotationSpeed / 100

      if controls.rotateX
        shape.rotation.x += rotationSpeed if shape
        group.rotation.x += rotationSpeed if group

      if controls.rotateY
        shape.rotation.y +=rotationSpeed if shape
        group.rotation.y += rotationSpeed if group

      if controls.rotateZ
        shape.rotation.z += rotationSpeed if shape
        group.rotation.z += rotationSpeed if group

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
