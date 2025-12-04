import { Component, OnInit } from '@angular/core';
import { ChamadoService } from '../services/chamado.service';
import { Chamado } from '../models/chamado';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Variáveis para armazenar as quantidades
  totalChamados: number = 0;
  abertos: number = 0;
  andamento: number = 0;
  encerrados: number = 0;

  constructor(private service: ChamadoService) { }

  ngOnInit(): void {
    this.findAllChamados();
  }

  findAllChamados(): void {
    this.service.findAll().subscribe(response => {
      this.totalChamados = response.length;
      
      // Filtra e conta cada tipo de status
      // Status 0 = ABERTO, 1 = ANDAMENTO, 2 = ENCERRADO
      this.abertos = response.filter(c => c.status == '0').length;
      this.andamento = response.filter(c => c.status == '1').length;
      this.encerrados = response.filter(c => c.status == '2').length;
    });
  }
}