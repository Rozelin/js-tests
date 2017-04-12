
var tableEditorModule = (function() {
  const table           = document.getElementById("tableBody");
  const addRowBtn       = document.getElementById("addRow");
  const addRowForm      = document.getElementById("addRowForm");
  const clearTableBtn   = document.getElementById("clearTable");
  const exportTableBtn  = document.getElementById("exportData");
  const exportTableForm = document.getElementById("exportTableForm");
  const demoDataBtn     = document.getElementById("demoData");
  const delRowsBtn      = document.getElementById("delRow");
  const importDataBtn   = document.getElementById("importDataBtn");
  const importDataArea  = document.getElementById("textArea");
  const exportDataBtn   = document.getElementById('exportDataBtn');
  const sortIdBtn       = document.getElementById('sortId');
  const sortNameBtn     = document.getElementById('sortName');
  const sortQtyBtn      = document.getElementById('sortQty');
  const sortAvailBtn    = document.getElementById('sortAvail');
  const filterNameInp   = document.getElementById('filterName');
  const initStr         = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const strLength       = initStr.length;

  let tableData         = [{"id":1,"name":"dfj3RnZGcI","qty":951,"avail":"yes"},{"id":2,"name":"VyoHrnaa","qty":165,"avail":"yes"},{"id":3,"name":"Xlb","qty":78,"avail":"no"},{"id":4,"name":"RQ9hJ","qty":686,"avail":"no"},{"id":5,"name":"oM0mlnsj","qty":660,"avail":"yes"},{"id":6,"name":"KBZc","qty":62,"avail":"no"},{"id":7,"name":"TQpq0cG","qty":142,"avail":"yes"},{"id":8,"name":"NO48Wp4","qty":314,"avail":"no"},{"id":9,"name":"odE1AC","qty":305,"avail":"yes"},{"id":10,"name":"o9z2iNDM","qty":891,"avail":"no"},{"id":11,"name":"0S9undefinedP3V","qty":810,"avail":"yes"},{"id":12,"name":"9gC0B5iWa","qty":741,"avail":"no"},{"id":13,"name":"ptfylSw","qty":213,"avail":"yes"},{"id":14,"name":"Ym7GL4","qty":532,"avail":"no"},{"id":15,"name":"cYjFXiWra","qty":720,"avail":"yes"},{"id":16,"name":"7MtvF435ay","qty":330,"avail":"yes"},{"id":17,"name":"zLd8UAT","qty":113,"avail":"no"},{"id":18,"name":"uUWT2","qty":42,"avail":"yes"},{"id":19,"name":"s6f3okg","qty":202,"avail":"yes"},{"id":20,"name":"9WFrp5","qty":333,"avail":"no"},{"id":21,"name":"YAlE","qty":216,"avail":"yes"},{"id":22,"name":"HuZs2SAAV","qty":386,"avail":"yes"},{"id":23,"name":"fO8J","qty":573,"avail":"yes"},{"id":24,"name":"V6s","qty":30,"avail":"yes"},{"id":25,"name":"wundefinedqlAx","qty":918,"avail":"no"},{"id":26,"name":"39QpLqzgsQ","qty":386,"avail":"yes"},{"id":27,"name":"vPG1h1M","qty":746,"avail":"yes"},{"id":28,"name":"xK6SGJjdcQ","qty":576,"avail":"no"},{"id":29,"name":"JkeIn9T3","qty":794,"avail":"yes"},{"id":30,"name":"U5NnGBUBq8","qty":793,"avail":"yes"}];

  function drawTable(arr) {
    arr = arr || tableData;
    let newTableBody = arr.map(function(row) {
      return `
        <tr>
          <th scope="row">${row.id}</th>
          <td>${row.name}</td>
          <td>${row.qty}</td>
          <td>${row.avail}</td>
          <td><input type="checkbox"></td>
        </tr>`}).join('');

    table.innerHTML = newTableBody;
};

  function addNewRow() {
    addRowBtn.addEventListener("click", function() {
      addRowForm.classList.toggle("hidden");
    });

    addRowForm.addEventListener("submit", function(e) {
      e.preventDefault();
      let availability = (addRowForm.pAvailability.checked) ? "Yes" : "No";
      let newDataSet = {
        "id"    : tableData.length + 1,
        "name"  : addRowForm.pName.value,
        "qty"   : addRowForm.pQty.value,
        "avail" : availability
      };

      tableData.push(newDataSet);
      addRowForm.querySelectorAll("input, select").forEach( (input) => input.value = "" );
      drawTable();
    });
  };

  function clearTable() {
    clearTableBtn.addEventListener("click", function() {
      tableData = [];
      drawTable();
    });
  };

  function recountIds() {
    tableData.map(function(item, i) {
      item.id = i + 1;
    });
  };

  function delRows() {
    delRowsBtn.addEventListener("click", function(e) {
      e.preventDefault();
      let checkedRows = table.querySelectorAll("input[type=checkbox]:checked");
      checkedRows.forEach(function (checkedRow, i) {
        tableData.splice(i, 1);
      });
      recountIds();
      drawTable();
    });
  };

  function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandString() {
    let finalStr = "";
    for (let i = 0, len = getRandom(3, 10); i < len; i++) {
      let randLetter = getRandom(0, strLength);
      finalStr += initStr[randLetter];
    };
    return finalStr;
  };

  function addDemoData() {
    demoDataBtn.addEventListener("click", function(e) {
      e.preventDefault();
      let randomeRowsNum = getRandom(1, 10);

      for (let i = 0; i < randomeRowsNum; i++) {
        let randomAvail   = (getRandom(0, 1)) ? "yes" : "no";
        let randomQty     = getRandom(0, 1000);
        let randomName    = getRandString();
        let newDataSet = {
          "id"    : tableData.length + 1,
          "name"  : randomName,
          "qty"   : randomQty,
          "avail" : randomAvail
        };
        tableData.push(newDataSet);
      };
      drawTable();
    });
  };

  function exportTableData() {
    exportTableBtn.addEventListener("click", function() {
      exportTableForm.classList.toggle("hidden");
    });
  };

  function importData() {
    importDataBtn.addEventListener("click", function(e) {
      e.preventDefault();
      importDataArea.value = JSON.stringify(tableData);
    });
  };

  function exportData() {
    exportDataBtn.addEventListener("click", function(e) {
      e.preventDefault();
      tableData = JSON.parse(importDataArea.value);
      recountIds();
      drawTable();
    });
  };

  let currentSortedColumn = "";

  function sortColumn(column, button) {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      if(currentSortedColumn === column) {
        tableData.reverse();
      } else {
        tableData.sort((a,b) => a[column] > b[column] ? -1 : 1 );
        currentSortedColumn = column;
      }
    drawTable();
    });
  };

  function filterName() {
    filterNameInp.addEventListener("keyup", function() {
      let searchInp = this.value;
      let filteredArr = tableData.filter(data => data.name.toLowerCase().includes(searchInp));
      drawTable(filteredArr);
    });
    filterNameInp.addEventListener("focusout", function() {
      this.value = "";
      drawTable();
    });
  };

  function init() {
    drawTable();
    addNewRow();
    exportTableData();
    clearTable();
    delRows();
    addDemoData();
    importData();
    exportData();
    sortColumn('id', sortIdBtn);
    sortColumn('name', sortNameBtn);
    sortColumn('qty', sortQtyBtn);
    sortColumn('avail', sortAvailBtn);
    filterName();
  };
  return {
    init: init
    }
}());


tableEditorModule.init();
