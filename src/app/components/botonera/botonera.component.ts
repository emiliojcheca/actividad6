import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-botonera',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './botonera.component.html',
  styleUrl: './botonera.component.css'
})
export class BotoneraComponent {
  @Input() parent: string = "";
  @Input() idUser: string | undefined = "";
  userService = inject(UserService)

  async deleteUser(id: string | undefined) {
    // llamar al servicio para borrar usuario
    if (id !== undefined) {
      let confirmacion = confirm('Seguro que quiere borrar el usuario con id ' + this.idUser)
      if (confirmacion) {
        //borrar
        let response = await this.userService.delete(id);
        if (response._id) {
          alert('Se ha borrado correctamente el usuario ' + response.first_name + ' ' + response.last_name);
        }
      }
    }
  }
}
