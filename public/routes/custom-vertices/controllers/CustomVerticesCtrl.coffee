app.controller 'CustomVerticesCtrl', [
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
    camera.lookAt new THREE.Vector3 5, 0, 0

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

    # create custom geometry
    vertices = [
        new THREE.Vector3(1,3,1)
        new THREE.Vector3(1,3,-1)
        new THREE.Vector3(1,-1,1)
        new THREE.Vector3(1,-1,-1)
        new THREE.Vector3(-1,3,-1)
        new THREE.Vector3(-1,3,1)
        new THREE.Vector3(-1,-1,-1)
        new THREE.Vector3(-1,-1,1)
    ]

    faces = [
        new THREE.Face3(0,2,1)
        new THREE.Face3(2,3,1)
        new THREE.Face3(4,6,5)
        new THREE.Face3(6,7,5)
        new THREE.Face3(4,5,1)
        new THREE.Face3(5,0,1)
        new THREE.Face3(7,6,2)
        new THREE.Face3(6,3,2)
        new THREE.Face3(5,7,0)
        new THREE.Face3(7,2,0)
        new THREE.Face3(1,3,4)
        new THREE.Face3(3,6,4)
    ]

    geometry = new THREE.Geometry()
    geometry.vertices = vertices
    geometry.faces = faces

    geometry.computeCentroids()
    geometry.mergeVertices()

    materials = [
      new THREE.MeshLambertMaterial
        opacity: 0.6
        color: 0x44ff44
        transparent: true
      new THREE.MeshBasicMaterial
        color: 0x000000
        wireframe: true
    ]

    mesh = THREE.SceneUtils.createMultiMaterialObject geometry, materials
    mesh.children.forEach (e) ->
      e.castShadow = true

    scene.add mesh

    # function to create controller
    addCtrl = (x, y, z) ->
      controls = new () ->
        @x = x
        @y = y
        @z = z

      return controls

    controlPoints = []
    controlPoints.push addCtrl 3, 5, 3
    controlPoints.push addCtrl 3, 5, 0
    controlPoints.push addCtrl 3, 0, 3
    controlPoints.push addCtrl 3, 0, 0
    controlPoints.push addCtrl 0, 5, 0
    controlPoints.push addCtrl 0, 5, 3
    controlPoints.push addCtrl 0, 0, 0
    controlPoints.push addCtrl 0, 0, 3

    # create GUI
    gui = new dat.GUI()
    ###
    gui.add new  () ->
      @clone = () ->
        cloned = mesh.children[0].geometry.clone()
        materials = [
          new THREE.MeshLambertMaterial
            opacity: 0.6
            color: 0xff44ff
            transparent: true
          new THREE.MeshBasicMaterial
            color: 0x000000
            wireframe: true
        ]

        mesh2 = THREE.SceneUtils.createMultiMaterialObject cloned, materials
        mesh2.children.forEach (e) ->
          e.castShadow = true

        mesh2.translateX 5
        mesh2.translateZ 5
        mesh2.name = 'clone'
        scene.remove scene.getChildByName 'clone'
        scene.add mesh2

      return @
    , 'clone'
    ###

    i = 0
    while i < 8
        f1 = gui.addFolder 'Vertices ' + (i + 1)
        f1.add controlPoints[i], 'x', -10, 10
        f1.add controlPoints[i], 'y', -10, 10
        f1.add controlPoints[i], 'z', -10, 10
        ++i

    guiContainer = document.getElementById 'gui'
    guiContainer.appendChild gui.domElement


    resize = () ->
      w = wrap.clientWidth
      h = wrap.clientHeight

      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize w, h

    render = () ->
      vertices = []
      i = 0
      while i < 8
        vertices.push new THREE.Vector3 controlPoints[i].x, controlPoints[i].y,
          controlPoints[i].z
        ++i

      mesh.children.forEach (e) ->
        e.geometry.vertices = vertices
        e.geometry.verticesNeedUpdate = true
        e.geometry.computeFaceNormals()

      requestAnimationFrame(render)
      renderer.render scene, camera

    # bind resize func to window resize
    window.addEventListener 'resize', resize, false

    render()

    apply = (scope, fn) ->
      if scope.$$phase or scope.$root.$$phase
        fn()
      else
        scope.$apply fn
]
