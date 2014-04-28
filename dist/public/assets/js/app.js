/** 
 * topo-experiments - v0.0.0 - 2014-04-28
 * topo-experiments.com 
 * 
 * Copyright (c) 2014 
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
  return $stateProvider.state('add-shapes', {
    url: '/add-shapes',
    templateUrl: '/routes/add-shapes/views/add-shapes.html'
  });
});

app.config(function($stateProvider) {
  return $stateProvider.state('advanced-properties-sphere', {
    url: '/advanced-properties-sphere',
    templateUrl: '/routes/advanced-properties-sphere/views/' + 'advanced-properties-sphere.html'
  });
});

app.config(function($stateProvider) {
  return $stateProvider.state('basic-properties-sphere', {
    url: '/basic-properties-sphere',
    templateUrl: '/routes/basic-properties-sphere/views/' + 'basic-properties-sphere.html'
  });
});

app.config(function($stateProvider) {
  return $stateProvider.state('basic-properties', {
    url: '/basic-properties',
    templateUrl: '/routes/basic-properties/views/basic-properties.html'
  });
});

app.config(function($stateProvider) {
  return $stateProvider.state('convex-geometry', {
    url: '/convex-geometry',
    templateUrl: '/routes/convex-geometry/views/convex-geometry.html'
  });
});

app.config(function($stateProvider) {
  return $stateProvider.state('custom-vertices', {
    url: '/custom-vertices',
    templateUrl: '/routes/custom-vertices/views/custom-vertices.html'
  });
});

app.config(function($stateProvider) {
  return $stateProvider.state('drag-shapes', {
    url: '/drag-shapes',
    templateUrl: '/routes/drag-shapes/views/drag-shapes.html'
  });
});

app.config(function($stateProvider) {
  return $stateProvider.state('grid-stack', {
    url: '/grid-stack',
    templateUrl: '/routes/grid-stack/views/grid-stack.html'
  });
});

app.config(function($stateProvider) {
  return $stateProvider.state('index', {
    url: '/',
    templateUrl: '/routes/index/views/index.html'
  });
  /*
  $stateProvider.state 'index.basic-properties',
    url: 'basic-properties'
    templateUrl: '/routes/1-basic-properties/views/basic-properties.html'
  
  $stateProvider.state 'index.custom-vertices',
    url: 'custom-vertices'
    templateUrl: '/routes/2-custom-vertices/views/custom-vertices.html'
  
  $stateProvider.state 'index.add-shapes',
    url: 'add-shapes'
    templateUrl: '/routes/3-add-shapes/views/add-shapes.html'
  
  $stateProvider.state 'index.trackball-camera',
    url: 'trackball-camera'
    templateUrl: '/routes/4-trackball-camera/views/trackball-camera.html'
  
  $stateProvider.state 'index.basic-properties-sphere',
    url: 'basic-properties-sphere'
    templateUrl: '/routes/5-basic-properties-sphere/' +
      'views/basic-properties-sphere.html'
  
  $stateProvider.state 'index.advanced-properties-sphere',
    url: 'advanced-properties-sphere'
    templateUrl: '/routes/6-advanced-properties-sphere/' +
      'views/advanced-properties-sphere.html'
  */

});

app.config(function($stateProvider) {
  return $stateProvider.state('select-shapes', {
    url: '/select-shapes',
    templateUrl: '/routes/select-shapes/views/select-shapes.html'
  });
});

app.config(function($stateProvider) {
  return $stateProvider.state('trackball-camera', {
    url: '/trackball-camera',
    templateUrl: '/routes/trackball-camera/views/trackball-camera.html'
  });
});

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

