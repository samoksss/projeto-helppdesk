import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment.prod'; // <--- MUDOU AQUI
import { Credenciais } from '../models/credenciais';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtService: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) {}

  authenticate(creds: Credenciais): Observable<HttpResponse<any>> {
    return this.http.post(
      `${environment.apiUrl}/login`, // <--- USANDO ENVIRONMENT
      creds,
      { observe: 'response' }
    );
  }

  sucessfulLogin(token: string) {
    if (token.substring(0, 7) === 'Bearer ') {
        token = token.substring(7);
    }
    localStorage.setItem('token', token);
  }

  isAuthenticated() {
    let token = localStorage.getItem('token');
    
    if (token != null && token !== 'null' && token !== 'undefined') {
      try {
        return !this.jwtService.isTokenExpired(token);
      } catch (e) {
        return false;
      }
    }
    
    return false;
  }
  
  logout() {
    localStorage.clear();
  }
}