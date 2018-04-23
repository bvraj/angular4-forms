import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {
  public radioData: any[];
  public checkData: any[];
  public textAreaData: any[];
  public selectData: any[];
  public formData: any[];
  radio = { fieldName: '', radios: [{ name: 'Option1' }], isRequired: false };
  cbox = { fieldName: '', cboxes: [{ name: 'Check Box1' }], isRequired: false };
  select = { fieldName: '', placeholder: '', selects: [{ name: 'Select1' }], isRequired: false };
  user = {};
  textArea = {};
  public datas: any[];
  showFieldValues: boolean;
  fieldname: string;
  placeholder: string;
  type: string;
  required: boolean;
  public Number: number;
  public msg: string;
  public showField: boolean;
  public selectedNav: string;
  public selectedOption: string;
  constructor(public snackBar: MatSnackBar, public http: HttpClient) {
    this.showField = false;
    this.selectedNav = 'select value';
    this.selectedOption = '';
    this.msg = '';
    this.Number = 0;
    this.showFieldValues = false;
    this.datas = [];
    this.radioData = [];
    this.checkData = [];
    this.textAreaData = [];
    this.selectData = [];
  }
  ngOnInit() {
    // this.http.get('http://10.40.230.53:8001/list').subscribe(data => {
    //   console.log(data);
    // });
    // const req = this.http.post('http://10.40.230.53:8001/form', {
    //   firstName: 'kittu',
    //   lastName: 'raj'
    // })
    //   .subscribe(
    //   res => {
    //     console.log(res);
    //   },
    //   err => {
    //     console.log('Error occured');
    //   }
    //   );
  }
  changeShowStatus() {
    this.showField = true;
  }
  // tslint:disable-next-line:member-ordering
  navs = ['Input Box', 'Radio Button', 'Check Box', 'Text Area', 'Select Box'];
  setNav(nav: any) {
    this.selectedNav = nav;
    if (this.selectedNav === 'Input Box') {
      this.selectedOption = 'Input Box';
    } else if (this.selectedNav === 'Radio Button') {
      this.selectedOption = 'Radio Button';
    } else if (this.selectedNav === 'Check Box') {
      this.selectedOption = 'Check Box';
    } else if (this.selectedNav === 'Text Area') {
      this.selectedOption = 'Text Area';
    } else if (this.selectedNav === 'Select Box') {
      this.selectedOption = 'Select Box';
    }
  }
  onEditInput(value: string): void {
    this.textValue = '';
  }
  // tslint:disable-next-line:member-ordering
  textValue = 'change label name';
  // tslint:disable-next-line:member-ordering
  log = '';

  onSaveInput(value: string): void {
    this.log += `Text changed to '${value}'\n`;
  }
  onDeleteElement() {
    console.log('Delete clicked');
  }
  addOneMoreRadio() {
    this.radio.radios.push({ name: 'Option' + (Number(this.radio.radios.length) + 1) });
    console.log(this.radio.radios);
  }
  addOneMoreCheckbox() {
    this.cbox.cboxes.push({ name: 'Check Box' + (Number(this.cbox.cboxes.length) + 1) });
  }
  addOneMoreOption() {
    this.select.selects.push({ name: 'Select' + (Number(this.select.selects.length) + 1) });
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  addToForm(fieldObj) {
    // console.log(fieldObj);
    this.datas.push(fieldObj);
    this.user = {};
    this.snackBar.open('Input Box Added', '', { duration: 500 });
  }
  radioAddToForm(obj) {
    this.radioData.push(obj);
    this.snackBar.open('Radio Button Added', '', { duration: 500 });
  }
  checkAddToForm(obj) {
    this.checkData.push(obj);
    this.snackBar.open('Check Box Added', '', { duration: 500 });
  }
  textAreaAddToForm(tObj) {
    this.textAreaData.push(tObj);
    this.textArea = {};
    this.snackBar.open('TextArea Added', '', { duration: 500 });
  }
  selectAddToForm(sObj) {
    this.selectData.push(sObj);
    this.snackBar.open('Select Box Added', '', { duration: 500 });
  }
  // tslint:disable-next-line:member-ordering
  types = [
    { id: 1, name: 'Text' },
    { id: 2, name: 'Number' },
  ];

  typeDropDown(id: number): void {
    const NAME = this.types.find((item: any) => item.id === +id).name;
    this.type = `${NAME}`;
  }
  // let list = ['one', 'tow', 'three'];
  // let arr = [];
  // for (let i = 0; i < list.length; i++) {
  //   let value = {
  //     id: i,
  //     name: list[i]
  //   };
  //   arr.push(value);
  // }
  // console.log(arr);

  onFormSubmit() {
    this.formData = [];

    // console.log({
    //   input: this.datas, radio: this.radioData, checkbox: this.checkData, select: this.selectData,
    //   textarea: this.textAreaData
    // });
    let tData = `${this.datas}` + `${this.radioData}`;
    this.formData.push(tData);
    console.log(FormData);
  }


  changeListener(files: FileList) {
    console.log(files);
    if (files && files.length > 0) {
      let file: File = files.item(0);
      // console.log(file.name);
      // console.log(file.size);
      // console.log(file.type);
      let reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        let csv: string = reader.result;
        console.log(csv);
        var one = JSON.parse(this.csvJSON(csv))[0]['0'].split(',');
        var two = JSON.parse(this.csvJSON(csv))[1]['1'].split(',');
        var firstTwo = {};
        one.forEach(function (item, i) {
          firstTwo[item] = two[i];
        });
        // console.log(JSON.stringify(firstTwo));
        var three = JSON.parse(this.csvJSON(csv))[2]['2'].split(',');
        var secondTwo = {};
        one.forEach(function (item, i) {
          secondTwo[item] = three[i];
        });
        // console.log(JSON.stringify(secondTwo));
      };
    }
  }
  csvJSON(csv) {
    var lines = csv.split("\n");
    var result = [];
    var headers;
    for (var i = 0; i < lines.length; i++) {
      headers = lines[i].split("\n");
    }
    var cont = 0;
    for (var i = 0; i < lines.length; i++) {

      var obj = {};
      var currentline = lines[i].split("\n");
      for (var j = 0; j < headers.length; j++) {
        obj[cont] = currentline[j];
      }
      cont++;
      result.push(obj);
    }

    return JSON.stringify(result); //JSON
  }



}
