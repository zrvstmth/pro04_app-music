import { Component } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // opérateurs
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app-music';
  count: Observable<number>;
  time: string;

  constructor(public authS: AuthService) {
    const interval$ = interval(1000);

    const counter = interval$.pipe(
      map(number => {
        let hours = Math.floor(number / 3600);
        let minutes = Math.floor(number / 60);

        return `${hours} h ${minutes - hours * 60} min ${number - minutes * 60} s`
      })
    );

    counter.subscribe(
      number => this.time = number
    );
  }
}