import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConexionService } from 'src/app/services/conexion.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  url: string = "";
  perfil: any = {};
  carga: boolean = false;


  constructor(public router: Router, private fb: FormBuilder, public service: ConexionService) {
  }

  ngOnInit() {
    this.url = this.animal();
    this.carga = true
    this.obtenerPerfil(localStorage.getItem("idU"));

    setTimeout(() => {
      this.carga = false;
    }, 500);
  }

  animal() {
    const randoms = Math.floor(Math.random() * 10) + 1;

    switch (randoms) {
      case 1:
        return "../../../../assets/abeja.png";
      case 2:
        return "../../../../assets/anaconda.png";
      case 3:
        return "../../../../assets/elefante.png";
      case 4:
        return "../../../../assets/feliz.png";
      case 6:
        return "../../../../assets/koala.png";
      case 6:
        return "../../../../assets/mono.png";
      case 7:
        return "../../../../assets/medusa.png";
      case 8:
        return "../../../../assets/oveja.png";
      case 9:
        return "../../../../assets/perro.png";
      case 10:
        return "../../../../assets/pez.png";
      default:
        return "../../../../assets/medusa.png";
    }
  }

  // --------------------------------------------- Formularios -------------------------------------------------------------------

  FormularioEmail: FormGroup = this.fb.group({
    correo: [, [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]]
  });
  FormularioContrasenia: FormGroup = this.fb.group({
    contrasenia: [, Validators.required]
  });


  //-------------------------------------------- Calculo de la edad del paciente --------------------------------------
  calcularEdad(fechaNacimiento: string): number {
    const hoy = new Date();
    const fechaNac = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }

    return edad;
  }

  //-------------------------------------------- Manejo de los modales editar y cita --------------------------------------

  @ViewChild('editarPass') editarPass!: ElementRef;

  abrirModalEditarPass() {
    this.editarPass.nativeElement.showModal();
  }

  @ViewChild('editarEmail') editarEmail!: ElementRef;

  abrirModalEditarEmail() {
    this.editarEmail.nativeElement.showModal();
  }

  //-------------------------------------------- Metodos --------------------------------------

  obtenerPerfil(id: any) {
    this.service.get(`paciente/getOne/${id}`).subscribe((info: any) => {

      console.log(info.data);

      if (info.error == false) {
        this.perfil = info.data;
      }
    })
  }

  actualizarCorreo() {

    Swal.fire({
      title: "¿Quieres actualizar tu correo?",
      text: "Asegurate de recordarlo",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#14B8A6",
      cancelButtonColor: "#EF4444",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {

        const id = localStorage.getItem("idU");

        this.service.put(`paciente/updateEmail/${id}`, this.FormularioEmail.value).subscribe((info: any) => {

          if (info.error == false) {

            Swal.fire({
              icon: "success",
              title: "Exito",
              text: "Correo actualizadado con exito",
              showConfirmButton: false,
              timer: 1500
            });

            setTimeout(() => {
              location.reload();
            }, 1500);

          } else {
            Swal.fire({
              icon: "error",
              title: "Upsss",
              text: "Hubo un error al intentar actualizar el correo, intentelo de nuevo",
              showConfirmButton: false,
              timer: 1500
            });

          }
        })

      }
    });

  }

  actualizarContrasenia() {

    Swal.fire({
      title: "¿Quieres actualizar tu contraseña?",
      text: "Asegurate de recordarla",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#14B8A6",
      cancelButtonColor: "#EF4444",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {

        const id = localStorage.getItem("idU");

        this.service.put(`paciente/updatePassword/${id}`, this.FormularioContrasenia.value).subscribe((info: any) => {

          if (info.error == false) {

            Swal.fire({
              icon: "success",
              title: "Exito",
              text: "Contraseña actualizadado con exito",
              showConfirmButton: false,
              timer: 1500
            });

            setTimeout(() => {
              location.reload();
            }, 1500);

          } else {
            Swal.fire({
              icon: "error",
              title: "Upsss",
              text: "Hubo un error al intentar actualizar la contraseña, intentelo de nuevo",
              showConfirmButton: false,
              timer: 1500
            });

          }
        })

      }
    });

  }



  //-------------------------------------------- Valdacion de campos --------------------------------------

  campoValidoEmail(campo: string) {
    return this.FormularioEmail.controls[campo].errors && this.FormularioEmail.controls[campo].touched;
  };

  campoValidoContrasenia(campo: string) {
    return this.FormularioContrasenia.controls[campo].errors && this.FormularioContrasenia.controls[campo].touched;
  };

}
