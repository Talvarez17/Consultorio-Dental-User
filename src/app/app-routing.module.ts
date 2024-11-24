import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RecetasComponent } from './pages/auth/recetas/recetas.component';
import { CitasComponent } from './pages/auth/citas/citas.component';
import { PerfilComponent } from './pages/auth/perfil/perfil.component';
import { ProximasCitasComponent } from './pages/auth/proximas-citas/proximas-citas.component';
import { AuthGuard } from './pages/auth/guard/auth.guard';

const routes: Routes = [
  {
    path: "", children: [
      { path: "login", component: LoginComponent },
      { path: "historial", component: CitasComponent, canActivate: [AuthGuard] },
      { path: "recetas/:idCita", component: RecetasComponent, canActivate: [AuthGuard] },
      { path: "perfil", component: PerfilComponent, canActivate: [AuthGuard] },
      { path: "proximas", component: ProximasCitasComponent, canActivate: [AuthGuard] },

      { path: "**", redirectTo: "login" },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
