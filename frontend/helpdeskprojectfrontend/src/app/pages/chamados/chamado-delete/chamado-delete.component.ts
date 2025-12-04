import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chamado } from 'src/app/models/chamado';
import { ChamadoService } from 'src/app/services/chamado.service';

@Component({
  selector: 'app-chamado-delete',
  templateUrl: './chamado-delete.component.html',
  styleUrls: ['./chamado-delete.component.css']
})
export class ChamadoDeleteComponent implements OnInit {

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
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.chamadoService.findById(this.chamado.id).subscribe(response => {
      this.chamado = response;
    }, ex => {
      console.log(ex);
      alert('Erro ao buscar chamado!');
      this.router.navigate(['chamados']);
    })
  }

  delete(): void {
    this.chamadoService.delete(this.chamado.id).subscribe(
      () => {
        alert('Chamado deletado com sucesso!');
        this.router.navigate(['chamados']);
      }, 
      (ex) => {
        console.log(ex);
        // --- TRATAMENTO DE ERRO COM ALERTA ---
        if(ex.error && ex.error.message) {
            // Aqui vai aparecer: "Chamado não pode ser deletado, pois não está ENCERRADO."
            alert(ex.error.message);
        } else {
            alert('Erro ao deletar chamado!');
        }
      }
    )
  }

  cancelar(): void {
    this.router.navigate(['chamados']);
  }

  retornaStatus(status: any): string {
    if(status == '0' || status == 0) return 'ABERTO';
    if(status == '1' || status == 1) return 'EM ANDAMENTO';
    return 'ENCERRADO';
  }

  retornaPrioridade(prioridade: any): string {
    if(prioridade == '0' || prioridade == 0) return 'BAIXA';
    if(prioridade == '1' || prioridade == 1) return 'MÉDIA';
    return 'ALTA';
  }
}