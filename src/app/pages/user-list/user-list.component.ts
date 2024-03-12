import { Component, inject } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UserService } from '../../services/user.service';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { IServiceResponse } from '../../interfaces/iserviceresponse.interface';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UserCardComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  arrUsers: IUser[] = [];

  userServices = inject(UserService);

  async ngOnInit(): Promise<void> {
    //metodo observable
    try {
      /*this.userServices.getAll().subscribe((data: IUser[]) => {
        this.arrUsers = data;
      })*/
      this.arrUsers = await this.userServices.getAll();

      console.log("tenemos los usuarios: ", this.arrUsers);
    } catch (err) {
      console.log(err)
    }
  }

}
