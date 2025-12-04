import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// LOGIN
import { LoginComponent } from './pages/login/login.component';

// LAYOUT
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';

// CRUD TÉCNICOS
import { TecnicoListComponent } from './pages/tecnicos/tecnico-list/tecnico-list.component';
import { TecnicoCreateComponent } from './pages/tecnicos/tecnico-create/tecnico-create.component';
import { TecnicoUpdateComponent } from './pages/tecnicos/tecnico-update/tecnico-update.component';
import { TecnicoDeleteComponent } from './pages/tecnicos/tecnico-delete/tecnico-delete.component';

// CRUD CLIENTES
import { ClientesListComponent } from './pages/clientes/clientes-list/clientes-list.component';
import { ClientesCreateComponent } from './pages/clientes/clientes-create/clientes-create.component';
import { ClientesUpdateComponent } from './pages/clientes/clientes-update/clientes-update.component';
import { ClientesDeleteComponent } from './pages/clientes/clientes-delete/clientes-delete.component';

// CRUD CHAMADOS
import { ChamadoListComponent } from './pages/chamados/chamado-list/chamado-list.component';
import { ChamadoCreateComponent } from './pages/chamados/chamado-create/chamado-create.component';
import { ChamadoUpdateComponent } from './pages/chamados/chamado-update/chamado-update.component';
import { ChamadoReadComponent } from './pages/chamados/chamado-read/chamado-read.component';
import { ChamadoDeleteComponent } from './pages/chamados/chamado-delete/chamado-delete.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: '', pathMatch: 'full', redirectTo: 'login' },

  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },

      // Rotas de Técnicos
      { path: 'tecnicos', component: TecnicoListComponent },
      { path: 'tecnicos/create', component: TecnicoCreateComponent },
      { path: 'tecnicos/update/:id', component: TecnicoUpdateComponent },
      { path: 'tecnicos/delete/:id', component: TecnicoDeleteComponent },

      // Rotas de Clientes
      { path: 'clientes', component: ClientesListComponent },
      { path: 'clientes/create', component: ClientesCreateComponent },
      { path: 'clientes/update/:id', component: ClientesUpdateComponent },
      { path: 'clientes/delete/:id', component: ClientesDeleteComponent },

      // Rotas de Chamados
      { path: 'chamados', component: ChamadoListComponent },
      { path: 'chamados/create', component: ChamadoCreateComponent },
      { path: 'chamados/update/:id', component: ChamadoUpdateComponent },
      { path: 'chamados/read/:id', component: ChamadoReadComponent },
      { path: 'chamados/delete/:id', component: ChamadoDeleteComponent },
    ]
  },

  // Qualquer rota desconhecida também manda para o login
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}