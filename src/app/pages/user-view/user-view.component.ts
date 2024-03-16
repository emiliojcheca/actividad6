import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { IUser } from '../../interfaces/iuser.interface';
import Swal from 'sweetalert2';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { UserUtils } from '../../utils/user.utils';

@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})
export class UserViewComponent {

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router)
  userServices = inject(UserService);
  userUtils = inject(UserUtils);
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
    this.userUtils.deleteUser(id, this.user);
  }

}
