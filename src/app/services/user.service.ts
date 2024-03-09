import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/iuser.interface';
import { USERS } from '../db/users.db';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //constructor() { }

  private users: IUser[] = USERS

  getAll(): IUser[] {
    return this.users;
  }

  getById(id: number): IUser | undefined {
    return this.users.find(user => user.id === id)
  }

}
