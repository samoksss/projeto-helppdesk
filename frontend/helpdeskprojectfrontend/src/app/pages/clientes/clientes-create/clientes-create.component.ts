import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-clientes-create',
  templateUrl: './clientes-create.component.html',
  styleUrls: ['./clientes-create.component.css']
})
export class ClientesCreateComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: ClienteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      cpf: ['', [Validators.required, Validators.minLength(11)]],
      email: ['', [Validators.required, Validators.email]],
      // Senha removida (cliente não loga)
      perfis: [[1]] // Perfil 1 (CLIENTE)
    });
  }

  create(): void {
    if (this.form.invalid) {
      return;
    }
    
    this.service.create(this.form.value).subscribe(
      () => {
        alert('Cliente cadastrado com sucesso!');
        this.router.navigate(['clientes']);
      },
      (error) => {
        console.error(error);
        
        // --- TRATAMENTO DE PERMISSÃO NEGADA ---
        if(error.status === 403) {
            alert('ACESSO NEGADO: Você não tem permissão para cadastrar novos clientes.');
        } 
        else if (error.error && error.error.message) {
            alert(error.error.message);
        } else {
            alert('Erro ao cadastrar cliente!');
        }
      }
    );
  }

  cancelar(): void {
    this.router.navigate(['clientes']);
  }
}