// Javascript for the Final Project Hub page
var myCanvas = document.getElementById('glitch');
var width = window.innerWidth;
var height = window.innerHeight;
var protestCanvas, internetCanvas, realityCanvas;
// var full = loadImage('images/full-coverage.png');
// var net = loadImage('images/internet.png');
// var real = loadImage('images/reality.png');
var full, net, real;
var count = 0;

function setup() {
  myCanvas = createCanvas(width, height);
  // protestCanvas = createCanvas(width, height);
  // protestCanvas.parent('#glitch');
  // internetCanvas = createCanvas(width, height);
  // internetCanvas.parent('#glitch');
  // realityCanvas = createCanvas(width, height);
  // realityCanvas.parent('#glitch');
  full = loadImage('images/full-coverage.png');
  net = loadImage('images/internet.png');
  real = loadImage('images/reality.png');
}

function draw() {
  select();
      push();
      blendMode(OVERLAY);
      image(full, 0, -100, full.width, full.height/1.2);
      pop();

      push();
      blendMode(OVERLAY);
      image(net, 100, -150, net.width, net.height/1.2);
      pop();

      push();
      blendMode(OVERLAY);
      image(real, 0, -200, real.width/2);
      pop();
}

function select() {
  if (count > 1) {
    push();
    blendMode(OVERLAY);
    image(full, 0, -100, full.width, full.height/1.2);
    pop();

    push();
    blendMode(OVERLAY);
    image(net, 100, -150, net.width, net.height/1.2);
    pop();

    push();
    blendMode(OVERLAY);
    image(real, 0, -200, real.width/2);
    pop();
  }
  if (count > 2) {
    push();
    blendMode(HARD_LIGHT);
    image(full, 0, -100, full.width, full.height/1.2);
    pop();

    push();
    blendMode(HARD_LIGHT);
    image(real, 0, -200, real.width/2);
    pop();
  }
  if (count > 3) {
    push();
    blendMode(SOFT_LIGHT);
    image(full, 0, -100, full.width, full.height/1.2);
    pop();
  }
  if (count > 4) {
    push();
    image(full, 0, -100, full.width, full.height/1.2);
    pop();
  }
}

function mouseClicked() {
  count++;
}

function windowResized() {
  width = window.innerWidth;
  height = window.innerHeight;
  resizeCanvas(width, height);
}
