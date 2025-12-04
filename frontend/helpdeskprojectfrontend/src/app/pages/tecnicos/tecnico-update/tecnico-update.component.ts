import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { Tecnico } from 'src/app/models/tecnico';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css']
})
export class TecnicoUpdateComponent implements OnInit {

  form: FormGroup;
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
    private fb: FormBuilder,
    private service: TecnicoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      cpf: ['', [Validators.required, Validators.minLength(11)]],
      email: ['', [Validators.required, Validators.email]],
      senha: [''], // Senha opcional no update
      perfis: [[]],
      isAdmin: [false]
    });

    this.tecnico.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.tecnico.id).subscribe(response => {
      this.tecnico = response;
      this.form.patchValue({
        nome: response.nome,
        cpf: response.cpf,
        email: response.email
      });

      if (response.perfis.includes(0)) {
         this.form.controls['isAdmin'].setValue(true);
      }
    });
  }

  update(): void {
    if (this.form.invalid) return;

    const tecnicoDTO = this.form.value;

    if (tecnicoDTO.isAdmin) {
      tecnicoDTO.perfis = [0, 2];
    } else {
      tecnicoDTO.perfis = [2];
    }
    
    delete tecnicoDTO.isAdmin;

    this.service.update(this.tecnico.id, tecnicoDTO).subscribe(
      () => {
        alert('Técnico atualizado com sucesso!');
        this.router.navigate(['tecnicos']);
      }, 
      (error) => { // --- TRATAMENTO DE ERRO AQUI ---
        console.error(error);
        if(error.status === 403) {
            alert('ACESSO NEGADO: Você não tem permissão para alterar dados de técnicos.');
        } 
        else if(error.error && error.error.message) {
            alert(error.error.message);
        } else {
            alert('Erro ao atualizar técnico!');
        }
      }
    );
  }

  cancelar(): void {
    this.router.navigate(['tecnicos']);
  }
}