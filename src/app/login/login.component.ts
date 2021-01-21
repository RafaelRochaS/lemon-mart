import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { catchError, filter, tap } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { AuthService } from '../auth/auth.service';
import { EmailValidation, PasswordValidation } from '../common/validations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    `
      .error {
        color: red
      }
    `,
    `
      div[fxLayout] {
        margin-top: 32px;
      }
    `,
  ],
})
export class LoginComponent implements OnInit {

  private subs = new SubSink();
  loginForm: FormGroup | any;
  loginError = '';
  redirectUrl = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.subs.sink = route.paramMap.subscribe(params => (this.redirectUrl = params.get('redirectUrl') ?? ''));
  }

  ngOnInit(): void {
    this.authService.logout();
    this.buildLoginForm();
  }

  buildLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', EmailValidation ],
      password: ['', PasswordValidation],
    });
  }

  async login(submittedForm: FormGroup): Promise<void> {

    this.authService
      .login(
        submittedForm.value.email,
        submittedForm.value.password
      )
      .pipe(catchError(err => (this.loginError = err)));

    this.subs.sink = combineLatest([
      this.authService.authStatus$,
      this.authService.currentUser$,
    ])
      .pipe(
        filter(
          ([authStatus, user]) =>
            authStatus.isAuthenticated && user?._id !== ''
        ),
        tap(([authStatus, user]) => {
          this.router.navigate([this.redirectUrl || '/manager']);
        })
      )
      .subscribe();
  }
}
