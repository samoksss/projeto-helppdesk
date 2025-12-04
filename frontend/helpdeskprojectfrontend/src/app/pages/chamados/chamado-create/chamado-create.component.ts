import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.css']
})
export class ChamadoCreateComponent implements OnInit {

  form: FormGroup;
  clientes: Cliente[] = [];
  tecnicos: Tecnico[] = [];

  constructor(
    private chamadoService: ChamadoService,
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private fb: FormBuilder,
    private router: Router
  ) { 
    this.form = this.fb.group({
      titulo: ['', [Validators.required]],
      status: ['0', [Validators.required]],
      prioridade: ['0', [Validators.required]],
      tecnico: ['', [Validators.required]],
      cliente: ['', [Validators.required]],
      observacoes: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.findAllClientes();
    this.findAllTecnicos();
  }

  findAllClientes(): void {
    this.clienteService.findAll().subscribe(response => {
      this.clientes = response;
    })
  }

  findAllTecnicos(): void {
    this.tecnicoService.findAll().subscribe(response => {
      this.tecnicos = response;
    })
  }

  create(): void {
    if(this.form.invalid) {
      console.log("Formulário inválido", this.form.value);
      return;
    }

    // Copia valores
    const chamadoDTO: any = { ...this.form.value };
    
    // Conversões de segurança
    chamadoDTO.tecnico = Number(chamadoDTO.tecnico);
    chamadoDTO.cliente = Number(chamadoDTO.cliente);
    chamadoDTO.status = Number(chamadoDTO.status);
    chamadoDTO.prioridade = Number(chamadoDTO.prioridade);

    // Mapeamento Híbrido (segurança para o backend)
    chamadoDTO.tecnicoId = chamadoDTO.tecnico;
    chamadoDTO.clienteId = chamadoDTO.cliente;

    this.chamadoService.create(chamadoDTO).subscribe(response => {
      alert('Chamado criado com sucesso!');
      this.router.navigate(['chamados']);
    }, ex => {
      console.log(ex);
      
      // --- TRATAMENTO DE PERMISSÃO NEGADA ---
      if(ex.status === 403) {
           alert('ACESSO NEGADO: Você não tem permissão para abrir novos chamados.');
      }
      else if(ex.error && ex.error.message) {
        alert(ex.error.message);
      } else {
        alert('Erro ao criar chamado!');
      }
    })
  }

  cancelar(): void {
    this.router.navigate(['chamados']);
  }
}