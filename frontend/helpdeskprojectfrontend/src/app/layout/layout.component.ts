import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importe o Router

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  title = 'Help Desk Frontend';
  // Variável para a saudação personalizada
  nomeUsuarioLogado = 'Seu Nome Aqui'; 

  constructor(private router: Router) { }
  
  fazerLogout() {
    console.log("Executando Logout...");
    // A navegação real após a exclusão do token JWT será implementada aqui
    this.router.navigate(['/login']); 
  }
}