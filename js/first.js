// Javascript for the Final Project first page

var camera, scene, renderer;
var mesh, geometry, sphere;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var	container = document.getElementById('container');

document.addEventListener('mousemove', onDocumentMouseMove, false);

function init() {
	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 12000);
	camera.position.z = 2500;
	sphere = new THREE.Mesh( new THREE.SphereGeometry(10, 20, 20), new THREE.MeshNormalMaterial() );
	scene.add( sphere );
	var geometry = new THREE.PlaneGeometry(100, 100, 4, 4);
	// geometry.rotateX( Math.PI / 2 );
	var material = new THREE.MeshNormalMaterial();

	for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 5; j++) {
			var mesh = new THREE.Mesh(geometry, material);
			mesh.position.x = i * 400 - 1000;
			mesh.position.y = j * 400 - 800;
			mesh.scale.x = mesh.scale.y = mesh.scale.z = 3;
			scene.add( mesh );
    }
	}

	scene.matrixAutoUpdate = false;
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setClearColor( 0xffffff );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.sortObjects = false;
	container.appendChild( renderer.domElement );
	//
	window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseMove(event) {
	mouseX = ( event.clientX - windowHalfX);
	mouseY = ( event.clientY - windowHalfY);
}

function animate() {
	requestAnimationFrame(animate);
	render();
}

function render() {
	sphere.position.x = mouseX;
	sphere.position.y = -mouseY;
	sphere.position.z = 1500;
	for (var i = 1, l = scene.children.length; i < l; i++) {
		scene.children[i].lookAt(sphere.position);
	}
  renderer.render(scene, camera);
}

init();
animate();
