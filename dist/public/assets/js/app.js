/** 
 * topo-experiments - v0.0.0 - 2014-01-25
 * topo-experiments.com 
 * 
 * Copyright (c) 2014 ishmael td
 * Licensed  <>
 * */
var app;

app = angular.module('App', ['ui.router', 'ngToolboxx']);

app.run([
  '$rootScope', '$state', '$stateParams', function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    return $rootScope.$stateParams = $stateParams;
  }
]);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/404');
  return $locationProvider.html5Mode(true);
});

angular.element(document).ready(function() {
  return angular.bootstrap(document, ['App']);
});

app.config(function($stateProvider) {
  return $stateProvider.state('404', {
    url: '/404',
    templateUrl: '/routes/404/views/404.html'
  });
});

app.config(function($stateProvider) {
  $stateProvider.state('index', {
    url: '/',
    templateUrl: '/routes/index/views/index.html'
  });
  $stateProvider.state('index.basic-properties', {
    url: 'basic-properties',
    templateUrl: '/routes/1-basic-properties/views/basic-properties.html'
  });
  $stateProvider.state('index.custom-vertices', {
    url: 'custom-vertices',
    templateUrl: '/routes/2-custom-vertices/views/custom-vertices.html'
  });
  $stateProvider.state('index.add-shapes', {
    url: 'add-shapes',
    templateUrl: '/routes/3-add-shapes/views/add-shapes.html'
  });
  $stateProvider.state('index.trackball-camera', {
    url: 'trackball-camera',
    templateUrl: '/routes/4-trackball-camera/views/trackball-camera.html'
  });
  $stateProvider.state('index.basic-properties-sphere', {
    url: 'basic-properties-sphere',
    templateUrl: '/routes/5-basic-properties-sphere/' + 'views/basic-properties-sphere.html'
  });
  return $stateProvider.state('index.advanced-properties-sphere', {
    url: 'advanced-properties-sphere',
    templateUrl: '/routes/6-advanced-properties-sphere/' + 'views/advanced-properties-sphere.html'
  });
});

app.controller('BasicPropertiesCtrl', [
  '$scope', '$state', 'bxSocket', 'bxNotify', 'bxLogger', function($scope, $state, Socket, Notify, Logger) {
    var ambientLight, apply, camera, contX, contY, contZ, controls, geometry, gui, guiContainer, guiPosition, guiScale, h, material, plane, planeGeometry, planeMaterial, render, renderer, resize, scene, shape, spotLight, w, wrap;
    wrap = document.getElementById('wrap');
    scene = new THREE.Scene();
    w = $('#wrap').width();
    h = $('#wrap').height();
    camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColorHex(0xEEEEEE, 1.0);
    renderer.setSize(w, h);
    renderer.shadowMapEnabled = true;
    planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
    planeMaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff
    });
    plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = 0;
    scene.add(plane);
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);
    ambientLight = new THREE.AmbientLight(0x0c0c0c);
    scene.add(ambientLight);
    spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, 20);
    spotLight.castShadow = true;
    scene.add(spotLight);
    material = new THREE.MeshLambertMaterial({
      color: 0x44ff44
    });
    geometry = new THREE.CubeGeometry(5, 8, 3);
    shape = new THREE.Mesh(geometry, material);
    shape.position.y = 4;
    shape.castShadow = true;
    scene.add(shape);
    controls = new function() {
      var _this = this;
      this.scaleX = 1;
      this.scaleY = 1;
      this.scaleZ = 1;
      this.positionX = 0;
      this.positionY = 4;
      this.positionZ = 0;
      this.rotationX = 0;
      this.rotationY = 0;
      this.rotationZ = 0;
      this.scale = 1;
      this.translateX = 0;
      this.translateY = 0;
      this.translateZ = 0;
      this.translate = function() {
        shape.translateX(_this.translateX);
        shape.translateY(_this.translateY);
        shape.translateZ(_this.translateZ);
        _this.positionX = shape.position.x;
        _this.positionY = shape.position.y;
        return _this.positionZ = shape.position.z;
      };
      return this;
    };
    gui = new dat.GUI();
    guiScale = gui.addFolder('scale');
    guiScale.add(controls, 'scaleX', 0, 5);
    guiScale.add(controls, 'scaleY', 0, 5);
    guiScale.add(controls, 'scaleZ', 0, 5);
    guiPosition = gui.addFolder('position');
    contX = guiPosition.add(controls, 'positionX', -10, 10);
    contY = guiPosition.add(controls, 'positionY', -4, 20);
    contZ = guiPosition.add(controls, 'positionZ', -10, 10);
    contX.listen();
    contX.onChange(function(value) {
      return shape.position.x = controls.positionX;
    });
    contY.listen();
    contY.onChange(function(value) {
      return shape.position.y = controls.positionY;
    });
    contZ.listen();
    contZ.onChange(function(value) {
      return shape.position.z = controls.positionZ;
    });
    guiContainer = document.getElementById('gui');
    guiContainer.appendChild(gui.domElement);
    $('#output').append(renderer.domElement);
    resize = function() {
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      return renderer.setSize(w, h);
    };
    render = function() {
      shape.scale.set(controls.scaleX, controls.scaleY, controls.scaleZ);
      requestAnimationFrame(render);
      return renderer.render(scene, camera);
    };
    window.addEventListener('resize', resize, false);
    render();
    /*
    # destroy GUI on scope destroy
    $scope.$on '$destroy', () ->
      Logger.debug 'Scope destroyed.'
      gui.destroy() if gui
    */

    return apply = function(scope, fn) {
      if (scope.$$phase || scope.$root.$$phase) {
        return fn();
      } else {
        return scope.$apply(fn);
      }
    };
  }
]);

