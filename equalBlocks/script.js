/* http://codepen.io/ElenRoze/pen/NbaEjo?editors=1010 */

//ф-я, к-рая устанавливает всем блокам высоту наибольшего блока в массиве
$(window).on('load', function(){
  var arr = [];
  $('.card').each(function (i, elem) {
     arr.push($(elem).height());
  });
function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
};
  var maxH = getMaxOfArray(arr);
  $('.card').each(function (i, elem) {
    console.log(i, elem);
    $(elem).css('height', maxH + 'px');
  });
});
