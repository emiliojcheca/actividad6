import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {

  userForm: FormGroup;
  userServices = inject(UserService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  nameButton: String = "Guardar";

  constructor() {
    this.userForm = new FormGroup({
      first_name: new FormControl("", [Validators.required, Validators.minLength(3)]),
      last_name: new FormControl("", [Validators.required, Validators.minLength(3)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      img: new FormControl("", [Validators.required])
    }, [])
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params: any) => {
      if (params.id) {
        this.nameButton = "Actualizar";
        const response = await this.userServices.getById(params.id)
        this.userForm = new FormGroup({
          _id: new FormControl(response._id, []),
          first_name: new FormControl(response.first_name, [Validators.required, Validators.minLength(3)]),
          last_name: new FormControl(response.last_name, [Validators.required, Validators.minLength(3)]),
          email: new FormControl(response.email, [Validators.required, Validators.email]),
          img: new FormControl(response.image, [Validators.required])
        }, [])
      }
    })
  }

  async getDataForm() {
    if (this.userForm.value._id) {
      //actualizando
      const response = await this.userServices.update(this.userForm.value);
      if (response.error !== undefined) {
        Swal.fire(`Se ha producido el siguiente error: ${response.error}`);
      } else if (response.id) {
        Swal.fire(`El usuario ${response.first_name} ${response.last_name} se ha actualizado correctamente`);
        this.router.navigate(['/home'])
      } else {
        Swal.fire('Ha habido un problema intentalo de nuevo')
      }
    } else {
      const response = await this.userServices.insert(this.userForm.value)
      if (response.error !== undefined) {
        Swal.fire(`Se ha producido el siguiente error: ${response.error}`);
      } else if (response.id) {
        Swal.fire(`El usuario ${response.first_name} ${response.last_name} se ha añadido correctamente`)
        this.router.navigate(['/home'])
      } else {
        Swal.fire('Ha habido un problema intentalo de nuevo')
      }
    }
  }

  checkControl(formControlName: string, validador: string): boolean | undefined {
    return this.userForm.get(formControlName)?.hasError(validador) && this.userForm.get(formControlName)?.touched;
  }

}
