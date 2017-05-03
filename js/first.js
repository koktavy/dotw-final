// Javascript for the Final Project first page
// Developed from the lookAt THREE.js example here:
// https://threejs.org/examples/#misc_lookat
// Made with icons off Freepik from www.flaticon.com

// Global variables:
var camera, scene, renderer;
var mesh, material, screens, pointer;
var mouseX = 0, mouseY = 0;
var width = window.innerWidth;
var height = window.innerHeight;
var	container = document.getElementById('container');

// Page listeners:
document.addEventListener('mousemove', onDocumentMouseMove, false);
window.addEventListener('resize', onWindowResize, false);

function init() {
  // Create scene and camera:
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(50, width/height, 1, 12000);
	camera.position.z = 2500;

  // Create the point to be followed:
	pointer = new THREE.Mesh(new THREE.SphereGeometry(0.0001, 20, 20), new THREE.MeshNormalMaterial());
	scene.add(pointer);

  // Create screen planes:
	var screens = new THREE.PlaneGeometry(350, 350, 4, 4);
  var texLoader = new THREE.TextureLoader();
  texLoader.load('images/icons/' + Math.floor(Math.random() * 29) + '.png', function(tex) {
    material = new THREE.MeshBasicMaterial({ map: tex, transparent: true });

    // Create the grid:
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
	renderer.setSize(width, height);
	container.appendChild(renderer.domElement);
} // End of init()

function animate() {
	requestAnimationFrame(animate);
	render();
}

// Update pointer based on mouse position, then face screens:
function render() {
	pointer.position.x = mouseX;
	pointer.position.y = -mouseY;
	pointer.position.z = 1000;
	for (var i = 1, l = scene.children.length; i < l; i++) {
		scene.children[i].lookAt(pointer.position);
	}
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

// Register new mouse location:
function onDocumentMouseMove(event) {
	mouseX = (event.clientX - width/2) * 2;
	mouseY = (event.clientY - height/2) * 2;
}

init();
animate();
