import { Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConexionService } from 'src/app/services/conexion.service';

@Component({
  selector: 'app-proximas-citas',
  templateUrl: './proximas-citas.component.html',
  styleUrls: ['./proximas-citas.component.css']
})
export class ProximasCitasComponent {

  date = new Date();
  citas: any = [];
  page = 1;
  total = 0;
  perPage = 3;
  currentSearch: string = '';
  paciente: any = '';

  constructor(public router: Router, public service: ConexionService, private activeRoute: ActivatedRoute) {
  }

  ngOnInit() { 
    this.paciente = localStorage.getItem("idU");
    this.obtenerCitasPaciente(localStorage.getItem("idU")) }

  //-------------------------------------------- Formato de la hora y esatus --------------------------------------
  formatoHora(hora: string): string {
    const [horas, minutos] = hora.split(':');
    const fecha = new Date();
    fecha.setHours(+horas, +minutos);
    return fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  estatusCita(estado: any) {
    switch (estado) {
      case 0:
        return "Cancelada";
      case 1:
        return "Activa";
      case 2:
        return "Completada";
      default:
        return "Activa";
    }
  }

  obtenerCitasPaciente(id:any ='', page: number = 1, search: string = ''): void {
    const queryParams = `id=${id}&page=${page}&pageSize=${this.perPage}&search=${search}`;
    this.service.get(`citas/getProximaPaciente?${queryParams}`).subscribe((info: any) => {
      if (info) {
        this.citas = info.data;
        this.total = info.pagination.total;
        this.page = info.pagination.currentPage;
      }
    });
  }

  onPageChange(page: number): void {
    this.obtenerCitasPaciente(this.paciente,page, this.currentSearch);
  }

  onSearch(event: Event): void {
    const search = (event.target as HTMLInputElement).value;
    this.currentSearch = search;
    this.obtenerCitasPaciente(this.paciente,1, search);
  }

}
