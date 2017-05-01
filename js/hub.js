// Javascript for the Final Project Hub page

var container = document.getElementById('container');
var tile1 = document.getElementById('tile1');
var tile2 = document.getElementById('tile2');
var tile3 = document.getElementById('tile3');
var tiles = document.getElementsByClassName("tile");
var z = 3;

// Note that the function call must be passed
tile1.addEventListener('click', function(){ tileClick(tile1) });
tile2.addEventListener('click', function(){ tileClick(tile2) });
tile3.addEventListener('click', function(){ tileClick(tile3) });

function tileClick(tile) {
  tile.style.zIndex = z;
  z++; // Always put the clicked tile on top.
}
