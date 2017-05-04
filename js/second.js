// Javascript for the Final Project second page
// Credit to Emil Persson (aka Humus) for the skyboxes:
// http://www.humus.name
// SPECIAL thanks to xoryouyou on http://stackoverflow.com for pointing out JS object selectivity (object.geometry.type) with this fiddle: http://jsfiddle.net/z43hjqm9/1/ -- Definitely the biggest breakthrough for this project.

//NOTE: Interesting Zoolander bug: limited left turn when F11 fullscreen.

// Global variables:
var camera, scene, raycaster, direction, renderer, controls;
var skyboxGeometry, skyboxMaterial, skyboxMesh;
var fakePlane, fakeMaterial, fakeWall;
var fakeMaterialArray = ['neg-z', 'pos-x', 'pos-z', 'neg-x', 'pos-y', 'pos-z'];
var width = window.innerWidth;
var height = window.innerHeight;
var container = document.getElementById('container');
var blocker = document.getElementById('blocker');
var instructions = document.getElementById('instructions');
var havePointerLock = 'pointerLockElement' in document;
var running;

// Page listeners:
window.addEventListener('resize', onWindowResize);
window.addEventListener('click', onClick);

function init() {
  // Create scene and camera:
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(90, width/height, 0.1, 25000);
  camera.position.set(0, 1, 1);
  scene.add(camera);

  // Skybox
  var textureLoader = new THREE.TextureLoader();
  textureLoader.load('images/studio.jpg', function(tex) {
    skyboxMaterial = new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide });
    skyboxGeometry = new THREE.SphereGeometry(2000, 50, 50);
    skyboxMesh = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
    skyboxMesh.scale.x = -1; // Flip horizontally
    scene.add(skyboxMesh);
  });

  // Fake Environment
  var textureLoader = new THREE.TextureLoader();
  textureLoader.load('images/buddha/neg-z.jpg', function(tex) {
    fakeMaterial = new THREE.MeshBasicMaterial({map: tex, side: THREE.DoubleSide});
    fakePlane = new THREE.PlaneGeometry(1000, 1000, 10, 10);
    fakeWall = new THREE.Mesh(fakePlane, fakeMaterial);
    fakeWall.position.z = -500;
    fakeWall.fall = false;
    fakeWall.name = 'fWall';
    scene.add(fakeWall);
  });
  var textureLoader = new THREE.TextureLoader();
  textureLoader.load('images/buddha/pos-x.jpg', function(tex) {
    fakeMaterial = new THREE.MeshBasicMaterial({map: tex, side: THREE.DoubleSide});
    fakePlane = new THREE.PlaneGeometry(1000, 1000, 10, 10);
    fakeWall = new THREE.Mesh(fakePlane, fakeMaterial);
    fakeWall.position.x = -500;
    fakeWall.rotation.y = Math.PI / 2;
    fakeWall.fall = false;
    fakeWall.name = 'fWall';
    scene.add(fakeWall);
  });
  var textureLoader = new THREE.TextureLoader();
  textureLoader.load('images/buddha/pos-z.jpg', function(tex) {
    fakeMaterial = new THREE.MeshBasicMaterial({map: tex, side: THREE.DoubleSide});
    fakePlane = new THREE.PlaneGeometry(1000, 1000, 10, 10);
    fakeWall = new THREE.Mesh(fakePlane, fakeMaterial);
    fakeWall.position.z = 500;
    fakeWall.rotation.y = Math.PI;
    fakeWall.fall = false;
    fakeWall.name = 'fWall';
    scene.add(fakeWall);
  });
  var textureLoader = new THREE.TextureLoader();
  textureLoader.load('images/buddha/neg-x.jpg', function(tex) {
    fakeMaterial = new THREE.MeshBasicMaterial({map: tex, side: THREE.DoubleSide});
    fakePlane = new THREE.PlaneGeometry(1000, 1000, 10, 10);
    fakeWall = new THREE.Mesh(fakePlane, fakeMaterial);
    fakeWall.position.x = 500;
    fakeWall.rotation.y = Math.PI / -2;
    fakeWall.fall = false;
    fakeWall.name = 'fWall';
    scene.add(fakeWall);
  });
  var textureLoader = new THREE.TextureLoader();
  textureLoader.load('images/buddha/pos-y.jpg', function(tex) {
    fakeMaterial = new THREE.MeshBasicMaterial({map: tex, side: THREE.DoubleSide});
    fakePlane = new THREE.PlaneGeometry(1000, 1000, 10, 10);
    fakeWall = new THREE.Mesh(fakePlane, fakeMaterial);
    fakeWall.position.y = 500;
    fakeWall.rotation.x = Math.PI / -2;
    fakeWall.rotation.y = Math.PI;
    fakeWall.fall = false;
    fakeWall.name = 'fWall';
    scene.add(fakeWall);
  });
  var textureLoader = new THREE.TextureLoader();
  textureLoader.load('images/buddha/neg-y.jpg', function(tex) {
    fakeMaterial = new THREE.MeshBasicMaterial({map: tex, side: THREE.DoubleSide});
    fakePlane = new THREE.PlaneGeometry(1000, 1000, 10, 10);
    fakeWall = new THREE.Mesh(fakePlane, fakeMaterial);
    fakeWall.position.y = -500;
    fakeWall.rotation.x = Math.PI / -2;
    fakeWall.rotation.z = Math.PI;
    fakeWall.fall = false;
    fakeWall.name = 'fWall';
    scene.add(fakeWall);
  }); // End Fake Environment

  // Create renderer and controls:
  direction = new THREE.Vector3();
  raycaster = new THREE.Raycaster();
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  controls = new THREE.PointerLockControls(camera, renderer.domElement);
  scene.add(controls.getObject());
  controls.enablePan = false;
  controls.enableZoom = false;
  container.appendChild(renderer.domElement);
}

