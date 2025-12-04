import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) {}

  findAll(): Observable<any[]> {
    return this.http.get<any[]>(`${API_CONFIG.baseUrl}/clientes`);
  }

  findById(id: any): Observable<any> {
    return this.http.get<any>(`${API_CONFIG.baseUrl}/clientes/${id}`);
  }

  create(cliente: any): Observable<any> {
    return this.http.post(`${API_CONFIG.baseUrl}/clientes`, cliente);
  }

  // CORREÇÃO AQUI:
  // Agora aceita 'id' e 'cliente' separadamente.
  // Isso faz funcionar com a chamada: this.service.update(this.id, clienteDTO)
  update(id: any, cliente: any): Observable<any> {
    return this.http.put(`${API_CONFIG.baseUrl}/clientes/${id}`, cliente);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${API_CONFIG.baseUrl}/clientes/${id}`);
  }
}