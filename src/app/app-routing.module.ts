import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormBuilderComponent } from './form-builder/form-builder.component';
import { TableComponent } from './table/table.component';
import { SmartTableComponent } from './smart-table/smart-table.component';

const routes: Routes = [
  { path: 'form', component: FormBuilderComponent },
  { path: 'table', component: TableComponent },
  { path: 'smart_table', component: SmartTableComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule {}
