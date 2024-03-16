import { Component, inject } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UserService } from '../../services/user.service';
import { UserCardComponent } from '../../components/user-card/user-card.component';

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

    try {
      this.arrUsers = await this.userServices.getAll();
    } catch (err) {
      console.log(err)
    }
  }

}
