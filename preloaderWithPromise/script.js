/* http://codepen.io/ElenRoze/pen/gLXdwE */

'use strict';

var domLoaded = new Promise(function(res, reject) {
  document.addEventListener('DOMContentLoaded', res());
});

var imgsLoaded = new Promise(function(res, rejected){
  var imgNum = document.querySelectorAll('img').length;
  var counter = 0;
  document.querySelectorAll('img').forEach(function(img, i, arr){
    var src = img.src;
    var image = new Image();
    image.src = src;
    image.addEventListener("load", function() {
    counter = i + 1;
     if(counter == imgNum) { res();};
    }, false);
  });
});

var preloader = Promise.all([domLoaded, imgsLoaded])
  .then(function(){
    console.log('loaded');
    document.querySelector('.preloader').style.display = 'none';
    res();
  });