app.controller('CustomVerticesCtrl', [
  '$scope', '$state', 'bxSocket', 'bxNotify', 'bxLogger', function($scope, $state, Socket, Notify, Logger) {
    var addCtrl, ambientLight, apply, camera, controlPoints, f1, faces, geometry, gui, guiContainer, h, i, materials, mesh, plane, planeGeometry, planeMaterial, render, renderer, resize, scene, spotLight, vertices, w, wrap;
    wrap = document.getElementById('wrap');
    scene = new THREE.Scene();
    w = $('#wrap').width();
    h = $('#wrap').height();
    camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColorHex(0xEEEEEE, 1.0);
    renderer.setSize(w, h);
    renderer.shadowMapEnabled = true;
    planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
    planeMaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff
    });
    plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = 0;
    scene.add(plane);
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(new THREE.Vector3(5, 0, 0));
    ambientLight = new THREE.AmbientLight(0x0c0c0c);
    scene.add(ambientLight);
    spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, 20);
    spotLight.castShadow = true;
    scene.add(spotLight);
    $('#output').append(renderer.domElement);
    vertices = [new THREE.Vector3(1, 3, 1), new THREE.Vector3(1, 3, -1), new THREE.Vector3(1, -1, 1), new THREE.Vector3(1, -1, -1), new THREE.Vector3(-1, 3, -1), new THREE.Vector3(-1, 3, 1), new THREE.Vector3(-1, -1, -1), new THREE.Vector3(-1, -1, 1)];
    faces = [new THREE.Face3(0, 2, 1), new THREE.Face3(2, 3, 1), new THREE.Face3(4, 6, 5), new THREE.Face3(6, 7, 5), new THREE.Face3(4, 5, 1), new THREE.Face3(5, 0, 1), new THREE.Face3(7, 6, 2), new THREE.Face3(6, 3, 2), new THREE.Face3(5, 7, 0), new THREE.Face3(7, 2, 0), new THREE.Face3(1, 3, 4), new THREE.Face3(3, 6, 4)];
    geometry = new THREE.Geometry();
    geometry.vertices = vertices;
    geometry.faces = faces;
    geometry.computeCentroids();
    geometry.mergeVertices();
    materials = [
      new THREE.MeshLambertMaterial({
        opacity: 0.6,
        color: 0x44ff44,
        transparent: true
      }), new THREE.MeshBasicMaterial({
        color: 0x000000,
        wireframe: true
      })
    ];
    mesh = THREE.SceneUtils.createMultiMaterialObject(geometry, materials);
    mesh.children.forEach(function(e) {
      return e.castShadow = true;
    });
    scene.add(mesh);
    addCtrl = function(x, y, z) {
      var controls;
      controls = new function() {
        this.x = x;
        this.y = y;
        return this.z = z;
      };
      return controls;
    };
    controlPoints = [];
    controlPoints.push(addCtrl(3, 5, 3));
    controlPoints.push(addCtrl(3, 5, 0));
    controlPoints.push(addCtrl(3, 0, 3));
    controlPoints.push(addCtrl(3, 0, 0));
    controlPoints.push(addCtrl(0, 5, 0));
    controlPoints.push(addCtrl(0, 5, 3));
    controlPoints.push(addCtrl(0, 0, 0));
    controlPoints.push(addCtrl(0, 0, 3));
    gui = new dat.GUI();
    /*
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
    */

    i = 0;
    while (i < 8) {
      f1 = gui.addFolder('Vertices ' + (i + 1));
      f1.add(controlPoints[i], 'x', -10, 10);
      f1.add(controlPoints[i], 'y', -10, 10);
      f1.add(controlPoints[i], 'z', -10, 10);
      ++i;
    }
    guiContainer = document.getElementById('gui');
    guiContainer.appendChild(gui.domElement);
    resize = function() {
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      return renderer.setSize(w, h);
    };
    render = function() {
      vertices = [];
      i = 0;
      while (i < 8) {
        vertices.push(new THREE.Vector3(controlPoints[i].x, controlPoints[i].y, controlPoints[i].z));
        ++i;
      }
      mesh.children.forEach(function(e) {
        e.geometry.vertices = vertices;
        e.geometry.verticesNeedUpdate = true;
        return e.geometry.computeFaceNormals();
      });
      requestAnimationFrame(render);
      return renderer.render(scene, camera);
    };
    window.addEventListener('resize', resize, false);
    render();
    return apply = function(scope, fn) {
      if (scope.$$phase || scope.$root.$$phase) {
        return fn();
      } else {
        return scope.$apply(fn);
      }
    };
  }
]);

