import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginateComponent } from '../paginate/paginate.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PaginateComponent],
  imports: [
    CommonModule
  ],
  exports: [PaginateComponent, CommonModule, FormsModule, ReactiveFormsModule]
})
export class ShareModule { }
