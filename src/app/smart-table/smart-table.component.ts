import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'app-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.css']
})
export class SmartTableComponent implements OnInit {
  showColumn: boolean;
  data = [];
  columnName = '';
  source: LocalDataSource; // add a property to the component
  Object = Object;
  constructor() {
    this.source = new LocalDataSource(this.data); // create the source
  }

  ngOnInit() {
  }
  // tslint:disable-next-line:member-ordering
  settings = {
    columns: {
      // id: {
      //   title: 'ID',
      //   filter: false
      // },
      // name: {
      //   title: 'Full Name',
      //   filter: false
      // },
      // username: {
      //   title: 'User Name',
      //   filter: false
      // },
      // email: {
      //   title: 'Email',
      //   filter: false
      // }
    }
  };
  addNewColumn() {
    this.showColumn = true;
  }
  addColumn(value) {
    this.settings.columns[value.toLowerCase()] = {
      title: value.replace(/\b\w/g, function (l) { return l.toUpperCase(); }),
      filter: false
    };
    console.log(this.settings);
    this.settings = Object.assign({}, this.settings);
  }
  deleteColumn() {
  }
  onSearch(query: string = '') {
    this.source.setFilter([
      // fields we want to include in the search
      // {
      //   field: 'id',
      //   search: query
      // },
      // {
      //   field: 'name',
      //   search: query
      // },
      // {
      //   field: 'username',
      //   search: query
      // },
      // {
      //   field: 'email',
      //   search: query
      // }
    ], false);
    // second parameter specifying whether to perform 'AND' or 'OR' search
    // (meaning all columns should contain search query or at least one)
    // 'AND' by default, so changing to 'OR' by setting false here
  }
  changed(value, item, event) {
    value = value.trim().toLowerCase().replace(/ /g, '');
    // value is title and
    // item is key of the column obj
    console.log(value, item);
    if (value !== item) {
      const keys = Object.keys(this.settings.columns);
      const newObj = {};
      for (let j = 0; j < keys.length; j++) {
        if (keys[j] === item) {
          const key = value.replace(/ /g, '').toLowerCase();
          newObj[key] = {
            title: value,
            filter: false
          };
          // this.settings.columns[keys[j]].title = value;
        } else {
          const key = keys[j];
          newObj[key] = this.settings.columns[key];
        }
      }
      this.settings.columns = newObj;
      this.settings = Object.assign({}, this.settings);
      const allData = this.source.getAll() ? this.source.getAll()['__zone_symbol__value'] : false;
      if (allData && allData.length) {
        allData.map((row, i) => {
          if (row[item]) {
            row[value.replace(/ /g, '').toLowerCase()] = row[item];
            delete row[item];
          }
        });
        this.source = new LocalDataSource(allData);
        // this.source.refresh();
      }
      console.log(this.settings);
    }
  }
}
