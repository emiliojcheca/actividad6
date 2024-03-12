import { Component, Input, inject } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {

  @Input() myUser!: IUser;
  @Input() parent: string = "";
  userService = inject(UserService)

  async deleteUser(id: string | undefined) {
    // llamar al servicio para borrar usuario
    if (id !== undefined) {

      Swal.fire({
        title: "¿Seguro que desea eliminar al usuario " + this.myUser.first_name + " " + this.myUser.last_name + "?",
        text: "No podrá revertir esta",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Eliminar"
      }).then(async (result) => {
        if (result.isConfirmed) {
          let response = await this.userService.delete(id);
          if (response._id) {
            Swal.fire({
              title: "Eliminado!",
              text: "Se ha borrado correctamente el usuario " + response.first_name + " " + response.last_name,
              icon: "success"
            });
          }
        }
      });
    }
  }
}
