import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  modelForm: FormGroup;

  constructor() {
    this.modelForm = new FormGroup({
      firstname: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      lastname: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      img: new FormControl(null, [Validators.required]),
    }, []);
  }

  ngOnInit(): void {
    let obj = {
      firstname:"Emilio J.",
      lastname: "Checa Rodríguez",
      email:"emilioj.checa@gmail.com",
      img: "https://i.pravatar.cc/500"
    }

    this.modelForm = new FormGroup({
      firstname: new FormControl(obj.firstname, [Validators.required, Validators.minLength(3)]),
      lastname: new FormControl(obj.lastname, [Validators.required, Validators.minLength(3)]),
      email: new FormControl(obj.email, [Validators.required, Validators.email]),
      img: new FormControl(obj.img, [Validators.required])
    }, []);
  }

  getDataForm(): void {
    console.log(this.modelForm.value);
    this.modelForm.reset();
  }

  checkControl(formControlName: string, validador: string): boolean | undefined {
    return this.modelForm.get(formControlName)?.hasError(validador) && this.modelForm.get(formControlName)?.touched;
  }
}
