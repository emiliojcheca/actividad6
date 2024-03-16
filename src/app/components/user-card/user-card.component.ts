import { Component, Input, inject } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { UserUtils } from '../../utils/user.utils';

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
  userUtils = inject(UserUtils)
  router = inject(Router);

  async deleteUser(id: string | undefined) {
    this.userUtils.deleteUser(id,this.myUser);
  }

}
