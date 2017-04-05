/* http://codepen.io/ElenRoze/pen/YpJwam  */

'use strict';
//скрипт меняет значение переменных в директории :root
//через inputs, которым присвоено имя, к-рое соответствует названию переменной.
var inputs = document.querySelectorAll('form input');

function changeSettings(){
  const suffix = this.dataset.unit || '';
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
};

inputs.forEach(input => input.addEventListener('change', changeSettings));
inputs.forEach(input => input.addEventListener('mousemove', changeSettings));
