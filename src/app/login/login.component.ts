import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  messageError: string = null; // @todo

  constructor(
    private authS: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.authS.auth(form.value['email'], form.value['password']).then(
      () => {
        // la redirection après connexion
        this.router.navigate(['/dashboard'], { queryParams: { message: 'success' } });
      }
    ).catch(
      error => this.messageError = 'Error login'
    )
  }
}