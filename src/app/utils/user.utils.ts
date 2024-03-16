import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { UserService } from "../services/user.service";
import { IUser } from "../interfaces/iuser.interface";

@Injectable({
    providedIn: 'root'
  })

export class UserUtils {

    router = inject(Router);
    userService = inject(UserService)

    async deleteUser(id: string | undefined, myUser: IUser) {
        // llamar al servicio para borrar usuario
        if (id !== undefined) {
    
          Swal.fire({
            title: "¿Deseas borrar al usuario " + myUser.first_name + " " + myUser.last_name + "?",
            text: "No podrá revertir esta acción",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Aceptar"
          }).then(async (result) => {
            if (result.isConfirmed) {
              let response = await this.userService.delete(id);
              if (response._id) {
                Swal.fire({
                  title: "Eliminado!",
                  text: "Se ha borrado correctamente el usuario " + response.first_name + " " + response.last_name,
                  icon: "success"
                });
                this.router.navigate(['/home']);
              }
            }
          });
        }
      }
}