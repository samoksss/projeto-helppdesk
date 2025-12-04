import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  // O template agora é o ponto de injeção das rotas (login OU layout)
  template: `
    <router-outlet></router-outlet>
  `,
  // O estilo pode ser vazio ou se referir a um arquivo CSS
  styles: []
})
export class AppComponent {
  title = 'helpdeskprojectfrontend';
}