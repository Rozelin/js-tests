/* http://codepen.io/ElenRoze/pen/peXVQr */

var clickerModule = (function(){
  const squares    = document.querySelectorAll('.js-square');
  const squaresNum = squares.length;

  squares.forEach(function(square, i){
    square.addEventListener('click', function(){
      var thisSquare = this;
      this.dataset.click = +this.dataset.click + 1;
      this.classList.add('blow');
      setTimeout(function(){
        thisSquare.classList.remove('blow');
      }, 500);
    });
  });

  function randomeClick(){
    const randomNum = Math.floor(Math.random() * squaresNum);
    const randomSquare = squares[randomNum];
    randomSquare.click();
  };

  function resetSquaresStyles() {
     squares.forEach(function(square, i){
        square.classList = '';
     });
  };

  function generate(genElem) {
    elem = document.querySelector(genElem);
    elem.addEventListener('click', function(e){
      e.preventDefault();
      resetSquaresStyles();
      for (var i = 0; i < 100; i++) {
        randomeClick();
      }
    });
  };

  function show(showElem) {
    elem = document.querySelector(showElem);
    elem.addEventListener('click', function(e){
      e.preventDefault();
      squares.forEach(function(square, i) {
        let clickNum = square.dataset.click;
        if (clickNum <= 25) {
          square.classList.add('color-grade-0');
        } else if (clickNum > 25 && clickNum <= 50 ) {
          square.classList.add('color-grade-1');
        } else if (clickNum > 50 && clickNum <= 75 ) {
          square.classList.add('color-grade-2');
        } else if (clickNum > 75 && clickNum <= 100 ) {
          square.classList.add('color-grade-3');
        } else if (clickNum > 100 ) {
          square.classList.add('color-grade-4');
        }
      });
    });
  }

  function reset(resetElem) {
    elem = document.querySelector(resetElem);
    elem.addEventListener('click', function(e){
      e.preventDefault();
      resetSquaresStyles();
      squares.forEach(function(square, i) {
        square.dataset.click = '0';
      });
    });
  }

  return {
    init: function(genBtn, showBtn, resetBtn){
      generate(genBtn);
      show(showBtn);
      reset(resetBtn);
    }
  };
}());
