var LoaderModule = (function() {
    'use strict';

    const loader        = document.getElementById('loader');
    const imgs          = document.querySelectorAll('img');
    const progressBar   = document.getElementById('loaderProgressBar');
    const loaderPercent = document.getElementById('loaderPercent');
    const imgsNumber    = imgs.length;
    let counter         = 0;
    let currentPercentage = 0;

    function runProgress(){
       progressBar.style.width   = currentPercentage + "%";
       loaderPercent.textContent = currentPercentage + "%";
   };

    function updPercentage() {
       currentPercentage = parseInt( counter / imgsNumber * 100 );
       if (currentPercentage === 100) {
         closeLoader();
       };
       runProgress();
    };

    function closeLoader(){
       loader.classList.add('hidden');
    };

    function countLoading() {
      imgs.forEach(function(img, i, arr){
         const src = img.src;
         const image = new Image();
         image.src = src;

         image.onload = function(){
           counter++;
           updPercentage();
         };

         image.onerror = function(){
           console.log('Image URL is invalid ' + image.src);
           counter++;
           updPercentage();
         };
      });
    };

     return {
        init: function() {
           countLoading();
           }
        }
     })();
