import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-clientes-delete',
  templateUrl: './clientes-delete.component.html',
  styleUrls: ['./clientes-delete.component.css']
})
export class ClientesDeleteComponent implements OnInit {

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    perfis: [],
    dataCriacao: ''
  }

  constructor(
    private service: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cliente.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.cliente.id).subscribe(
      response => {
        this.cliente = response;
      }, 
      error => {
        alert('Erro ao carregar cliente!');
        this.router.navigate(['clientes']);
      }
    );
  }

  delete(): void {
    this.service.delete(this.cliente.id).subscribe(
      () => {
        alert('Cliente deletado com sucesso!');
        this.router.navigate(['clientes']);
      },
      (ex) => {
        console.log(ex);
        // --- TRATAMENTO DE ERRO COM ALERTA ---
        if(ex.error && ex.error.message) {
            // Aqui vai aparecer: "Cliente possui ordens de serviço e não pode ser deletado!"
            alert(ex.error.message); 
        } else {
            alert('Erro ao deletar cliente! Tente novamente.');
        }
      }
    );
  }

  cancelar(): void {
    this.router.navigate(['clientes']);
  }
}