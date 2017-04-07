'use strict';

function Gallery(id, options){
  var that = this;
  var element = document.getElementById(id);
  var cards = element.children.length; // Number of pics
  var cardWidth = options.cardWidth || element.children[0].offsetWidth; // Width of first pic
  var angle = 360 / cards; // Angle of one pic
  var radius = Math.round(( cardWidth / 2 ) / Math.tan( Math.PI / cards )); // radius of gallery
  var currentAngle = 0; // current rotation angle
  var isRotating = false;
  function get(elem){
    return document.querySelector(elem);
  };

  that.galleryResize = function() {
    cards = element.children.length;
    angle = 360 / cards;
    radius = Math.round(( cardWidth / 2 ) / Math.tan( Math.PI / cards ));
    element.style.transform = "translateZ(-" + radius + "px) rotateY(" + currentAngle + "deg)";
    var figures = element.children;
    [].forEach.call(figures, function(figure, i, arr) {
    figure.style.transform = "rotateY( " + i * angle + "deg ) translateZ( "+ radius + "px )";
  });

 };

  that.galleryRotate = function(){
     if (isRotating) {
        var autoRotate = setInterval(function() {
          currentAngle -= angle;
          var transform = "translateZ(-" + radius + "px) rotateY(" + currentAngle + "deg)";
          element.style.transform = transform;
        }, 1000);
     } else {
       clearInterval(autoRotate);
       console.log('cleared');
     }
  };


 this.prev = function(elemPrev){
   get(elemPrev).addEventListener('click', function(){
      currentAngle += angle;
      var transform = "translateZ(-" + radius + "px) rotateY(" + currentAngle + "deg)";
      element.style.transform = transform;
  }, true);
 };

this.next = function(elemNext){
  get(elemNext).addEventListener('click', function(){
    currentAngle -= angle;
    var transform = "translateZ(-" + radius + "px) rotateY(" + currentAngle + "deg)";
    element.style.transform = transform;
  }, true);
};

  this.addpic = function(elemAdd){
    get(elemAdd).addEventListener('click', function (){
    element.insertAdjacentHTML("afterBegin","<figure><img src='http://lorempixel.com/200/150/city' alt='' /></figure>");
    that.galleryResize();
    }, true);
  };

  this.removepic = function(elemRemove){
    get(elemRemove).addEventListener('click', function(){
    element.removeChild(document.querySelector('figure'));
    that.galleryResize();
    }, true);
  };
  this.autoplay = function(elemAuto){
    get(elemAuto).addEventListener('click', function(){
       isRotating = true;
       that.galleryRotate();
    });
  };
  this.stopauto = function(stopAuto){
    get(stopAuto).addEventListener('click', function(){
      isRotating = false;
      that.galleryRotate();
    });
  };

//   this.autoplay = function(elemAuto){
//     get(elemAuto).addEventListener('click', function(){
//       for (let i = 0; i < cards; i++) {
//           setTimeout(function (){
//              console.log(i);
//               var thisAngle = angle * i;
//               element.style.transform = "translateZ(-" + radius + "px) rotateY(" + thisAngle + "deg)";
//            }, i * 1500);

//         }
//       }, true);
//   };
  // this.stopauto = function(stopAuto){
  //   get(stopAuto).addEventListener('click', function(){
  //     clearTimeout(autoplay);
  //   });
  // };

this.galleryResize();
};

// Инициализация плагина в  элементе
// и вызов методов плагина на отдельных элементах управления
var myGallery = new Gallery('carousel', {});
myGallery.next('.next');
myGallery.prev('.prev');
myGallery.addpic('#addPic');
myGallery.removepic('#removePic');
myGallery.autoplay('#autoplay');
myGallery.stopauto('#stopauto');
