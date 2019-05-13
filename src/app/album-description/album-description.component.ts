import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from '../album.service';
import { Album } from '../albums';

@Component({
  selector: 'app-album-description',
  templateUrl: './album-description.component.html',
  styleUrls: ['./album-description.component.scss']
})
export class AlbumDescriptionComponent implements OnInit {

  album : Album;

  constructor(
    private route : ActivatedRoute,
    private aS : AlbumService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.album = this.aS.getAlbum(id);
  }

}
