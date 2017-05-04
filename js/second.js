// Javascript for the Final Project second page
// Credit to Emil Persson (aka Humus) for the skyboxes:
// http://www.humus.name

// NOTE: Retool as a CSS Animation within a WebGL skybox.
// NOTE: Free camera look with THREE
// NOTE: On click of the buddha walls, they "fall over" (transform flat)

// Global variables:
var camera, scene, raycaster, renderer, controls;
var skyboxGeometry, skyboxMaterial, skyboxMesh;
var fakePlane, fakeMaterial, fakeMesh;
var fakeMaterialArray = ['neg-z', 'pos-x', 'pos-z', 'neg-x', 'pos-y', 'pos-z'];
var width = window.innerWidth;
var height = window.innerHeight;
var container = document.getElementById('container');
var blocker = document.getElementById('blocker');
var instructions = document.getElementById('instructions');
var havePointerLock = 'pointerLockElement' in document;

var mouse = new THREE.Vector2(), INTERSECTED;


// Page listener:
window.addEventListener('resize', onWindowResize);
// window.addEventListener('mousemove', onMouseMove);
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
    skyboxGeometry = new THREE.SphereGeometry(1000, 50, 50);
    skyboxMesh = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
    skyboxMesh.scale.x = -1; // Flip horizontally
    scene.add(skyboxMesh);
  });

  // Fake Environment
  var textureLoader = new THREE.TextureLoader();
  textureLoader.load('images/buddha/neg-z.jpg', function(tex) {
    fakeMaterial = new THREE.MeshBasicMaterial({map: tex, side: THREE.DoubleSide});
    fakePlane = new THREE.PlaneGeometry(1000, 1000, 10, 10);
    fakeMesh = new THREE.Mesh(fakePlane, fakeMaterial);
    fakeMesh.position.z = -500;
    scene.add(fakeMesh);
    fakeMesh.addEventListener('click', function(){ wallFall(fakeMesh) }, false);
  });
  var textureLoader = new THREE.TextureLoader();
  textureLoader.load('images/buddha/pos-x.jpg', function(tex) {
    fakeMaterial = new THREE.MeshBasicMaterial({map: tex, side: THREE.DoubleSide});
    fakePlane = new THREE.PlaneGeometry(1000, 1000, 10, 10);
    fakeMesh = new THREE.Mesh(fakePlane, fakeMaterial);
    fakeMesh.position.x = -500;
    fakeMesh.rotation.y = Math.PI / 2;
    scene.add(fakeMesh);
  });
  var textureLoader = new THREE.TextureLoader();
  textureLoader.load('images/buddha/pos-z.jpg', function(tex) {
    fakeMaterial = new THREE.MeshBasicMaterial({map: tex, side: THREE.DoubleSide});
    fakePlane = new THREE.PlaneGeometry(1000, 1000, 10, 10);
    fakeMesh = new THREE.Mesh(fakePlane, fakeMaterial);
    fakeMesh.position.z = 500;
    fakeMesh.rotation.y = Math.PI;
    scene.add(fakeMesh);
  });
  var textureLoader = new THREE.TextureLoader();
  textureLoader.load('images/buddha/neg-x.jpg', function(tex) {
    fakeMaterial = new THREE.MeshBasicMaterial({map: tex, side: THREE.DoubleSide});
    fakePlane = new THREE.PlaneGeometry(1000, 1000, 10, 10);
    fakeMesh = new THREE.Mesh(fakePlane, fakeMaterial);
    fakeMesh.position.x = 500;
    fakeMesh.rotation.y = Math.PI / -2;
    scene.add(fakeMesh);
  });
  var textureLoader = new THREE.TextureLoader();
  textureLoader.load('images/buddha/pos-y.jpg', function(tex) {
    fakeMaterial = new THREE.MeshBasicMaterial({map: tex, side: THREE.DoubleSide});
    fakePlane = new THREE.PlaneGeometry(1000, 1000, 10, 10);
    fakeMesh = new THREE.Mesh(fakePlane, fakeMaterial);
    fakeMesh.position.y = 500;
    fakeMesh.rotation.x = Math.PI / -2;
    fakeMesh.rotation.y = Math.PI;
    scene.add(fakeMesh);
  });
  var textureLoader = new THREE.TextureLoader();
  textureLoader.load('images/buddha/neg-y.jpg', function(tex) {
    fakeMaterial = new THREE.MeshBasicMaterial({map: tex, side: THREE.DoubleSide});
    fakePlane = new THREE.PlaneGeometry(1000, 1000, 10, 10);
    fakeMesh = new THREE.Mesh(fakePlane, fakeMaterial);
    fakeMesh.position.y = -500;
    fakeMesh.rotation.x = Math.PI / -2;
    fakeMesh.rotation.z = Math.PI;
    scene.add(fakeMesh);
  });

  // Create renderer and controls:
  raycaster = new THREE.Raycaster();
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
	controls = new THREE.PointerLockControls(camera, renderer.domElement);
	scene.add(controls.getObject());
  raycaster.setFromCamera( mouse, camera );
  console.log(raycaster);
  controls.enablePan = false;
  controls.enableZoom = false;
  container.appendChild(renderer.domElement);
}

function animate() {
  requestAnimationFrame(animate);
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

function onClick() {
	controlsEnabled = true;
	controls.enabled = true;
  container.requestPointerLock();
	blocker.style.display = 'none';
}

function wallFall(wall) {
  wall.position.y = -500;
  wall.rotation.x = Math.PI / 2;
}

init();
animate();



// Fake Environment loop-loader WIP:

  // for (var i = 0; i < fakeMaterialArray.length; i++) {
  //   var textureLoader = new THREE.TextureLoader();
  //   textureLoader.load('images/buddha/' + fakeMaterialArray[i] + '.jpg', function(tex) {
  //     fakeMaterial = new THREE.MeshBasicMaterial({map: tex, side: THREE.DoubleSide});
  //     fakePlane = new THREE.PlaneGeometry(1000, 1000, 10, 10);
  //     fakeMesh = new THREE.Mesh(fakePlane, fakeMaterial);
  //     if (i = 0) {
  //       fakeMesh.position.z = -500;
  //     }
  //     if (i = 1) {
  //     }
  //     if (i = 2) {
  //     }
  //     if (i = 3) {
  //     }
  //     if (i = 4) {
  //     }
  //     if (i = 5) {
  //     }
  //     scene.add(fakeMesh);
  //   })
  // };