app.controller('AddShapesCtrl', [
  '$scope', '$state', 'bxSocket', 'bxNotify', 'bxLogger', function($scope, $state, Socket, Notify, Logger) {
    var ambientLight, apply, camera, controls, geometry, gui, guiContainer, h, material, plane, planeGeometry, planeMaterial, render, renderer, resize, scene, shape, spotLight, w, wrap;
    wrap = document.getElementById('wrap');
    scene = new THREE.Scene();
    w = $('#wrap').width();
    h = $('#wrap').height();
    camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColorHex(0xEEEEEE, 1.0);
    renderer.setSize(w, h);
    renderer.shadowMapEnabled = true;
    planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
    planeMaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff
    });
    plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = 0;
    scene.add(plane);
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);
    ambientLight = new THREE.AmbientLight(0x0c0c0c);
    scene.add(ambientLight);
    spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, 20);
    spotLight.castShadow = true;
    scene.add(spotLight);
    material = new THREE.MeshLambertMaterial({
      color: 0x44ff44
    });
    geometry = new THREE.CubeGeometry(5, 8, 3);
    shape = new THREE.Mesh(geometry, material);
    shape.position.y = 4;
    shape.castShadow = true;
    scene.add(shape);
    controls = new function() {
      this.rotationSpeed = 0.02;
      this.addCube = function() {
        var _cube, _geometry, _material, _size;
        _size = Math.ceil(Math.random() * 3);
        _geometry = new THREE.CubeGeometry(_size, _size, _size);
        _material = new THREE.MeshLambertMaterial({
          color: Math.random() * 0xffffff
        });
        _cube = new THREE.Mesh(_geometry, _material);
        _cube.name = 'cube-' + scene.children.length;
        _cube.position.x = -30 + Math.round(Math.random() * planeGeometry.width);
        _cube.position.y = Math.round(Math.random() * 5);
        _cube.position.z = Math.round(Math.random() * planeGeometry.height);
        return scene.add(_cube);
      };
      this.addSphere = function() {
        var _geometry, _material, _size, _sphere;
        _size = Math.ceil(Math.random() * 3);
        _geometry = new THREE.SphereGeometry(_size, 20, 20);
        _material = new THREE.MeshLambertMaterial({
          color: Math.random() * 0xffffff
        });
        _sphere = new THREE.Mesh(_geometry, _material);
        _sphere.name = 'cube-' + scene.children.length;
        _sphere.position.x = -30 + Math.round(Math.random() * planeGeometry.width);
        _sphere.position.y = Math.round(Math.random() * 5);
        _sphere.position.z = Math.round(Math.random() * planeGeometry.height);
        return scene.add(_sphere);
      };
      this.addCylinder = function() {
        var _geometry, _material, _shape, _size;
        _size = Math.ceil(Math.random() * 3);
        _geometry = new THREE.CylinderGeometry(_size, _size, _size * 3);
        _material = new THREE.MeshLambertMaterial({
          color: Math.random() * 0xffffff
        });
        _shape = new THREE.Mesh(_geometry, _material);
        _shape.name = 'cube-' + scene.children.length;
        _shape.position.x = -30 + Math.round(Math.random() * planeGeometry.width);
        _shape.position.y = Math.round(Math.random() * 5);
        _shape.position.z = Math.round(Math.random() * planeGeometry.height);
        return scene.add(_shape);
      };
      return this;
    };
    gui = new dat.GUI();
    gui.add(controls, 'rotationSpeed', 0, 0.5);
    gui.add(controls, 'addCube');
    gui.add(controls, 'addSphere');
    gui.add(controls, 'addCylinder');
    guiContainer = document.getElementById('gui');
    guiContainer.appendChild(gui.domElement);
    $('#output').append(renderer.domElement);
    resize = function() {
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      return renderer.setSize(w, h);
    };
    render = function() {
      scene.traverse(function(e) {
        if (e instanceof THREE.Mesh && e !== plane) {
          e.rotation.x += controls.rotationSpeed;
          e.rotation.y += controls.rotationSpeed;
          return e.rotation.z += controls.rotationSpeed;
        }
      });
      requestAnimationFrame(render);
      return renderer.render(scene, camera);
    };
    window.addEventListener('resize', resize, false);
    render();
    /*
    # destroy GUI on scope destroy
    $scope.$on '$destroy', () ->
      Logger.debug 'Scope destroyed.'
      gui.destroy() if gui
    */

    return apply = function(scope, fn) {
      if (scope.$$phase || scope.$root.$$phase) {
        return fn();
      } else {
        return scope.$apply(fn);
      }
    };
  }
]);

