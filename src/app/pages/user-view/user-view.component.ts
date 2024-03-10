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
  user!: IUser;

  ngOnInit() {
    this.activatedRoute.params.subscribe((params:any) => {
      //let id = Number(params.id)
      let response: any = this.userServices.getById(params.id);
      if (response !== undefined) {
        this.user = response;
      }
    })
  }

}
