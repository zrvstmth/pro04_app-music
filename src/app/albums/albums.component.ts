import { Component, OnInit } from '@angular/core';
import { Album, Position } from '../albums';
import { AlbumService } from '../album.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
  animations: [
  ]
})
export class AlbumsComponent implements OnInit {

  albums: Album[] = [];
  // count: Observable<number>;
  isSearch: boolean = false;

  position = Position; // comme valeurs positions

  selectedAlbum: Album;
  title: string = "Details des chansons d'un album...";
  perPage: number = environment.perPage;

  // service on doit DI ~ préparation des services par Angular éventuellement dépend d'autre(s) service(s)
  constructor(private aS: AlbumService) { }

  ngOnInit() {
    // vous pouvez passer en paramètre une fonction flèchée pour sort définie dans le service
    this.aS.paginate(0, this.perPage).subscribe(
      albums => this.albums = albums
    );
  }

  ngOnChanges() {
    console.log('ngOnChanges AlbumsComponent')
  }

  onSelect(album: Album, $event) {
    this.selectedAlbum = album;
  }

  // TODO 
  playParent($event: Album) {
    this.aS.switchOn($event).subscribe(
      a => {
        console.log('appel de switchOn', a);
        this.aS.subjectAlbum.next(a);
      }
    );
  }

  searchParent($event: Album[]) {
    this.albums = $event;
    this.isSearch = true;
  }

  reloadParent($event: boolean) {
    this.isSearch = false;

    if ($event) {
      this.aS.paginate(0, environment.perPage).subscribe(
        albums => this.albums = albums
      );
    }
  }

  paginateParent($event: { start: number, end: number }) {

    const { start, end } = $event;

    this.aS.paginate(start, end).subscribe(
      albums => this.albums = albums
    );
  }

}
