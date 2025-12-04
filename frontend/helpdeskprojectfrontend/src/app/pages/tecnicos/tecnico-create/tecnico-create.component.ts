import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: TecnicoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      cpf: ['', [Validators.required, Validators.minLength(11)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(3)]],
      perfis: [[]],
      isAdmin: [false]
    });
  }

  create(): void {
    if (this.form.invalid) {
      return;
    }

    const tecnicoDTO = this.form.value;

    if (tecnicoDTO.isAdmin) {
      tecnicoDTO.perfis = [0, 2];
    } else {
      tecnicoDTO.perfis = [2];
    }
    
    delete tecnicoDTO.isAdmin;

    this.service.create(tecnicoDTO).subscribe(
      () => {
        alert('Técnico criado com sucesso!');
        this.router.navigate(['tecnicos']);
      },
      (error) => {
        console.error('Erro ao criar técnico: ', error);
        
        // --- TRATAMENTO DE PERMISSÃO NEGADA ---
        if(error.status === 403) {
             alert('ACESSO NEGADO: Você não tem permissão para criar novos técnicos.');
        } 
        else if(error.error && error.error.message) {
            alert(error.error.message);
        } else {
            alert('Erro ao criar técnico!');
        }
      }
    );
  }

  cancelar(): void {
    this.router.navigate(['tecnicos']);
  }
}