/* http://codepen.io/ElenRoze/pen/RooGNx */

//=======================================
// With JQUERY => Write Less, Do more :)

//   var header = $("h2 strong");
//   $(".filters li").click(function(e){
//     e.preventDefault();
//     var items = $(".items li");
//     $(header).text($(this).text());
//     var filter = $(this).data('filter');
//     $(items).filter('.' + filter).removeClass('hidden');
//     $(items).not('.' + filter).addClass('hidden');
//   });

// =======================================
// Without JQUERY, with additional functions

// 'use strict';
//  function $(selector) {
//    return document.querySelector(selector);
//   }
//  function $$(selector) {
//    return document.querySelectorAll(selector);
//  }

// $$(".filters li").forEach(function(filter, i, arr){
//   filter.addEventListener('click', filterList, false);
// });

// function filterList(){
//   var items = $$(".items li");
//   $("h2 strong").innerHTML = this.innerHTML;
//   var filter = this.dataset.filter;
//   items.forEach(function(item, i, arr) {
//     (item.classList.contains(filter)) ?
//       item.classList.remove('hidden') :
//         item.classList.add('hidden');
//   });
// }

//=======================================
// Without JQUERY and without additinal functions

'use strict';
document.querySelectorAll(".filters li").forEach(function(filter, i, arr){
  filter.addEventListener('click', filterList, false);
});

function filterList(){
  document.querySelector("h2 strong").innerHTML = this.innerHTML;
  var items = document.querySelectorAll(".items li");
  var filter = this.dataset.filter;
  items.forEach(function(item, i, arr) {
    (item.classList.contains(filter)) ?
      item.classList.remove('hidden') :
        item.classList.add('hidden');
  });
};
