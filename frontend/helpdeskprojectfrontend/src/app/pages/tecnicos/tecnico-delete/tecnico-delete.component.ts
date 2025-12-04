import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css']
})
export class TecnicoDeleteComponent implements OnInit {

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

  constructor(
    private service: TecnicoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.tecnico.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.tecnico.id).subscribe(response => {
      this.tecnico = response;
    })
  }

  delete(): void {
    this.service.delete(this.tecnico.id).subscribe(
      () => {
        alert('Técnico deletado com sucesso!');
        this.router.navigate(['tecnicos']);
      }, 
      (error) => { // --- TRATAMENTO DE ERRO AQUI ---
        console.error(error);
        if(error.status === 403) {
            alert('ACESSO NEGADO: Você não tem permissão para deletar técnicos.');
        }
        else if(error.error && error.error.message) {
            alert(error.error.message);
        } else {
            alert('Erro ao deletar técnico!');
        }
      }
    )
  }

  cancelar(): void {
    this.router.navigate(['tecnicos']);
  }
}