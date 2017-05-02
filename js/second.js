// Javascript for the Final Project second page
// Credit to Emil Persson (aka Humus) for the skyboxes:
// http://www.humus.name

var myCamera, scene, renderer, controls;
var boxGeometry, material, mesh;

var container = document.getElementById('container');

function init() {
  scene = new THREE.Scene();

  var width = window.innerWidth;
  var height = window.innerHeight;

  // Skybox
  var path = "images/hotel/";
  var format = ".jpg";
  var urls = [
    path + 'pos-x' + format, path + 'neg-x' + format,
    path + 'pos-y' + format, path + 'neg-y' + format,
    path + 'pos-z' + format, path + 'neg-z' + format
  ];

  var skybox = new THREE.CubeTextureLoader().load(urls);
  skybox.format = THREE.RGBFormat;

  // skybox rendering
  var shader = THREE.ShaderLib["cube"];
  shader.uniforms["tCube"].value = skybox;
  var material = new THREE.ShaderMaterial({
    fragmentShader: shader.fragmentShader,
    vertexShader: shader.vertexShader,
    uniforms: shader.uniforms,
    depthWrite: false,
    side: THREE.DoubleSide
  });
  var geometry = new THREE.BoxGeometry(2000, 2000, 2000);
  var mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // Camera
  myCamera = new THREE.PerspectiveCamera(45, width/height, 0.1, 25000);
  myCamera.position.set(-200, 0, 500);
  scene.add(myCamera);

  // Mountain
  var textureLoader = new THREE.TextureLoader();
  var p = "images/buddha/";
  var f = ".jpg";

  var t0 = textureLoader.load(p + 'pos-x' + f);
  var t1 = textureLoader.load(p + 'neg-x' + f);
  var t2 = textureLoader.load(p + 'pos-y' + f);
  var t3 = textureLoader.load(p + 'neg-y' + f);
  var t4 = textureLoader.load(p + 'pos-z' + f);
  var t5 = textureLoader.load(p + 'neg-z' + f);

  var materials = [
    new THREE.MeshBasicMaterial({ map: t0 }),
    new THREE.MeshBasicMaterial({ map: t1 }),
    new THREE.MeshBasicMaterial({ map: t2 }),
    new THREE.MeshBasicMaterial({ map: t3 }),
    new THREE.MeshBasicMaterial({ map: t4 }),
    new THREE.MeshBasicMaterial({ map: t5 })
  ];
  var faceMaterial = new THREE.MultiMaterial(materials);

  var material = new THREE.ShaderMaterial({
    fragmentShader: shader.fragmentShader,
    vertexShader: shader.vertexShader,
    uniforms: shader.uniforms,
    depthWrite: false,
    side: THREE.DoubleSide
  });

  var geometry = new THREE.BoxGeometry(500, 500, 500);
  var mountain = new THREE.Mesh(geometry, faceMaterial);
  scene.add(mountain);

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

  renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;
  controls = new THREE.OrbitControls(myCamera, renderer.domElement);

  // Write to the Container element:
  container.appendChild(renderer.domElement);
}

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, myCamera);
  controls.update();
}

function onWindowResize() {
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

init();
animate();

window.addEventListener('resize', onWindowResize);


// document.addEventListener('click', function(){ onClick() });
//
// function onClick() {
//   // boxGeometry falloff
// }
