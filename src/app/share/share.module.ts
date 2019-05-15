import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginateComponent } from '../paginate/paginate.component';

@NgModule({
  declarations: [PaginateComponent],
  imports: [
    CommonModule
  ],
  exports: [PaginateComponent, CommonModule]
})
export class ShareModule { }
