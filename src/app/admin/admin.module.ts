import { NgModule } from '@angular/core';
import { AlbumComponent } from './album/album.component';
// Partager component, services,directive et pipe
import { ShareModule } from '../share/share.module';

@NgModule({
  declarations: [AlbumComponent],
  imports: [
    ShareModule
  ],
  exports : [AlbumComponent]
})
export class AdminModule { }
