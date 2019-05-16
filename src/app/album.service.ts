import { Injectable } from '@angular/core';
import { Album, List, Position } from './albums'; // types
import { ALBUMS, ALBUM_LISTS } from './mock-albums';

import { Subject, Observable } from 'rxjs'; // librarie à parti intégrée dans Angular

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private _albums: Album[] = ALBUMS; // _ convention private et protected
  private _albumList: List[] = ALBUM_LISTS;

  private albumsUrl = 'https://angular-app-music.firebaseio.com/albums';
  private albumListsUrl = 'https://angular-app-music.firebaseio.com/albumLists';

  // Observer => next publication d'information et Observable d'attendre des informations et d'exécuter du code
  sendCurrentNumberPage = new Subject<{ current: number, position: Position }>();
  subjectAlbum = new Subject<Album>();
  buttonPlay = new Subject<boolean>();

  // http ~ HttpClient service Angular pour faire du XMLHttpRequest version Framework
  constructor(private http: HttpClient) { }

  // RxJS ~ HttpClient
  getAlbums(order = (a, b) => b.duration - a.duration): Observable<Album[]> {

    return this.http.get<Album[]>(this.albumsUrl + '/.json', httpOptions).pipe(

      // 1./ Préparation des données avec _.values pour avoir un format exploitable dans l'application => Array de values JSON
      // On pourra facilement itérer, pb surtout lorsqu'on insert de la data => Firebase crée un hash en clef
      map(albums => _.values(albums)),

      // 2./ Ordonnez les albums par ordre de durées décroissantes
      map(albums => {
        return albums.sort(
          (a, b) => { return b.duration - a.duration }
        );
      })
    );
  }

  getAlbum(id: string, options = httpOptions): Observable<Album> {

    return this.http.get<Album>(`${this.albumsUrl}/${id}/.json`, options);
  }

  getAlbumList(id: string, options = httpOptions): Observable<List> {

    return this.http.get<List>(`${this.albumListsUrl}/${id}/.json`, options);
  }

  count(): Observable<number> {
    // return this._albums == null ? 0 : this._albums.length;
    return this.http.get<number>(`${this.albumsUrl}/.json`, httpOptions).pipe(map(albums=> _.values(albums)), map(albums =>albums.length))
  }

  switchOn(album: Album, options = httpOptions): Observable<Album> {
    this.buttonPlay.next(true);
    album.status = "on";

    // On peut faire une copie de l'objet album mais ce n'est pas fondamental
    // méthode { ...album } fait une copie
    const Album = { ...album };

    return this.http.put<Album>(`${this.albumsUrl}/${album.id}/.json`, Album, options);
  }

  switchOff(album: Album, options = httpOptions): Observable<Album> {
    this.buttonPlay.next(false);
    album.status = 'off';

    // On peut faire une copie de l'objet album mais ce n'est pas fondamental
    // méthode { ...album } fait une copie
    const Album = { ...album };

    return this.http.put<Album>(`${this.albumsUrl}/${album.id}/.json`, Album, options)
  }

  paginate(start: number, end: number): Observable<Album[]> {

    return this.http.get<Album[]>(this.albumsUrl + '/.json', httpOptions).pipe(
      map(albums => _.values(albums)),
      map(albums => albums.slice(start, end)),
    );
  }

  search(word: string | null): Observable<Album[]> {

    return this.http.get<Album[]>(this.albumsUrl + '/.json', httpOptions).pipe(

      map(albums => _.values(albums)),

      map(albums => {
        let Albums = [];
        if (word.length > 3) {
          albums.forEach(album => {
            if (album.title.includes(word)) Albums.push(album);
          })
        }

        return Albums;
      })
    );
  }

  addAlbum(album: Album): Observable<any> {
    return this.http.post<any>(this.albumsUrl + '/.json', album);
  }

  updateAlbum(ref: string, album: Album) {
    return this.http.put<Album>(this.albumsUrl  + "/" + ref + '/.json', album);
  }

}