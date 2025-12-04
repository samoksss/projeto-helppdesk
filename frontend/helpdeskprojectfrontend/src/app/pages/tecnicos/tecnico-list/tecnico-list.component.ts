import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-list',
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.css']
})
export class TecnicoListComponent implements OnInit {

  // Dados para a tabela do Angular Material
  ELEMENT_DATA: Tecnico[] = [];
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'acoes'];
  dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);

  // CORREÇÃO: Adicionado '!' para evitar erro de inicialização estrita do TypeScript
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: TecnicoService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe(
      response => {
        // Sucesso: Preenche a tabela
        this.ELEMENT_DATA = response;
        this.dataSource = new MatTableDataSource<Tecnico>(response);
        this.dataSource.paginator = this.paginator;
      },
      error => {
        // Erro: Tratamento para permissão negada
        console.log(error);
        if(error.status === 403) {
            alert('ACESSO NEGADO: Você não tem permissão para visualizar a lista de técnicos.');
        } else {
            alert('Erro ao carregar técnicos!');
        }
      }
    );
  }

  // Filtro de busca
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}