import { Routes, RouterModule } from '@angular/router';
import { GuardService } from '../guard.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../share/share.module';
import { AlbumComponent } from './album/album.component';
import { AddalbumComponent } from './addalbum/addalbum.component';

// Dans l'AdminModule définition des routes
const routes: Routes = [
  { path: 'admin/add', canActivate: [GuardService], component: AddalbumComponent },
]
@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    RouterModule.forChild(routes) // définition des routes dans le sous-module
  ],
  declarations: [AlbumComponent, AddalbumComponent],
  exports: [AlbumComponent, RouterModule]
})
export class AdminModule { }