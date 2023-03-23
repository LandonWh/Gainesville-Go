
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {
  submitted: boolean = false;
  authError = false;
  authErrorMsg: string;
  isLoggedIn: boolean = false;
  isLoginFailed:boolean = false;
  roles: string[] = [];
  loginForm: FormGroup;
  
  hide: boolean = false;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private tokenStorage: TokenStorageService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  form: any = {
    email: null,
    password: null
  };

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }


  login(): void {
    const {email, password} = this.form;

    this.authService.login(email, password).subscribe(
      data => {
        //Not sure about this???
        this.tokenStorage.saveToken((<any>data).data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.router.navigate(['/home']);
      }
    )
  }


  //Used for testing. 
  onSubmit(accountData: any) {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    const userAccountBody = {
      email: accountData.email,
      password: accountData.password
    }
  }
  
}
