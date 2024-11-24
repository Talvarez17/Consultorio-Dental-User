import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { CitasComponent } from './pages/auth/citas/citas.component';
import { RecetasComponent } from './pages/auth/recetas/recetas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { PerfilComponent } from './pages/auth/perfil/perfil.component';
import { ProximasCitasComponent } from './pages/auth/proximas-citas/proximas-citas.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    CitasComponent,
    RecetasComponent,
    PerfilComponent,
    ProximasCitasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
