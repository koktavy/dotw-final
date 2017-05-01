// Javascript for the Final Project Hub page

var container = document.getElementById('container');
var tile1 = document.getElementById('tile1');
var tile2 = document.getElementById('tile2');
var tile3 = document.getElementById('tile3');
// var thisTile;

// Note that the function call must be passed
container.addEventListener('click', function(){ pageClick() });
tile1.addEventListener('click', function(){ tileClick(tile1) });
tile2.addEventListener('click', function(){ tileClick(tile2) });
tile3.addEventListener('click', function(){ tileClick(tile3) });

function tileClick(tile) {
  // Credit to https://css-tricks.com/get-value-of-css-rotation-through-javascript/
  // for getting transform values and converting the rotation matrix.
  var styl = window.getComputedStyle(tile, null); // Parse element style.
  var matrx = styl.getPropertyValue("transform"); // Get transform values.
  var values = matrx.split('(')[1],
      values = values.split(')')[0], // Error-free matrix split.
      values = values.split(',');
  var a = values[0];
  var b = values[1];
  var c = values[2];
  var d = values[3]; // Matrix rotation values.
  var angle = Math.round(Math.atan2(b, a) * (180/Math.PI)); // Converts to degrees.
  //
  var tx = values[4];
  var ty = values[5];

  // Update these transform values to be randomized.
  tile.style.transform = 'translate('+ 100 +'px, 50px) rotateZ(-30deg) scale(1.1)';
}

function pageClick() {
  console.log('test');
}
