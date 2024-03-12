import { Injectable, inject } from '@angular/core';
import { IUser } from '../interfaces/iuser.interface';
import { USERS } from '../db/users.db';
import { HttpClient } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';
import { IServiceResponse } from '../interfaces/iserviceresponse.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  httpClient = inject(HttpClient);
  baseUrl = 'https://peticiones.online/api/users';

  

  //Promises
  async getAll(): Promise<IUser[]> {
    let arrUsers: IUser[] = [];
    
    await lastValueFrom(this.httpClient.get<IServiceResponse>(this.baseUrl)).then(response => {
      arrUsers = response.results;
    });

    return arrUsers;
  }

  getById(id: string): Promise<IUser> {
    console.log("Petición: ", `${this.baseUrl}/${id}`);
    return lastValueFrom(this.httpClient.get<IUser>(`${this.baseUrl}/${id}`));
  }

  delete(id: string): Promise<IUser> {
    return lastValueFrom(this.httpClient.delete<IUser>(`${this.baseUrl}/${id}`));
  }

  insert(formValue: IUser): Promise<IUser> {
    return lastValueFrom(this.httpClient.post<IUser>(this.baseUrl, formValue));
  }

  update(formValue: IUser): Promise<IUser> {
    return lastValueFrom(this.httpClient.put<IUser>(`${this.baseUrl}/${formValue._id}`, formValue));
  }

}
