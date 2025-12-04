import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    let token = localStorage.getItem('token');

    // Se tiver token, anexa na requisição
    if (token) {
      const cloneReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });
      request = cloneReq;
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        
        // SE DER ERRO 401 (Não Autorizado) ou 403 (Proibido)
        // Significa que o token é inválido para o backend.
        if (error.status === 401 || error.status === 403) {
          localStorage.clear(); // Apaga o token zumbi
          this.router.navigate(['login']); // Chuta para o login
        }
        
        return throwError(error);
      })
    );
  }
}

export const AuthInterceptorProvider = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
];