app.controller('TrackballCameraCtrl', [
  '$scope', '$state', 'bxSocket', 'bxNotify', 'bxLogger', function($scope, $state, Socket, Notify, Logger) {
    var ambientLight, apply, camera, controls, h, plane, planeGeometry, planeMaterial, render, renderer, resize, scene, spotLight, w, wrap;
    wrap = document.getElementById('wrap');
    scene = new THREE.Scene();
    w = $('#wrap').width();
    h = $('#wrap').height();
    camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColorHex(0xEEEEEE, 1.0);
    renderer.setSize(w, h);
    renderer.shadowMapEnabled = true;
    planeGeometry = new THREE.PlaneGeometry(60, 60, 10, 10);
    planeMaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      wireframe: true
    });
    plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = 0;
    scene.add(plane);
    planeGeometry = new THREE.PlaneGeometry(60, 60, 10, 10);
    planeMaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      wireframe: true
    });
    plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    plane.rotation.y = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = 0;
    scene.add(plane);
    camera.position.x = -60;
    camera.position.y = 60;
    camera.position.z = 60;
    camera.lookAt(scene.position);
    ambientLight = new THREE.AmbientLight(0x0c0c0c);
    scene.add(ambientLight);
    spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, 20);
    spotLight.castShadow = true;
    scene.add(spotLight);
    controls = new THREE.TrackballControls(camera);
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;
    controls.keys = [65, 83, 68];
    controls.addEventListener('change', render);
    $('#output').append(renderer.domElement);
    resize = function() {
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      return controls.handleResize();
    };
    render = function() {
      requestAnimationFrame(render);
      renderer.render(scene, camera);
      return controls.update();
    };
    window.addEventListener('resize', resize, false);
    render();
    return apply = function(scope, fn) {
      if (scope.$$phase || scope.$root.$$phase) {
        return fn();
      } else {
        return scope.$apply(fn);
      }
    };
  }
]);

