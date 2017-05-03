// Javascript for the Final Project second page
// Credit to Emil Persson (aka Humus) for the skyboxes:
// http://www.humus.name

// NOTE: Retool as a CSS Animation within a WebGL skybox.
// NOTE: Free camera look with THREE
// NOTE: On click of the buddha walls, they "fall over" (transform flat)

// Global variables:
var camera, scene, renderer, controls;
var skyboxGeometry, skyboxMaterial, skyboxMesh;
var width = window.innerWidth;
var height = window.innerHeight;
var container = document.getElementById('container');
var blocker = document.getElementById('blocker');
var instructions = document.getElementById('instructions');
var havePointerLock = 'pointerLockElement' in document;

// Page listener:
window.addEventListener('resize', onWindowResize);
window.addEventListener('click', onClick);

function init() {
  // Create scene and camera:
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(90, width/height, 0.1, 25000);
  camera.position.set(0, 3, 8);
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

  //NOTE: Add look controls here.
  //NOTE: NO CLICK

  // Create renderer:
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true});
  renderer.setSize(width, height);

	controls = new THREE.PointerLockControls(camera, renderer.domElement);
	scene.add(controls.getObject());
	// container.addEventListener('click', function(event) {
  // 	controls.enabled = true;
	// 	 container.requestPointerLock();
	//  });
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

init();
animate();
