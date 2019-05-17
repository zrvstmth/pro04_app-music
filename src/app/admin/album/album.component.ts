import { Component, OnInit } from '@angular/core';
import { AlbumService } from 'src/app/album.service';
import { Album } from 'src/app/albums';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  albums: Observable<Album[]>;
  changePerpage: number;
  message: string;

  constructor(private aS: AlbumService, private route: ActivatedRoute) {
    // nombre d'albums par page dans l'administration
    // en fonction des variables d'environement
    this.changePerpage = environment.perPageAdmin;
    this.message = this.route.snapshot.paramMap.get('message');
  }

  ngOnInit() {
    this.albums = this.aS.paginate(0, this.changePerpage);
  }

  paginateParent($event: { start: number, end: number }) {
    const { start, end } = $event;

    this.albums = this.aS.paginate(start, end);
  }
}