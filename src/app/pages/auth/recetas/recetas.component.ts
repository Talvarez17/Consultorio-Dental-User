import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConexionService } from 'src/app/services/conexion.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styleUrls: ['./recetas.component.css']
})
export class RecetasComponent {

  recetas: any = [];
  page = 1;
  total = 0;
  perPage = 3;
  cita = '';

  constructor(public router: Router, public service: ConexionService, private activeRoute: ActivatedRoute, private location: Location) {
  }

  ngOnInit() {
    const idCita = this.activeRoute.snapshot.params['idCita'];
    this.cita = idCita;
    this.obtenerRecetasCita(idCita);
  }

  //-------------------------------------------- Formato de la hora--------------------------------------
  formatoHora(hora: string): string {
    const [horas, minutos] = hora.split(':');
    const fecha = new Date();
    fecha.setHours(+horas, +minutos);
    return fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  //-------------------------------------------- Metodos --------------------------------------

  regresar() {
    this.location.back();
  }

  //-------------------------------------------- Metodos --------------------------------------
  obtenerRecetasCita(id: any = '', page: number = 1): void {
    const queryParams = `id=${id}&page=${page}&pageSize=${this.perPage}`;
    this.service.get(`consulta/getAllRecetas?${queryParams}`).subscribe((info: any) => {
      if (info) {
        this.recetas = info.data; 
        const pagination = info.pagination; 
        this.total = pagination.total;
        this.page = pagination.currentPage;
        this.perPage = pagination.perPage;
      }
    });
  }

  onPageChange(page: number): void {
    this.obtenerRecetasCita(this.cita, page);
  }
}