// Update the scene and animate any falling fakeWalls:
function animate() {
  requestAnimationFrame(animate);
  scene.traverse (function (obj)
  {
    if (obj.name == 'fWall') {
      if (obj.fall) {
        obj.position.y -= 9;
        obj.rotation.x += 0.008;
      }
    }
  });
	renderer.render(scene, camera);
}

// Update width and height, then adjust the camera and re-render:
function onWindowResize() {
	width = window.innerWidth;
	height = window.innerHeight;
	camera.aspect = width / height;
	camera.updateProjectionMatrix();
	renderer.setSize(width, height);
}

// Updates raycaster:
function castRay() {
  controls.getDirection( direction );
  raycaster.set(controls.getObject().position, direction);
}

function onClick(event){
  // The first click locks the camera and 'starts' the experience:
  if (!running) {
    running = true;
    controlsEnabled = true;
	  controls.enabled = true;
    container.requestPointerLock();
	  blocker.style.display = 'none';
  }
  // Subsequent clicks check for, then drop the fakeWalls:
  else {
    container.requestPointerLock();
    raycaster = new THREE.Raycaster();
    castRay();
    var intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0) {
      if (intersects[0].object.geometry.type === 'PlaneGeometry'){
        intersects[0].object.fall = true;
      }
    }
  }
}

init();
animate();



// Fake Environment loop-loader WIP:
//
//// for (var i = 0; i < fakeMaterialArray.length; i++) {
  //   var textureLoader = new THREE.TextureLoader();
  //   textureLoader.load('images/buddha/' + fakeMaterialArray[i] + '.jpg', function(tex) {
  //     fakeMaterial = new THREE.MeshBasicMaterial({map: tex, side: THREE.DoubleSide});
  //     fakePlane = new THREE.PlaneGeometry(1000, 1000, 10, 10);
  //     fakeWall = new THREE.Mesh(fakePlane, fakeMaterial);
  //     fakeWall.fall = false;
  //     fakeWall.name = 'fWall';
  //     if (i == 0) {
  //       fakeWall.position.z = -500;
  //     }
  //     if (i == 1) {
  //       fakeWall.position.x = -500;
  //       fakeWall.rotation.y = Math.PI / 2;
  //     }
  //     if (i == 2) {
  //       fakeWall.position.z = 500;
  //       fakeWall.rotation.y = Math.PI;
  //     }
  //     if (i == 3) {
  //       fakeWall.position.x = 500;
  //       fakeWall.rotation.y = Math.PI / -2;
  //     }
  //     if (i == 4) {
  //       fakeWall.rotation.x = Math.PI / -2;
  //       fakeWall.rotation.y = Math.PI;
  //     }
  //     if (i == 5) {
  //       fakeWall.rotation.x = Math.PI / -2;
  //       fakeWall.rotation.z = Math.PI;
  //     }
  //     scene.add(fakeWall);
  //   })
  // };
