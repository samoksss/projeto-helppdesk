import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod'; // <--- MUDOU AQUI
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) {}

  findAll(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/clientes`);
  }

  findById(id: any): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/clientes/${id}`);
  }

  create(cliente: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/clientes`, cliente);
  }

  update(id: any, cliente: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/clientes/${id}`, cliente);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/clientes/${id}`);
  }
}