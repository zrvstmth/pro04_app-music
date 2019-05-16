import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlbumService } from 'src/app/album.service';
import { Router } from '@angular/router';
import { Album } from 'src/app/albums';

@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.scss']
})
export class AddAlbumComponent implements OnInit {

  albumForm: FormGroup;

  album: Album;

  constructor(
    private fb: FormBuilder,
    private aS: AlbumService,
    private router: Router
  ) {
    // STUB
    this.album = {
      id: Math.random().toString(32),
      name: 'Albert',
      title: Math.random().toString(32),
      ref: '45FTR', // optional
      duration: Math.floor(Math.random() * 960),
      description: 'une description ...',
      status: 'off'
    }
  }

  ngOnInit() {
    this.initAlbum();
  }

  initAlbum() {

    // FormControl
    // utilisez les validators suivants pattern, max, required, minLength(5)
    this.albumForm = this.fb.group(
      {
        id: this.album.id,
        name: new FormControl(this.album.name, [
          Validators.required,
          Validators.minLength(5)
        ]),
        title: new FormControl(this.album.title, [
          Validators.required,
        ]),
        ref: new FormControl(this.album.ref, [
          Validators.required,
          Validators.pattern("[a-zA-Z0-9\_]{5}") // regex pour vérifire une syntaxe
        ]),
        duration: new FormControl(this.album.duration, [
          Validators.required,
          Validators.max(960)
        ]),
        description: this.album.description,
        status: this.album.status
      }
    );
  }

  // getter pour récupérer les messages d'erreur dans le formulaire cote html
  get name() { return this.albumForm.get('name'); }
  get title() { return this.albumForm.get('title'); }
  get ref() { return this.albumForm.get('ref'); }
  get duration() { return this.albumForm.get('duration'); }
  get description() { return this.albumForm.get('description'); }

  onSubmit() {

    const album = this.albumForm.value;

    this.aS.addAlbum(album).subscribe((snap: { name: string }) => {
      album.id = snap.name;
      this.aS.updateAlbum(snap.name, album).subscribe(() => {
        console.log('updated ...')
      })
    });

  }

}