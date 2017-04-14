/* http://codepen.io/ElenRoze/pen/VbYzpb */

function TableEditorConstructor(params) {
  const self = this;
  function $(selector) {
    return document.querySelector(selector);
  };

  const table           = $(params.tableBody);
  const pagination      = $(params.pagination);
  const addRowBtn       = $(params.addRowBtn);
  const addRowForm      = $(params.addRowForm);
  const clearTableBtn   = $(params.clearTableBtn);
  const exportTableBtn  = $(params.exportTableBtn);
  const exportTableForm = $(params.exportTableForm);
  const demoDataBtn     = $(params.demoDataBtn);
  const delRowsBtn      = $(params.delRowsBtn);
  const importDataBtn   = $(params.importDataBtn);
  const importDataArea  = $(params.importDataArea);
  const exportDataBtn   = $(params.exportDataBtn);
  const sortIdBtn       = $(params.sortIdBtn);
  const sortNameBtn     = $(params.sortNameBtn);
  const sortQtyBtn      = $(params.sortQtyBtn);
  const sortAvailBtn    = $(params.sortAvailBtn);
  const filterNameInp   = $(params.filterNameInp);
  const initStr         = params.initStr || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const strLength       = initStr.length;
  const paginationLen   = params.paginationLen || 10;

  let tableData         = [];
  let selectedTable     = [];

  self.drawTable = function(arr, num = 0) {
    arr = arr || tableData.slice(num, paginationLen);

    let newTableBody = arr.map(function(row) {
      return `
        <tr>
          <th scope="row">${row.id}</th>
          <td>${row.name}</td>
          <td>${row.qty}</td>
          <td>${row.avail}</td>
          <td><input type="checkbox"></td>
        </tr>`}).join("");

    table.innerHTML = newTableBody;
    self.addPagination(tableData);
  };

  self.addPagination = function(arr) {
    let paginationList = "";
    let pageNum = Math.ceil(arr.length / paginationLen);
    for (var i = 0; i < pageNum; i++) {
      paginationList += `
        <li><a href="#${i+1}">${i+1}</a></li>
        `;
      }
      pagination.innerHTML = paginationList;
  };

  pagination.addEventListener("click", function(e) {
    if (e.target.tagName === "A") {
      e.preventDefault();
      let start = +e.target.href.split("#")[1] * paginationLen - paginationLen;
      let end   = +start + paginationLen
      selectedTable = tableData.slice(start, end);
      self.drawTable(selectedTable);
    }
  });

  self.addNewRow = function() {
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
        self.drawTable();
      });
  };

  self.clearTable = function() {
    clearTableBtn.addEventListener("click", function() {
      tableData = [];
      self.drawTable();
    });
  };

  function recountIds() {
    tableData.map(function(item, i) {
      item.id = i + 1;
    });
  };

  self.delRows = function() {
    delRowsBtn.addEventListener("click", function(e) {
      e.preventDefault();
      let tableRows = table.querySelectorAll("tr");
      let deleteRawsId = [];
      tableRows.forEach(function (tabelRow, i) {
        if (tabelRow.querySelector("input[type=checkbox]:checked")) {
          deleteRawsId.push(i + 1);
        }
      });
      for (var len = deleteRawsId.length-1, i = len; i >= 0; i--) {
        let index = deleteRawsId[i] -1 ;
        tableData.splice(index, 1);
      }
      recountIds();
      self.drawTable();
    });
  };

  function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  function getRandString() {
    let finalStr = "";
    for (let i = 0, len = getRandom(3, 10); i < len; i++) {
      let randLetter = getRandom(0, strLength);
      finalStr += initStr[randLetter];
    };
    return finalStr;
  };

  self.addRandomContent = function() {
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
    self.drawTable();
  };

  self.addDemoData = function() {
    demoDataBtn.addEventListener("click", function(e) {
      e.preventDefault();
      self.addRandomContent();
    });
  };

  self.exportTableData = function() {
    exportTableBtn.addEventListener("click", function(e) {
      e.preventDefault();
      exportTableForm.classList.toggle("hidden");
    });
  };

  self.importData = function() {
    importDataBtn.addEventListener("click", function(e) {
      e.preventDefault();
      importDataArea.value = JSON.stringify(tableData);
    });
  };

  self.exportData = function() {
    exportDataBtn.addEventListener("click", function(e) {
      e.preventDefault();
      tableData = JSON.parse(importDataArea.value);
      recountIds();
      self.drawTable();
    });
  };

  let currentSortedColumn = "";

  self.sortColumn = function(column, button) {
    button.addEventListener("click", function(e) {
      e.preventDefault();
      if(currentSortedColumn === column) {
        tableData.reverse();
      } else {
        tableData.sort((a,b) => a[column] > b[column] ? -1 : 1 );
        currentSortedColumn = column;
      }
    self.drawTable();
    });
  };

  self.filterName = function() {
    filterNameInp.addEventListener("keyup", function() {
      let searchInp = this.value;
      let filteredArr = tableData.filter(data => data.name.toLowerCase().includes(searchInp));
      self.drawTable(filteredArr);
    });
    filterNameInp.addEventListener("focusout", function() {
      this.value = "";
      self.drawTable(selectedTable);
    });
  };

  self.init = function() {
    self.addRandomContent();
    self.addNewRow();
    self.exportTableData();
    self.clearTable();
    self.delRows();
    self.addDemoData();
    self.importData();
    self.exportData();
    self.sortColumn("id", sortIdBtn);
    self.sortColumn("name", sortNameBtn);
    self.sortColumn("qty", sortQtyBtn);
    self.sortColumn("avail", sortAvailBtn);
    self.filterName();
  };
  return {
    init: self.init
    }
};

var myTable = new TableEditorConstructor({
  tableBody:       "#tableBody",
  pagination:      "#pagination",
  addRowBtn:       "#addRow",
  addRowForm:      "#addRowForm",
  clearTableBtn:   "#clearTable",
  exportTableBtn:  "#exportData",
  exportTableForm: "#exportTableForm",
  demoDataBtn:     "#demoData",
  delRowsBtn:      "#delRow",
  importDataBtn:   "#importDataBtn",
  importDataArea:  "#textArea",
  exportDataBtn:   "#exportDataBtn",
  sortIdBtn:       "#sortId",
  sortNameBtn:     "#sortName",
  sortQtyBtn:      "#sortQty",
  sortAvailBtn:    "#sortAvail",
  filterNameInp:   "#filterName"
});

myTable.init();
