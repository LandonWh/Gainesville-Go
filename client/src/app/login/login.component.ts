
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { User } from '../models/User';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit{
  submitted: boolean = false;
  authError = false;
  authErrorMsg: string;
  isLoggedIn: boolean = false;
  isLoginFailed:boolean = false;
  roles: string[] = [];
  loginForm: FormGroup;
  valiationFailed: boolean = false;
  
  hide: boolean = false;

  form: any = {
    email: null,
    password: null
  };

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private tokenStorage: TokenStorageService, private userService: UserService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }


  login(): void {
    
    if (this.loginForm.invalid) {
      this.missingField();
      return
    }
      this.tokenStorage.saveUser(User);
      this.authService
      .login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value)
      .subscribe(
        response => {
          this.router.navigate(['/home']),  
          console.log(response), 
          this.tokenStorage.getToken, 
          this.isLoggedIn = true;
        },
        err => {
          
          this.loginFailed()
        },
      );
   
    
  }

  
  loginFailed() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Incorrect email or password!',
    });
    
  }

  missingField() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Missing 1 or more required field(s), or input validation failed!',
    });
    
  }


  //Used for testing. 
  onSubmit(accountData: any) {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    if (this.isLoggedIn == true) {
      const userAccountBody = {
        email: accountData.email,
        password: accountData.password
      }
    }
    else return;
    
  }
  
}