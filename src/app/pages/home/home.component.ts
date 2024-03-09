import { Component, inject } from '@angular/core';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { IUser } from '../../interfaces/iuser.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UserCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  arrUsers: IUser[] = []
  userServices = inject(UserService);

  ngOnInit() {
    this.arrUsers = this.userServices.getAll();
  }

}
