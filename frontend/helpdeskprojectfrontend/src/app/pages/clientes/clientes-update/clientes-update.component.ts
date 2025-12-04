import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-clientes-update',
  templateUrl: './clientes-update.component.html',
  styleUrls: ['./clientes-update.component.css']
})
export class ClientesUpdateComponent implements OnInit {

  form: FormGroup;
  id: any;

  constructor(
    private service: ClienteService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      cpf: ['', [Validators.required, Validators.minLength(11)]],
      email: ['', [Validators.required, Validators.email]],
      // Senha REMOVIDA
      perfis: [[1]] 
    });

    this.findById();
  }

  findById(): void {
    this.service.findById(this.id).subscribe(
      (cliente) => {
        this.form.patchValue({
          nome: cliente.nome,
          cpf: cliente.cpf,
          email: cliente.email
        });
      },
      (error) => {
        alert('Erro ao carregar cliente!');
        this.router.navigate(['clientes']);
      }
    );
  }

  atualizar(): void {
    if (this.form.invalid) return;

    const clienteDTO = this.form.value;
    clienteDTO.id = this.id;
    clienteDTO.perfis = [1];

    this.service.update(this.id, clienteDTO).subscribe(
      () => {
        alert('Cliente atualizado com sucesso!');
        this.router.navigate(['clientes']);
      },
      (error) => {
        if (error.error && error.error.message) {
            alert(error.error.message);
        } else {
            alert('Erro ao atualizar cliente!');
        }
      }
    );
  }

  cancelar(): void {
    this.router.navigate(['clientes']);
  }
}