app.controller('AdvancedPropertiesSphereCtrl', [
  '$scope', '$state', 'bxSocket', 'bxNotify', 'bxLogger', function($scope, $state, Socket, Notify, Logger) {
    var ambientLight, apply, camera, clock, controls, create, gui, guiContainer, h, render, renderer, resize, scene, shape, spotLight, trackballControls, w, wrap;
    create = function(geometry) {
      var material, shape;
      material = new THREE.MeshLambertMaterial({
        color: 0x44ff44,
        wireframe: true
      });
      shape = new THREE.Mesh(geometry, material);
      return shape;
      /*
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
      */

    };
    clock = new THREE.Clock();
    wrap = document.getElementById('wrap');
    scene = new THREE.Scene();
    w = $('#wrap').width();
    h = $('#wrap').height();
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xEEEEEE, 1.0);
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

    camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
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
    shape = create(new THREE.SphereGeometry(10, 20, 20));
    scene.add(shape);
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
    gui.add(controls, 'phiLength', 0, 2 * Math.PI).onChange(controls.redraw);
    gui.add(controls, 'thetaLength', 0, Math.PI).onChange(controls.redraw);
    guiContainer = document.getElementById('gui');
    guiContainer.appendChild(gui.domElement);
    resize = function() {
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      return trackballControls.handleResize();
    };
    window.addEventListener('resize', resize, false);
    render = function() {
      requestAnimationFrame(render);
      renderer.render(scene, camera);
      return trackballControls.update();
    };
    $('#output').append(renderer.domElement);
    trackballControls = new THREE.TrackballControls(camera, renderer.domElement);
    trackballControls.rotateSpeed = 1.0;
    trackballControls.zoomSpeed = 1.2;
    trackballControls.panSpeed = 0.8;
    /*
    trackballControls.noZoom = false
    trackballControls.noPan = false
    
    trackballControls.staticMoving = true
    trackballControls.dynamicDampingFactor = 0.3
    */

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

app.controller('ConvexGeometryCtrl', [
  '$scope', '$state', 'bxSocket', 'bxNotify', 'bxLogger', function($scope, $state, Socket, Notify, Logger) {
    var ambientLight, apply, camera, controls, createMesh, group, gui, guiContainer, h, render, renderer, resize, scene, shape, spotLight, w, wrap;
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
    /*
    # add shape
    material = new THREE.MeshLambertMaterial
      color: 0x44ff44
    geometry = new THREE.CubeGeometry 5, 8, 3
    shape = new THREE.Mesh geometry, material
    shape.position.y = 4
    shape.castShadow = true
    scene.add shape
    */

    shape = null;
    group = null;
    createMesh = function(geom) {
      /*
      material = new THREE.MeshBasicMaterial()
      material.side = THREE.DoubleSide
      wireframeMaterial = new THREE.MeshBasicMaterial
        color: 0x00ff00
        transparent: true
        opacity: 0.2
      wireframeMaterial.wireframe = true
      */

      var material, mesh, wireframeMaterial;
      material = new THREE.MeshNormalMaterial({
        transparent: true,
        opacity: 0.2
      });
      material.side = THREE.DoubleSide;
      wireframeMaterial = new THREE.MeshBasicMaterial();
      wireframeMaterial.wireframe = true;
      mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [material, wireframeMaterial]);
      return mesh;
    };
    controls = new function() {
      this.redraw = function() {
        var convexGeom, convexMesh, i, material, points, x, y, z;
        points = [];
        i = 0;
        while (++i <= 15) {
          x = Math.round(Math.random() * 30) - 20;
          y = Math.round(Math.random() * 30) - 20;
          z = Math.round(Math.random() * 30) - 20;
          points.push(new THREE.Vector3(x, y, z));
        }
        /*
        */

        if (group) {
          scene.remove(group);
        }
        group = new THREE.Object3D();
        material = new THREE.MeshBasicMaterial({
          color: 0xff0000,
          transparent: false
        });
        points.forEach(function(p) {
          var geom, mesh;
          geom = new THREE.SphereGeometry(0.2);
          mesh = new THREE.Mesh(geom, material);
          mesh.position = p;
          return group.add(mesh);
        });
        scene.add(group);
        convexGeom = new THREE.ConvexGeometry(points);
        convexMesh = createMesh(convexGeom);
        if (shape) {
          scene.remove(shape);
        }
        shape = convexMesh;
        return scene.add(shape);
      };
      this.x = 0;
      this.y = 0;
      this.z = 0;
      this.rotateX = false;
      this.rotateY = true;
      this.rotateZ = false;
      this.rotationSpeed = 1;
      return this;
    };
    controls.redraw();
    gui = new dat.GUI();
    gui.add(controls, 'redraw');
    /*
    gui.add controls, 'x', -10, 10
    gui.add controls, 'y', -10, 10
    gui.add controls, 'z', -10, 10
    */

    gui.add(controls, 'rotateX');
    gui.add(controls, 'rotateY');
    gui.add(controls, 'rotateZ');
    gui.add(controls, 'rotationSpeed', 0, 10);
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
      /*
      # rotate the shapes
      scene.traverse (e) ->
        if e instanceof THREE.Mesh and e != plane
          e.rotation.x += controls.rotationSpeed
          e.rotation.y += controls.rotationSpeed
          e.rotation.z += controls.rotationSpeed
      */

      var rotationSpeed;
      rotationSpeed = controls.rotationSpeed / 100;
      if (controls.rotateX) {
        if (shape) {
          shape.rotation.x += rotationSpeed;
        }
        if (group) {
          group.rotation.x += rotationSpeed;
        }
      }
      if (controls.rotateY) {
        if (shape) {
          shape.rotation.y += rotationSpeed;
        }
        if (group) {
          group.rotation.y += rotationSpeed;
        }
      }
      if (controls.rotateZ) {
        if (shape) {
          shape.rotation.z += rotationSpeed;
        }
        if (group) {
          group.rotation.z += rotationSpeed;
        }
      }
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

app.controller('DragShapesCtrl', [
  '$scope', '$state', 'bxSocket', 'bxNotify', 'bxLogger', function($scope, $state, Socket, Notify, Logger) {
    var INTERSECTED, SELECTED, apply, axis, camera, createCube, h, mouse, offset, onDocumentMouseDown, onDocumentMouseMove, onDocumentMouseUp, plane, planeGeometry, planeMaterial, projector, render, renderer, resize, scene, shape, shapes, trackballControls, w, wrap;
    createCube = function(size) {
      /*
      color = Math.random() * 0xffffff
      console.log 'Got color.', color
      */

      var geometry, material, shape;
      geometry = new THREE.CubeGeometry(size, size, size);
      material = new THREE.MeshBasicMaterial({
        color: 0xffffff * Math.random(),
        opacity: 0.5
      });
      shape = new THREE.Mesh(geometry, material);
      shape.name = 'cube-' + scene.children.length;
      shape = new THREE.Mesh(geometry, material);
      return shape;
    };
    INTERSECTED = null;
    SELECTED = null;
    projector = null;
    mouse = new THREE.Vector2();
    offset = new THREE.Vector3();
    wrap = document.getElementById('wrap');
    scene = new THREE.Scene();
    w = $('#wrap').width();
    h = $('#wrap').height();
    camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    renderer = new THREE.CanvasRenderer();
    renderer.setClearColor(0xEEEEEE, 1.0);
    renderer.setSize(w, h);
    planeGeometry = new THREE.PlaneGeometry(100, 100, 10, 10);
    planeMaterial = new THREE.MeshBasicMaterial({
      color: 0x333333,
      wireframe: true
    });
    plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = 0;
    scene.add(plane);
    axis = new THREE.AxisHelper(100);
    axis.position.x = 0;
    axis.position.y = 1;
    axis.position.z = 0;
    scene.add(axis);
    camera.position.x = -125;
    camera.position.y = 100;
    camera.position.z = 25;
    camera.lookAt(scene.position);
    shapes = [];
    shape = createCube(10);
    shape.position.x = 5;
    shape.position.y = 5;
    shape.position.z = 5;
    shapes.push(shape);
    scene.add(shape);
    shape = createCube(10);
    shape.position.x = 15;
    shape.position.y = 5;
    shape.position.z = -35;
    shapes.push(shape);
    scene.add(shape);
    shape = createCube(10);
    shape.position.x = -45;
    shape.position.y = 5;
    shape.position.z = 25;
    shapes.push(shape);
    scene.add(shape);
    shape = createCube(10);
    shape.position.x = -15;
    shape.position.y = 5;
    shape.position.z = 25;
    shapes.push(shape);
    scene.add(shape);
    shape = createCube(10);
    shape.position.x = -45;
    shape.position.y = 5;
    shape.position.z = 45;
    shapes.push(shape);
    scene.add(shape);
    shape = createCube(10);
    shape.position.x = -35;
    shape.position.y = 5;
    shape.position.z = -35;
    shapes.push(shape);
    scene.add(shape);
    shape = createCube(10);
    shape.position.x = -25;
    shape.position.y = 5;
    shape.position.z = -15;
    shapes.push(shape);
    scene.add(shape);
    shape = createCube(10);
    shape.position.x = 25;
    shape.position.y = 5;
    shape.position.z = 35;
    shapes.push(shape);
    scene.add(shape);
    $('#output').append(renderer.domElement);
    resize = function() {
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      return trackballControls.handleResize();
    };
    render = function() {
      requestAnimationFrame(render);
      renderer.render(scene, camera);
      return trackballControls.update();
    };
    trackballControls = new THREE.TrackballControls(camera, renderer.domElement);
    trackballControls.rotateSpeed = 1.0;
    trackballControls.zoomSpeed = 1.2;
    trackballControls.panSpeed = 0.8;
    trackballControls.noZoom = false;
    trackballControls.noPan = false;
    trackballControls.staticMoving = true;
    trackballControls.dynamicDampingFactor = 0.3;
    trackballControls.keys = [65, 83, 68];
    projector = new THREE.Projector();
    mouse = new THREE.Vector2();
    offset = new THREE.Vector3();
    SELECTED = null;
    INTERSECTED = false;
    onDocumentMouseDown = function(e) {
      var intersects, raycaster, vector;
      e.preventDefault();
      vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
      projector.unprojectVector(vector, camera);
      raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
      intersects = raycaster.intersectObjects(shapes);
      if (intersects.length > 0) {
        Logger.debug('INTERSECTION DETECTED', intersects[0].object);
        SELECTED = intersects[0].object;
        intersects = raycaster.intersectObject(plane);
        offset.copy(intersects[0].point).sub(plane.position);
        return trackballControls.enabled = false;
      }
    };
    onDocumentMouseUp = function(e) {
      e.preventDefault();
      trackballControls.enabled = true;
      if (SELECTED) {
        return SELECTED = null;
      }
      /*
      if INTERSECTED
        SELECTED.position.copy INTERSECTED.position
        SELECTED = null
        INTERSECTED = false
      */

    };
    onDocumentMouseMove = function(e) {
      var intersects, raycaster, vector;
      e.preventDefault();
      mouse.x = ((e.pageX - $('#output').offset().left) / w) * 2 - 1;
      mouse.y = -((e.pageY - $('#output').offset().top) / h) * 2 + 1;
      vector = new THREE.Vector3(mouse.x, mouse.y, 5);
      projector.unprojectVector(vector, camera);
      raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
      if (SELECTED) {
        intersects = raycaster.intersectObject(plane);
        Logger.debug('Got intersects.', intersects);
        return SELECTED.position.copy(intersects[0].point.sub(offset));
      }
    };
    window.addEventListener('resize', resize, false);
    renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
    renderer.domElement.addEventListener('mouseup', onDocumentMouseUp, false);
    renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
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

app.controller('GridStackCtrl', [
  '$scope', '$state', 'bxLogger', function($scope, $state, Logger) {
    var ambientLight, apply, camera, h, helper, orbitControls, render, renderer, resize, scene, spotLight, w, wrap;
    wrap = document.getElementById('wrap');
    scene = new THREE.Scene();
    w = $('#wrap').width();
    h = $('#wrap').height();
    camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xEEEEEE, 1.0);
    renderer.setSize(w, h);
    renderer.shadowMapEnabled = true;
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
    $('#output').append(renderer.domElement);
    resize = function() {
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      return orbitControls.handleResize();
    };
    render = function() {
      requestAnimationFrame(render);
      renderer.render(scene, camera);
      return orbitControls.update();
    };
    window.addEventListener('resize', resize, false);
    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
    orbitControls.rotateSpeed = 1.0;
    orbitControls.zoomSpeed = 1.2;
    orbitControls.panSpeed = 0.8;
    orbitControls.noZoom = false;
    orbitControls.noPan = false;
    helper = new THREE.GridHelper(100, 10);
    helper.setColors(0x333333, 0x333333);
    helper.rotation.x = 0;
    helper.rotation.y = 0;
    helper.rotation.z = 0;
    helper.position.x = 0;
    helper.position.y = 0;
    helper.position.z = 0;
    scene.add(helper);
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

app.controller('SelectShapesCtrl', [
  '$scope', '$state', 'bxSocket', 'bxNotify', 'bxLogger', function($scope, $state, Socket, Notify, Logger) {
    var INTERSECTED, SELECTED, apply, axis, camera, color, controls, createCube, gui, guiContainer, h, mouse, offset, onDocumentMouseDown, plane, planeGeometry, planeMaterial, projector, render, renderer, resize, scene, select, shape, shapes, trackballControls, w, wrap;
    createCube = function(size, color) {
      /*
      color = Math.random() * 0xffffff
      console.log 'Got color.', color
      */

      var geometry, material, shape;
      geometry = new THREE.CubeGeometry(size, size, size);
      material = new THREE.MeshBasicMaterial({
        color: color,
        opacity: 0.5
      });
      shape = new THREE.Mesh(geometry, material);
      shape.name = 'cube-' + scene.children.length;
      shape = new THREE.Mesh(geometry, material);
      return shape;
    };
    INTERSECTED = null;
    SELECTED = null;
    projector = null;
    mouse = new THREE.Vector2();
    offset = new THREE.Vector3();
    wrap = document.getElementById('wrap');
    scene = new THREE.Scene();
    w = $('#wrap').width();
    h = $('#wrap').height();
    camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    renderer = new THREE.CanvasRenderer();
    renderer.setClearColor(0xEEEEEE, 1.0);
    renderer.setSize(w, h);
    planeGeometry = new THREE.PlaneGeometry(100, 100, 10, 10);
    planeMaterial = new THREE.MeshBasicMaterial({
      color: 0x333333,
      wireframe: true
    });
    plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = 0;
    scene.add(plane);
    axis = new THREE.AxisHelper(100);
    axis.position.x = 0;
    axis.position.y = 1;
    axis.position.z = 0;
    scene.add(axis);
    camera.position.x = -125;
    camera.position.y = 100;
    camera.position.z = 25;
    camera.lookAt(scene.position);
    /*
    # add subtle ambient lighting
    ambientLight = new THREE.AmbientLight 0x0c0c0c
    scene.add ambientLight
    */

    /*
    # add spotlight for shadows
    spotLight = new THREE.SpotLight 0xffffff
    spotLight.position.set 0, 100, 0
    spotLight.castShadow = false
    scene.add spotLight
    */

    color = 13258525.865980228;
    shapes = [];
    shape = createCube(10, color);
    shape.position.x = 5;
    shape.position.y = 5;
    shape.position.z = 5;
    shapes.push(shape);
    scene.add(shape);
    shape = createCube(10, color);
    shape.position.x = 15;
    shape.position.y = 5;
    shape.position.z = -35;
    shapes.push(shape);
    scene.add(shape);
    shape = createCube(10, color);
    shape.position.x = -45;
    shape.position.y = 5;
    shape.position.z = 25;
    shapes.push(shape);
    scene.add(shape);
    shape = createCube(10, color);
    shape.position.x = -15;
    shape.position.y = 5;
    shape.position.z = 25;
    shapes.push(shape);
    scene.add(shape);
    shape = createCube(10, color);
    shape.position.x = -45;
    shape.position.y = 5;
    shape.position.z = 45;
    shapes.push(shape);
    scene.add(shape);
    shape = createCube(10, color);
    shape.position.x = -35;
    shape.position.y = 5;
    shape.position.z = -35;
    shapes.push(shape);
    scene.add(shape);
    shape = createCube(10, color);
    shape.position.x = -25;
    shape.position.y = 5;
    shape.position.z = -15;
    shapes.push(shape);
    scene.add(shape);
    shape = createCube(10, color);
    shape.position.x = 25;
    shape.position.y = 5;
    shape.position.z = 35;
    shapes.push(shape);
    scene.add(shape);
    SELECTED = shape;
    select = function(newSelected) {
      var s, _i, _len;
      for (_i = 0, _len = shapes.length; _i < _len; _i++) {
        s = shapes[_i];
        s.material = new THREE.MeshBasicMaterial({
          color: 0x333,
          opacity: 0.5
        });
      }
      SELECTED = newSelected;
      return SELECTED.material = new THREE.MeshBasicMaterial({
        opacity: 0.9,
        color: color
      });
    };
    select(shape);
    controls = new function() {
      this.moveUp = function() {
        return SELECTED.translateX(10);
      };
      this.moveDown = function() {
        return SELECTED.translateX(-10);
      };
      this.moveLeft = function() {
        return SELECTED.translateZ(-10);
      };
      this.moveRight = function() {
        return SELECTED.translateZ(10);
      };
      return this;
    };
    gui = new dat.GUI();
    gui.add(controls, 'moveUp');
    gui.add(controls, 'moveDown');
    gui.add(controls, 'moveLeft');
    gui.add(controls, 'moveRight');
    guiContainer = document.getElementById('gui');
    guiContainer.appendChild(gui.domElement);
    $('#output').append(renderer.domElement);
    resize = function() {
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      return trackballControls.handleResize();
    };
    render = function() {
      requestAnimationFrame(render);
      renderer.render(scene, camera);
      return trackballControls.update();
    };
    trackballControls = new THREE.TrackballControls(camera, renderer.domElement);
    trackballControls.rotateSpeed = 1.0;
    trackballControls.zoomSpeed = 1.2;
    trackballControls.panSpeed = 0.8;
    trackballControls.noZoom = false;
    trackballControls.noPan = false;
    trackballControls.staticMoving = true;
    trackballControls.dynamicDampingFactor = 0.3;
    trackballControls.keys = [65, 83, 68];
    projector = new THREE.Projector();
    onDocumentMouseDown = function(e) {
      var intersects, param1, param2, raycaster, vector;
      e.preventDefault();
      /*
      Logger.debug 'mousedown fired.',
        x: e.pageX
        y: e.pageY
        offsetLeft: $('#output').offset().left
        offsetTop: $('#output').offset().top
        newX: e.clientX - renderer.domElement.offsetLeft
        newY: e.clientY - renderer.domElement.offsetTop
      */

      param1 = ((e.pageX - $('#output').offset().left) / w) * 2 - 1;
      param2 = -((e.pageY - $('#output').offset().top) / h) * 2 + 1;
      vector = new THREE.Vector3(param1, param2, 0.5);
      projector.unprojectVector(vector, camera);
      raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
      intersects = raycaster.intersectObjects(shapes);
      if (intersects.length > 0) {
        Logger.debug('INTERSECTION DETECTED', intersects);
        return select(intersects[0].object);
      }
    };
    window.addEventListener('resize', resize, false);
    renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
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

app.controller('TrackballCameraCtrl', [
  '$scope', '$state', 'bxSocket', 'bxNotify', 'bxLogger', function($scope, $state, Socket, Notify, Logger) {
    var ambientLight, apply, camera, h, plane, planeGeometry, planeMaterial, render, renderer, resize, scene, spotLight, trackballControls, w, wrap;
    wrap = document.getElementById('wrap');
    scene = new THREE.Scene();
    w = $('#wrap').width();
    h = $('#wrap').height();
    camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xEEEEEE, 1.0);
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
    $('#output').append(renderer.domElement);
    resize = function() {
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      return trackballControls.handleResize();
    };
    render = function() {
      requestAnimationFrame(render);
      renderer.render(scene, camera);
      return trackballControls.update();
    };
    window.addEventListener('resize', resize, false);
    trackballControls = new THREE.TrackballControls(camera, renderer.domElement);
    trackballControls.rotateSpeed = 1.0;
    trackballControls.zoomSpeed = 1.2;
    trackballControls.panSpeed = 0.8;
    trackballControls.noZoom = false;
    trackballControls.noPan = false;
    trackballControls.staticMoving = true;
    trackballControls.dynamicDampingFactor = 0.3;
    trackballControls.keys = [65, 83, 68];
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
