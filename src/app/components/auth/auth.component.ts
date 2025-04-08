import { Component } from '@angular/core';
import { Roles } from '../../../models';
import { z } from 'zod';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  isRegister = true;
  isPasswordVisible = false;
  roles: z.infer<typeof Roles>[] = ['Guest', 'Host', 'Volunteer'];
  authForm;
  constructor(private userService: UserService) {
    this.authForm = new FormGroup({
      name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(50)] }),
      email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
      password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(8), Validators.maxLength(20)] }),
      role: new FormControl<z.infer<typeof Roles>>('Guest', { nonNullable: true }),
    });
  }
  toggleIsRegister() {
    this.isRegister = !this.isRegister;
    if (this.isRegister) {
      this.authForm.controls.name.addValidators([Validators.required]);
    } else {
      this.authForm.controls.name.removeValidators([Validators.required]);
    }
    this.authForm.controls.name.updateValueAndValidity();
  }
  handleSubmit() {
    if (this.authForm.valid) {
      if (this.isRegister) {
        this.userService.register(this.authForm.getRawValue()).subscribe(data => {
          console.log(data);
        });
      } else {
        this.userService.login(this.authForm.getRawValue()).subscribe(data => {
          console.log(data);
        });
      }
    }
  }
}
