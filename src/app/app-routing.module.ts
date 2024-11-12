import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RecetasComponent } from './pages/auth/recetas/recetas.component';
import { CitasComponent } from './pages/auth/citas/citas.component';

const routes: Routes = [
  {
    path: "", children: [
      { path: "login", component: LoginComponent },
      { path: "citas", component: CitasComponent },
      { path: "recetas", component: RecetasComponent },

      { path: "**", redirectTo: "login" },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
