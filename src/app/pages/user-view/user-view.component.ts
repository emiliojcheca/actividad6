import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { IUser } from '../../interfaces/iuser.interface';

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

}
