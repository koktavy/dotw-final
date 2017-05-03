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

// Page listener:
window.addEventListener('resize', onWindowResize);

function init() {
  // Create scene and camera:
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(90, width/height, 1, 6000);
  // camera.position.set(-200, 0, 700);
  scene.add(camera);


  //NOTE: Add look controls here.
  //NOTE: NO CLICK


  // Skybox
  var textureLoader = new THREE.TextureLoader();
  textureLoader.load('images/studio.jpg', function(tex) {
    skyboxMaterial = new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide });
    skyboxGeometry = new THREE.SphereGeometry(1000, 50, 50);
    skyboxMesh = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
    scene.add(skyboxMesh);
  });

  //NOTE: Basic skybox interation:
  // var path = "images/hotel/"; //NOTE: Hotel is a placeholder
  // var format = ".jpg";
  // var urls = [
  //   path + 'pos-x' + format, path + 'neg-x' + format,
  //   path + 'pos-y' + format, path + 'neg-y' + format,
  //   path + 'pos-z' + format, path + 'neg-z' + format
  // ];
  //
  // var skybox = new THREE.CubeTextureLoader().load(urls);
  // skybox.format = THREE.RGBFormat;
  //
  // // Skybox rendering
  // var shader = THREE.ShaderLib["cube"];
  // shader.uniforms["tCube"].value = skybox;
  //
  // skyboxMaterial = new THREE.ShaderMaterial({
  //   fragmentShader: shader.fragmentShader,
  //   vertexShader: shader.vertexShader,
  //   uniforms: shader.uniforms,
  //   depthWrite: false,
  //   side: THREE.DoubleSide
  // });
  // skyboxGeometry = new THREE.BoxGeometry(3000, 3000, 3000);
  // skyboxMesh = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
  // scene.add(skyboxMesh);

  // NOTE: StackExchange Box Mountain Attempt
  // var textureLoader = new THREE.TextureLoader();
  // var p = "images/buddha/";
  // var f = ".jpg";
  //
  // var t0 = textureLoader.load(p + 'pos-x' + f);
  // var t1 = textureLoader.load(p + 'neg-x' + f);
  // var t2 = textureLoader.load(p + 'pos-y' + f);
  // var t3 = textureLoader.load(p + 'neg-y' + f);
  // var t4 = textureLoader.load(p + 'pos-z' + f);
  // var t5 = textureLoader.load(p + 'neg-z' + f);
  //
  // var materials = [
  //   new THREE.MeshBasicMaterial({ map: t0 }),
  //   new THREE.MeshBasicMaterial({ map: t1 }),
  //   new THREE.MeshBasicMaterial({ map: t2 }),
  //   new THREE.MeshBasicMaterial({ map: t3 }),
  //   new THREE.MeshBasicMaterial({ map: t4 }),
  //   new THREE.MeshBasicMaterial({ map: t5 })
  // ];
  // var faceMaterial = new THREE.MultiMaterial(materials);
  //
  // var material = new THREE.ShaderMaterial({
  //   fragmentShader: shader.fragmentShader,
  //   vertexShader: shader.vertexShader,
  //   uniforms: shader.uniforms,
  //   depthWrite: false,
  //   side: THREE.DoubleSide
  // });

  //NOTE: Sphere experiment
  // var material = new THREE.MeshBasicMaterial();
  // var textureLoader = new THREE.TextureLoader();
  // textureLoader.load('images/studio2.jpg', function(tex) {
  //   material = new THREE.MeshBasicMaterial({ map: tex });
  //   material.side = THREE.DoubleSide;
  //   var geometry  = new THREE.SphereGeometry(2000, 32, 32);
  //   var studio = new THREE.Mesh(geometry, material);
  //   studio.positionY = -200;
  //   scene.add(studio);
  // });


  //NOTE: Home Box Mountain attempt
  // var geometry = new THREE.BoxGeometry(500, 500, 500);
  // var mountain = new THREE.Mesh(geometry, faceMaterial);
  // scene.add(mountain);
  // textureLoader.load('images/wood.jpg', function(texture) {
  //   boxMaterial = new THREE.MeshLambertMaterial({map: texture, side: THREE.DoubleSide});
  //   boxGeometry = new THREE.BoxGeometry(300, 500, 25);
  //   box = new THREE.Mesh(boxGeometry, boxMaterial);
  //   box.rotation.x = Math.PI / -2;
  //   box.rotation.z = Math.PI / 2;
  //   box.position.y = -400;
  //   box.position.z = 400;
  //   box.receiveShadow = true;
  //   scene.add(box);
  // });

  // Create renderer:
  renderer = new THREE.WebGLRenderer({ antialias: true});
  renderer.setSize(width, height);
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  container.appendChild(renderer.domElement);
}

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
  controls.update();
}

// Update width and height, then adjust the camera and re-render:
function onWindowResize() {
	width = window.innerWidth;
	height = window.innerHeight;
	camera.aspect = width / height;
	camera.updateProjectionMatrix();
	renderer.setSize(width, height);
}

init();
animate();
