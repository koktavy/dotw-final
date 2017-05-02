// Javascript for the Final Project first page
// Developed from the lookAt THREE.js example here:
// https://threejs.org/examples/#misc_lookat
// Made with icons off Freepik from www.flaticon.com

var camera, scene, renderer;
var mesh, material, screens, pointer;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var	container = document.getElementById('container');

document.addEventListener('mousemove', onDocumentMouseMove, false);

function init() {
  // Create scene and camera:
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 12000);
	camera.position.z = 2500;

  // Create the point to be followed:
	pointer = new THREE.Mesh(new THREE.SphereGeometry(0.0001, 20, 20), new THREE.MeshNormalMaterial());
	scene.add(pointer);

  // Create screen planes:
	var screens = new THREE.PlaneGeometry(350, 350, 4, 4);
  var texLoader = new THREE.TextureLoader();
  texLoader.load('images/icons/' + Math.floor(Math.random() * 29) + '.png', function(texture) {
    material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
	  for (var i = 0; i < 6; i++) {
      for (var j = 0; j < 5; j++) {
  			var mesh = new THREE.Mesh(screens, material);
  			mesh.position.x = i * 400 - 1000;
  			mesh.position.y = j * 400 - 800;
  			scene.add(mesh);
      }
    }
  });

  // Create renderer:
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setClearColor(0x333333);
	renderer.setSize(window.innerWidth, window.innerHeight);
	container.appendChild(renderer.domElement);
}

function animate() {
	requestAnimationFrame(animate);
	render();
}

// Update pointer based on mouse position, then face screens.
function render() {
	pointer.position.x = mouseX;
	pointer.position.y = -mouseY;
	pointer.position.z = 1000;
	for (var i = 1, l = scene.children.length; i < l; i++) {
		scene.children[i].lookAt(pointer.position);
	}
  renderer.render(scene, camera);
}

function onWindowResize() {
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseMove(event) {
	mouseX = (event.clientX - windowHalfX) * 2;
	mouseY = (event.clientY - windowHalfY) * 2;
}

init();
animate();

window.addEventListener('resize', onWindowResize, false);
