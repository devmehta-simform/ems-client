import { Component, OnInit } from '@angular/core';
import { RolesSchema } from '../../../response-types/roles';
import { z } from 'zod';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent implements OnInit {
  isRegister = false;
  isPasswordVisible = false;
  roles: z.infer<typeof RolesSchema>[] = ['Guest', 'Host', 'Volunteer'];
  authForm;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private loaderService: LoaderService
  ) {
    this.authForm = new FormGroup({
      name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(50)] }),
      email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
      password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(8), Validators.maxLength(20)] }),
      role: new FormControl<z.infer<typeof RolesSchema>>('Guest', { nonNullable: true }),
    });
  }

  ngOnInit(): void {
    this.toggleIsRegister(this.isRegister);
    this.router.events.subscribe(routerEvent => {
      if (routerEvent instanceof RouterEvent) {
        this.isRegister = routerEvent.url.split(/[?=]/)[2] === 'true';
        this.toggleIsRegister(this.isRegister);
      }
    });
  }
  toggleIsRegister(val?: boolean) {
    if (val !== undefined) this.isRegister = val;
    else this.isRegister = !this.isRegister;
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
        this.loaderService.show();
        this.userService.register(this.authForm.getRawValue()).subscribe(() => {
          this.router.navigate(['/auth'], { queryParams: { register: false } });
        });
      } else {
        this.loaderService.show();
        this.userService.login(this.authForm.getRawValue()).subscribe(user => {
          switch (user.role) {
            case 'Guest': {
              this.router.navigate(['/guest/explore']).then(() => this.loaderService.hide());
              break;
            }
            case 'Host': {
              this.router.navigate(['/host']).then(() => this.loaderService.hide());
              break;
            }
            case 'Volunteer': {
              break;
            }
            default: {
              /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
              const check: never = user.role;
              break;
            }
          }
        });
      }
    }
  }
}
