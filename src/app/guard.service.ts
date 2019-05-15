import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(
    private authS: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any | boolean {

    // pour vérifier si l'utilisateur est bien connecté ~ service authService ...
    if (this.authS.authState === true) return true;

    // sinon une redirection
    this.router.navigate(
      ['/login'],
      { queryParams: { messageError: 'Error authentification' } }
    );
  }
}
