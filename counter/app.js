var counterModule = (function(){
  'use strict';

  var events = function(elem){
    const wrapper   = document.querySelector(elem);
    const symbTotal = wrapper.querySelector('.js-message-left-total');
    const symbLeft  = wrapper.querySelector('.js-message-left-symbols');
    const errText   = wrapper.querySelector('.errorHandler');
    const msgBlock  = wrapper.querySelector('.js-message');
    let maxLength   = +msgBlock.getAttribute('maxlength') || 140;
    let message     = '';

    symbLeft.textContent = maxLength;

    wrapper.addEventListener('keyup', function(e){
      let messageLength = msgBlock.value.length;

      if(messageLength >= maxLength) {
        msgBlock.value = msgBlock.value.slice(0, maxLength);
        errText.textContent = 'Length shall not be longer than ' + maxLength;
        throw new Error('Longer than ' + maxLength);
      } else {
        errText.textContent = '';
      }
      symbTotal.textContent = (messageLength >= maxLength) ? maxLength : messageLength;
      symbLeft.textContent  = (maxLength - messageLength >= 0) ? maxLength - messageLength : 0;
    });
  };

  return {
    init: function(elem){
      events(elem);
    }
  }
}());

counterModule.init('#jsCounterWrapper');