app.controller('BasicPropertiesSphereCtrl', [
  '$scope', '$state', 'bxSocket', 'bxNotify', 'bxLogger', function($scope, $state, Socket, Notify, Logger) {
    var ambientLight, apply, camera, contX, contY, contZ, controls, geometry, gui, guiContainer, guiPosition, guiScale, h, material, plane, planeGeometry, planeMaterial, render, renderer, resize, scene, shape, spotLight, w, wrap;
    wrap = document.getElementById('wrap');
    scene = new THREE.Scene();
    w = $('#wrap').width();
    h = $('#wrap').height();
    camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColorHex(0xEEEEEE, 1.0);
    renderer.setSize(w, h);
    renderer.shadowMapEnabled = true;
    planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
    planeMaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff
    });
    plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = 0;
    scene.add(plane);
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);
    ambientLight = new THREE.AmbientLight(0x0c0c0c);
    scene.add(ambientLight);
    spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, 20);
    spotLight.castShadow = true;
    scene.add(spotLight);
    material = new THREE.MeshLambertMaterial({
      color: 0x44ff44
    });
    geometry = new THREE.SphereGeometry(5, 20, 20);
    shape = new THREE.Mesh(geometry, material);
    shape.position.y = 4;
    shape.castShadow = true;
    scene.add(shape);
    controls = new function() {
      var _this = this;
      this.scaleX = 1;
      this.scaleY = 1;
      this.scaleZ = 1;
      this.positionX = 0;
      this.positionY = 4;
      this.positionZ = 0;
      this.rotationX = 0;
      this.rotationY = 0;
      this.rotationZ = 0;
      this.scale = 1;
      this.translateX = 0;
      this.translateY = 0;
      this.translateZ = 0;
      this.translate = function() {
        shape.translateX(_this.translateX);
        shape.translateY(_this.translateY);
        shape.translateZ(_this.translateZ);
        _this.positionX = shape.position.x;
        _this.positionY = shape.position.y;
        return _this.positionZ = shape.position.z;
      };
      return this;
    };
    gui = new dat.GUI();
    guiScale = gui.addFolder('scale');
    guiScale.add(controls, 'scaleX', 0, 5);
    guiScale.add(controls, 'scaleY', 0, 5);
    guiScale.add(controls, 'scaleZ', 0, 5);
    guiPosition = gui.addFolder('position');
    contX = guiPosition.add(controls, 'positionX', -10, 10);
    contY = guiPosition.add(controls, 'positionY', -4, 20);
    contZ = guiPosition.add(controls, 'positionZ', -10, 10);
    contX.listen();
    contX.onChange(function(value) {
      return shape.position.x = controls.positionX;
    });
    contY.listen();
    contY.onChange(function(value) {
      return shape.position.y = controls.positionY;
    });
    contZ.listen();
    contZ.onChange(function(value) {
      return shape.position.z = controls.positionZ;
    });
    guiContainer = document.getElementById('gui');
    guiContainer.appendChild(gui.domElement);
    $('#output').append(renderer.domElement);
    resize = function() {
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      return renderer.setSize(w, h);
    };
    render = function() {
      shape.scale.set(controls.scaleX, controls.scaleY, controls.scaleZ);
      shape.radius = controls.radius;
      requestAnimationFrame(render);
      return renderer.render(scene, camera);
    };
    window.addEventListener('resize', resize, false);
    render();
    /*
    # destroy GUI on scope destroy
    $scope.$on '$destroy', () ->
      Logger.debug 'Scope destroyed.'
      gui.destroy() if gui
    */

    return apply = function(scope, fn) {
      if (scope.$$phase || scope.$root.$$phase) {
        return fn();
      } else {
        return scope.$apply(fn);
      }
    };
  }
]);

