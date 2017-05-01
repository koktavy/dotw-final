// Javascript for the Final Project Hub page

var container = document.getElementById('container');
var tile1 = document.getElementById('tile1');
var tile2 = document.getElementById('tile2');
var tile3 = document.getElementById('tile3');
var tiles = document.getElementsByClassName("tile");
var z = 3;

// Note that the function call must be passed
tile1.addEventListener('click', function(){ tileClick(tile1) }, false);
tile2.addEventListener('click', function(){ tileClick(tile2) }, false);
tile3.addEventListener('click', function(){ tileClick(tile3) }, false);

function tileClick(tile) {
  // If the tile is 'clicked,' go to that page.
  if (hasClass(tile, 'clicked')) {
    if (tile == tile1) {
      window.location.assign('first.html');
    }
    if (tile === tile2) {
      window.location.assign('second.html');
    }
    if (tile === tile3) {
      window.location.assign('third.html');
    }
  }
  else {
    // Remove 'clicked' status from all tiles.
    for (var i = 0; i < tiles.length; i++) {
      removeClass(tiles[i], 'clicked');
    }
    // 'Click' this tile and put it on top.
    addClass(tile, 'clicked');
    tile.style.zIndex = z;
    z++;
  }
}



// Raw Javascript add/remove class functions.
// MUCH easier with jQuery.
// Thanks to:
//https://jaketrent.com/post/addremove-classes-raw-javascript/
function hasClass(el, className) {
  if (el.classList)
    return el.classList.contains(className)
  else
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

function addClass(el, className) {
  if (el.classList)
    el.classList.add(className)
  else if (!hasClass(el, className)) el.className += " " + className
}

function removeClass(el, className) {
  if (el.classList)
    el.classList.remove(className)
  else if (hasClass(el, className)) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    el.className=el.className.replace(reg, ' ')
  }
}
