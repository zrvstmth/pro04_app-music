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
  // perPageAdmin: number = 5;
  changePerPage: number;

  constructor(private aS: AlbumService) { this.changePerPage = environment.perPageAdmin}

  ngOnInit() {

    this.albums = this.aS.paginate(0, this.changePerPage);

    // this.aS.getAlbums().subscribe(
    //   // albums => this.albums = albums
    // );

  }

  paginateParent($event: { start: number, end: number }) {

    const { start, end } = $event;

    this.albums = this.aS.paginate(start, end);
  }

}
