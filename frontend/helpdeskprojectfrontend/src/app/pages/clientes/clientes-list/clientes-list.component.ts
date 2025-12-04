import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.css']
})
export class ClientesListComponent implements OnInit {

  ELEMENT_DATA: Cliente[] = [];
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'acoes'];
  dataSource = new MatTableDataSource<Cliente>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: ClienteService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe(
      response => {
        this.ELEMENT_DATA = response;
        this.dataSource = new MatTableDataSource<Cliente>(response);
        this.dataSource.paginator = this.paginator;
      },
      error => {
        console.log(error);
        if(error.status === 403) {
          alert('ACESSO NEGADO: Você não tem permissão para visualizar a lista de clientes.');
        } else {
          alert('Erro ao carregar clientes!');
        }
      }
    );
  }
}