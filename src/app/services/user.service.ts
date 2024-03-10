import { Injectable, inject } from '@angular/core';
import { IUser } from '../interfaces/iuser.interface';
import { USERS } from '../db/users.db';
import { HttpClient } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //constructor() { }

  /* ANTIGUO */ 
  /*private users: IUser[] = USERS

  getAll(): IUser[] {
    return this.users;
  }

  getById(id: number): IUser | undefined {
    return this.users.find(user => user.id === id)
  }*/


  /* NUEVO */

  httpClient = inject(HttpClient);
  baseUrl = 'https://peticiones.online/api/users';

  //observables - son la forma nativa con la angular hace peticiones externas. Algo que se mantiene atento a lo cambios que pueda sufrir los datos.
  getAll(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(this.baseUrl)
  }

  //Promises
  getAllPromises(): Promise<IUser[]> {
    return lastValueFrom(this.httpClient.get<IUser[]>(this.baseUrl))
  }

  getById(id: string): Promise<IUser> {
    return lastValueFrom(this.httpClient.get<IUser>(`${this.baseUrl}/${id}`))
  }

  delete(id: string): Promise<IUser> {
    return lastValueFrom(this.httpClient.delete<IUser>(`${this.baseUrl}/${id}`))
  }

  insert(formValue: IUser): Promise<IUser> {
    return lastValueFrom(this.httpClient.post<IUser>(this.baseUrl, formValue))
  }

  update(formValue: IUser): Promise<IUser> {
    return lastValueFrom(this.httpClient.put<IUser>(`${this.baseUrl}/${formValue._id}`, formValue))
  }

  /**
   *   httpClient = inject(HttpClient)
  baseUrl = 'https://peticiones.online/api/series'

  //CRUD de datos CREATE-READ-UPDATE-DELETE
  //GET que es el verbo para obtener datos
  //POST que es el verbo para guardar datos
  //PUT/PATH que es el verbo para actualizar datos
  //DELETE que es el verbo para borrar datos.

  //observables - son la forma nativa con la angular hace peticiones externas. Algo que se mantiene atento a lo cambios que pueda sufrir los datos.
  getAll(): Observable<ISerie[]> {
    return this.httpClient.get<ISerie[]>(this.baseUrl)
  }

  //Promises
  getAllPromises(): Promise<ISerie[]> {
    return lastValueFrom(this.httpClient.get<ISerie[]>(this.baseUrl))
  }

  getById(id: string): Promise<ISerie> {
    return lastValueFrom(this.httpClient.get<ISerie>(`${this.baseUrl}/${id}`))
  }

  delete(id: string): Promise<ISerie> {
    return lastValueFrom(this.httpClient.delete<ISerie>(`${this.baseUrl}/${id}`))
  }

  insert(formValue: ISerie): Promise<ISerie> {
    return lastValueFrom(this.httpClient.post<ISerie>(this.baseUrl, formValue))
  }

  update(formValue: ISerie): Promise<ISerie> {
    return lastValueFrom(this.httpClient.put<ISerie>(`${this.baseUrl}/${formValue._id}`, formValue))
  }

   */

}
