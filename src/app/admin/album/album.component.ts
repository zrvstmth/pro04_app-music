import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/albums';
import { AlbumService } from 'src/app/album.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  // albums: Album[] = [];

  albums: Observable<Album[]>;

  constructor(private aS: AlbumService) {}

  ngOnInit() {

    this.albums = this.aS.paginate(0, environment.perPage);

    // this.aS.getAlbums().subscribe(
    //   // albums => this.albums = albums
    // );

  }

  paginateParent($event: { start: number, end: number }) {

    const { start, end } = $event;

    this.albums = this.aS.paginate(start, end);
  }

}
