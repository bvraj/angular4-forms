import { Component, OnInit, ViewChild } from '@angular/core';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  showRow: boolean;
  showColumn: boolean;
  rowData: any;
  tableData: any[];
  column = '';
  fieldArray: Array<any> = [];
  newAttribute: any = [];
  editRowId: any;
  constructor() {
    this.showColumn = false;
    this.tableData = [];
    this.showRow = false;
  }

  tableContent = {
    tableHeader: ['name', 'number', 'id'],
    tableRows: [{}]
  };
  table = [];

  ngOnInit() {
  }
  addNewColumn() {
    this.showColumn = true;
  }
  addToTable(tObj) {
    console.log(tObj);

    this.tableData.push(tObj);
    let headerObj = {};
    if (this.table.length > 0) {
      headerObj = this.table[0];
    }
    headerObj[tObj] = tObj;
    this.table.splice(0, 1, headerObj);
    console.log(this.table);


    // console.log(this.tableData);
    this.column = '';
  }

  addNewRow() {
    this.fieldArray.push(this.newAttribute);
    this.newAttribute = {};
  }

  deleteRow(index) {
    this.fieldArray.splice(index, 1);
  }


}

