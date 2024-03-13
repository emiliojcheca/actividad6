import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { IUser } from '../../interfaces/iuser.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})
export class UserViewComponent {

  activatedRoute = inject(ActivatedRoute);
  userServices = inject(UserService);
  user: IUser = {
    _id: "",
    id: 0,
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    image: "",
    password: ""
  };

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params:any) => {
      //let id = Number(params.id)
      console.log("ID solicitado: " + params.id);
      this.user = await this.userServices.getById(params.id);

      console.log("response en user-view: ",this.user);
    })
  }

  async deleteUser(id: string | undefined) {
    // llamar al servicio para borrar usuario
    if (id !== undefined) {

      Swal.fire({
        title: "¿Seguro que desea eliminar al usuario " + this.user.first_name + " " + this.user.last_name + "?",
        text: "No podrá revertir esta",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Eliminar"
      }).then(async (result) => {
        if (result.isConfirmed) {
          let response = await this.userServices.delete(id);
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
