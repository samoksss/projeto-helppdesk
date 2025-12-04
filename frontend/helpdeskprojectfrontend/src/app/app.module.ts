import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// Componentes principais
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';

// CRUD Técnico
import { TecnicoListComponent } from './pages/tecnicos/tecnico-list/tecnico-list.component';
import { TecnicoCreateComponent } from './pages/tecnicos/tecnico-create/tecnico-create.component';
import { TecnicoUpdateComponent } from './pages/tecnicos/tecnico-update/tecnico-update.component';
import { TecnicoDeleteComponent } from './pages/tecnicos/tecnico-delete/tecnico-delete.component';

// CRUD Clientes
import { ClientesListComponent } from './pages/clientes/clientes-list/clientes-list.component';
import { ClientesCreateComponent } from './pages/clientes/clientes-create/clientes-create.component';
import { ClientesUpdateComponent } from './pages/clientes/clientes-update/clientes-update.component';
import { ClientesDeleteComponent } from './pages/clientes/clientes-delete/clientes-delete.component';

// CRUD Chamados
import { ChamadoListComponent } from './pages/chamados/chamado-list/chamado-list.component';
import { ChamadoCreateComponent } from './pages/chamados/chamado-create/chamado-create.component';
import { ChamadoUpdateComponent } from './pages/chamados/chamado-update/chamado-update.component';
import { ChamadoReadComponent } from './pages/chamados/chamado-read/chamado-read.component';
import { ChamadoDeleteComponent } from './pages/chamados/chamado-delete/chamado-delete.component';

// Interceptor
import { AuthInterceptor } from './interceptors/auth.interceptor';

// Imports de Terceiros
import { NgxMaskModule } from 'ngx-mask'; // <--- ADICIONEI AQUI

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    HomeComponent,
    // Técnicos
    TecnicoListComponent,
    TecnicoCreateComponent,
    TecnicoUpdateComponent,
    TecnicoDeleteComponent,
    // Clientes
    ClientesListComponent,
    ClientesCreateComponent,
    ClientesUpdateComponent,
    ClientesDeleteComponent,
    // Chamados
    ChamadoListComponent,
    ChamadoCreateComponent,
    ChamadoUpdateComponent,
    ChamadoReadComponent,
    ChamadoDeleteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    // Configuração da Máscara (CPF/CNPJ etc)
    NgxMaskModule.forRoot(), // <--- ADICIONEI AQUI

    // Angular Material Imports
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatCheckboxModule,
    MatSelectModule,
    MatPaginatorModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}