
/* http://codepen.io/ElenRoze/pen/VPPgMY */
function setText(){
  document.querySelector('.fix').style.height = document.querySelector('.red').clientHeight + 'px';
  document.querySelector('.red').style.top = document.querySelector('.fix').offsetTop + 'px';
};
window.addEventListener('load', setText);
window.addEventListener('resize', setText);
