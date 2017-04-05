/* http://codepen.io/ElenRoze/pen/jBJJvB */

var TextCounter = {
    init: function() {
        this.textArea = document.querySelector('#js-message');
        this.maxChar = +this.textArea.getAttribute('maxlength') || 140;
        this.textAreaTotal = document.querySelector('#js-message-left-total');
        this.textAreaLeft = document.querySelector('#js-message-left-symbols');
        this.textAreaLeft.textContent = this.maxChar;
        this.events();
    },

    events: function() {
      this.textArea.addEventListener('keydown', function(e){
        if(this.value.length > TextCounter.maxChar) {
          this.value = this.value.slice(0, -1);
        }
        TextCounter.textAreaTotal.textContent = this.value.length;
        TextCounter.textAreaLeft.textContent = TextCounter.maxChar - this.value.length;
        }
    )}
};
