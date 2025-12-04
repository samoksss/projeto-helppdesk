import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; 

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Verifica se está autenticado no AuthService
    if(this.authService.isAuthenticated()) {
      return true;
    } else {
      // Se não estiver logado, manda para o login
      this.router.navigate(['login']);
      return false;
    }
  }
}