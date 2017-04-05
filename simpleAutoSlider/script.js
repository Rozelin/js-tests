/* http://codepen.io/ElenRoze/pen/ryjVNav */

(function(){
  var length = $('.slide').length;
  var ind = 0;
  function slide(){
    if (ind == length) {
      ind = 0;
    }
    $('.slide').fadeOut('slow');
    $('.slide').eq(ind).fadeIn('slow');
    ind++;
  };
  slide();
  setInterval(slide, 3000);
})();
