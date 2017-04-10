/* http://codepen.io/ElenRoze/pen/RpXMmJ */

var prodListModule = (function() {
  const addProdForm = document.getElementById('add-product-form');
  const prodTable   = document.getElementById('products-list');

  function init() {
    addProdForm.addEventListener('submit', function(e) {
      e.preventDefault();
      let inStock = (addProdForm.pAvailability.checked) ? 'In stock' : 'Out of stock';
      let rowString = `
        <tr>
          <th scope="row">${addProdForm.pSKU.value}</th>
          <td>${addProdForm.pTitle.value}</td>
          <td>${(+addProdForm.pPrice.value).toFixed(2)}$</td>
          <td>${addProdForm.pDesc.value}</td>
          <td>${inStock}</td>
          <td><button class="remove">&#10008;</button></td>
        </tr>`;

      prodTable.insertAdjacentHTML('beforeend', rowString);
      addProdForm.querySelectorAll('input, textarea').forEach( (input) => input.value = '' );
    });
  };

  function removeRow() {
    prodTable.addEventListener('click', function(e) {
      if (e.target.classList.value == 'remove') {
        prodTable.removeChild(e.target.parentElement.parentElement);
      };
    });
  };

  return {
    init: function() {
      init();
    },
    close: function() {
      removeRow();
    }
  }
}());

prodListModule.init();
prodListModule.close();
