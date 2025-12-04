import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-chamado-update',
  templateUrl: './chamado-update.component.html',
  styleUrls: ['./chamado-update.component.css']
})
export class ChamadoUpdateComponent implements OnInit {

  form: FormGroup;
  clientes: Cliente[] = [];
  tecnicos: Tecnico[] = [];
  
  chamado: Chamado = {
    prioridade: '',
    status: '',
    titulo: '',
    observacoes: '',
    tecnico: '',
    cliente: '',
    nomeCliente: '',
    nomeTecnico: '',
  }

  constructor(
    private chamadoService: ChamadoService,
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.form = this.fb.group({
      titulo: ['', [Validators.required]],
      status: ['', [Validators.required]],
      prioridade: ['', [Validators.required]],
      tecnico: ['', [Validators.required]],
      cliente: ['', [Validators.required]],
      observacoes: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get('id');
    this.findAllClientes();
    this.findAllTecnicos();
    this.findById();
  }

  findById(): void {
    this.chamadoService.findById(this.chamado.id).subscribe(response => {
      this.chamado = response;
      
      this.form.patchValue({
        titulo: this.chamado.titulo,
        status: this.chamado.status,
        prioridade: this.chamado.prioridade,
        tecnico: this.chamado.tecnico,
        cliente: this.chamado.cliente,
        observacoes: this.chamado.observacoes
      });
    }, ex => {
      alert('Erro ao buscar chamado!');
      this.router.navigate(['chamados']);
    })
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

  update(): void {
    if(this.form.invalid) return;

    // Pega os dados do form
    const chamadoDTO = this.form.value;
    chamadoDTO.id = this.chamado.id;

    // CORREÇÃO: Força conversão para número (Status e Prioridade)
    chamadoDTO.status = Number(chamadoDTO.status);
    chamadoDTO.prioridade = Number(chamadoDTO.prioridade);
    
    // CORREÇÃO: Força conversão para número (IDs)
    chamadoDTO.tecnico = Number(chamadoDTO.tecnico);
    chamadoDTO.cliente = Number(chamadoDTO.cliente);

    // REMOVIDO: Antiga conversão para tecnicoId/clienteId (não precisa mais!)

    this.chamadoService.update(chamadoDTO).subscribe(response => {
      alert('Chamado atualizado com sucesso!');
      this.router.navigate(['chamados']);
    }, ex => {
      console.log(ex);
      if(ex.error && ex.error.message) {
        alert(ex.error.message);
      } else {
        alert('Erro ao atualizar chamado!');
      }
    })
  }

  cancelar(): void {
    this.router.navigate(['chamados']);
  }
}