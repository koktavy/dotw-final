// Javascript for the Final Project Hub page

var container = document.getElementById('container');
var tile1 = document.getElementById('tile1');
var tile2 = document.getElementById('tile2');
var tile3 = document.getElementById('tile3');
var thisTile;

container.addEventListener('click', tileClick);

function tileClick() {
  tile1.setAttribute('transform', 'translateY(150px)');
  console.log("event");
}

// tileClick();