app.controller('AdvancedPropertiesSphereCtrl', [
  '$scope', '$state', 'bxSocket', 'bxNotify', 'bxLogger', function($scope, $state, Socket, Notify, Logger) {
    var ambientLight, apply, camera, controls, create, gui, guiContainer, h, mouseControls, render, renderer, resize, scene, shape, spotLight, w, wrap;
    create = function(geometry) {
      var material, obj, shape, wireframe;
      material = new THREE.MeshLambertMaterial({
        color: 0x44ff44,
        wireframe: true
      });
      shape = new THREE.Mesh(geometry, material);
      return shape;
      material = new THREE.MeshNormalMaterial();
      material.side = THREE.DoubleSide;
      wireframe = new THREE.MeshBasicMaterial();
      wireframe.wireframe = true;
      obj = THREE.SceneUtils.createMultiMaterialObject(geometry, [material, wireframe]);
      obj.position.y = 4;
      obj.castShadow = true;
      return obj;
    };
    wrap = document.getElementById('wrap');
    scene = new THREE.Scene();
    w = $('#wrap').width();
    h = $('#wrap').height();
    camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColorHex(0xEEEEEE, 1.0);
    renderer.setSize(w, h);
    renderer.shadowMapEnabled = true;
    /*
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
    */

    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);
    ambientLight = new THREE.AmbientLight(0x0c0c0c);
    scene.add(ambientLight);
    spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, 20);
    spotLight.castShadow = true;
    scene.add(spotLight);
    shape = create(new THREE.SphereGeometry(5, 20, 20));
    scene.add(shape);
    Logger.debug('Added shape.', shape);
    controls = new function() {
      var _this = this;
      this.radius = shape.geometry.radius;
      this.widthSegments = shape.geometry.widthSegments;
      this.heightSegments = shape.geometry.heightSegments;
      /*
      @radius = shape.children[0].geometry.radius
      @widthSegments = shape.children[0].geometry.widthSegments
      @heightSegments = shape.children[0].geometry.heightSegments
      */

      /*
      @radius = 5
      @widthSegments = 20
      @heightSegments = 20
      */

      this.phiStart = 0;
      this.phiLength = Math.PI * 2;
      this.thetaStart = 0;
      this.thetaLength = Math.PI;
      this.redraw = function() {
        Logger.debug('Redrawing.', {
          radius: _this.radius,
          widthSegments: _this.widthSegments,
          heightSegments: _this.heightSegments
        });
        scene.remove(shape);
        shape = create(new THREE.SphereGeometry(_this.radius, _this.widthSegments, _this.heightSegments, _this.phiStart, _this.phiLength, _this.thetaStart, _this.thetaLength));
        scene.add(shape);
        return _this;
      };
      return this;
    };
    gui = new dat.GUI();
    gui.add(controls, 'radius', 0, 50).onChange(controls.redraw);
    gui.add(controls, 'widthSegments', 0, 50).onChange(controls.redraw);
    gui.add(controls, 'heightSegments', 0, 50).onChange(controls.redraw);
    gui.add(controls, 'phiStart', 0, Math.PI).onChange(controls.redraw);
    gui.add(controls, 'phiLength', 0, 2 * Math.PI).onChange(controls.redraw);
    gui.add(controls, 'thetaStart', 0, 2 * Math.PI).onChange(controls.redraw);
    gui.add(controls, 'thetaLength', 0, 2 * Math.PI).onChange(controls.redraw);
    guiContainer = document.getElementById('gui');
    guiContainer.appendChild(gui.domElement);
    mouseControls = new THREE.TrackballControls(camera);
    mouseControls.rotateSpeed = 1.0;
    mouseControls.zoomSpeed = 1.2;
    mouseControls.panSpeed = 0.8;
    mouseControls.noZoom = false;
    mouseControls.noPan = false;
    mouseControls.staticMoving = true;
    mouseControls.dynamicDampingFactor = 0.3;
    mouseControls.keys = [65, 83, 68];
    mouseControls.addEventListener('change', render);
    $('#output').append(renderer.domElement);
    resize = function() {
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      return mouseControls.handleResize();
    };
    render = function() {
      requestAnimationFrame(render);
      renderer.render(scene, camera);
      return mouseControls.update();
    };
    window.addEventListener('resize', resize, false);
    render();
    /*
    # destroy GUI on scope destroy
    $scope.$on '$destroy', () ->
      Logger.debug 'Scope destroyed.'
      gui.destroy() if gui
    */

    return apply = function(scope, fn) {
      if (scope.$$phase || scope.$root.$$phase) {
        return fn();
      } else {
        return scope.$apply(fn);
      }
    };
  }
]);

app.controller('IndexCtrl', [
  '$scope', '$state', 'bxSocket', 'bxNotify', 'bxLogger', function($scope, $state, Socket, Notify, Logger) {
    var apply;
    $scope.state = $state;
    return apply = function(scope, fn) {
      if (scope.$$phase || scope.$root.$$phase) {
        return fn();
      } else {
        return scope.$apply(fn);
      }
    };
  }
]);
