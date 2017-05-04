// Javascript for the Final Project Hub page

var myCanvas = document.getElementById('glitch');
var context = myCanvas.getContext('2d');
var width = myCanvas.width;
var height = myCanvas.height;
var protestCanvas = document.getElementById('full-coverage');
var internetCanvas = document.getElementById('internet');
var realityCanvas = document.getElementById('reality');
var container = document.getElementById('container');

var full = new Image();
full.src = 'images/full-coverage.png';
var net = new Image();
net.src = 'images/internet.png';
var real = new Image();
real.src = 'images/reality.png';

function drawFull() {
  context.drawImage(full, 0, 0); // Image, x, y
  console.log('full');

}

function drawNet() {
  context.drawImage(net, 0, 0); // Image, x, y
    console.log('net');

}

function drawReal() {
  context.drawImage(real, 0, 0); // Image, x, y
  console.log('real');
}

function drawAll() {
  drawFull();
  drawNet();
  drawReal();
}

window.addEventListener('load', drawAll);

// tile1.addEventListener('click', function(){ tileClick(tile1) });
// tile2.addEventListener('click', function(){ tileClick(tile2) });
// tile3.addEventListener('click', function(){ tileClick(tile3) });

// function tileClick(tile) {
//   tile.style.zIndex = z;
//   z++; // Always put the clicked tile on top.
// }
