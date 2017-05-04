// Javascript for the Final Project first page
// Developed from the lookAt THREE.js example here:
// https://threejs.org/examples/#misc_lookat
// Made with icons off Freepik from www.flaticon.com

// Global variables:
var camera, scene, renderer;
var raycaster, mouse;
var icon, brand, screens, pointer;
var url = 'images/icons/';
var type = '.png';
var iconArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', 'noise'];
var mouseX = 0, mouseY = 0;
var width = window.innerWidth;
var height = window.innerHeight;
var	container = document.getElementById('container');

// Page listeners:
document.addEventListener('mousemove', onDocumentMouseMove, false);
document.addEventListener('click', onClick, false);
window.addEventListener('resize', onWindowResize, false);

function init() {
  // Create scene and camera:
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(50, width/height, 1, 12000);
	camera.position.z = 2500;

  // Create the point to be followed:
	pointer = new THREE.Mesh(new THREE.SphereGeometry(0.0001, 20, 20), new THREE.MeshNormalMaterial());
	scene.add(pointer);

  // Create the grid of screen planes:
  var texLoader = new THREE.TextureLoader();
  screens = new THREE.PlaneGeometry(350, 350, 4, 4)
  for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 5; j++) {
      var randIndex = THREE.Math.randInt(0, 28);
      var randTexture = texLoader.load(url + iconArray[randIndex] + type);
      brand = new THREE.MeshBasicMaterial({ map: randTexture, transparent: true });
      icon = new THREE.Mesh(screens, brand);
			icon.position.x = i * 400 - 1000;
			icon.position.y = j * 400 - 800;
			scene.add(icon);
    }
  };

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
	raycaster = new THREE.Raycaster();
	mouse = new THREE.Vector2();
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

function onClick(event){
	// event.preventDefault();
	mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
	raycaster.setFromCamera( mouse, camera );
  var intersects = raycaster.intersectObjects(scene.children);

  if (intersects.length > 0) {
    if (intersects[0].object.geometry.type === 'PlaneGeometry'){
      var texLoader = new THREE.TextureLoader();
      var texture = texLoader.load(url + 'off.png');
      material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
      intersects[0].object.material = material;
    }
  }
}

init();
animate();
