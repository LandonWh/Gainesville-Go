//Password Validation is from https://www.youtube.com/watch?v=qe-ebQ65sUY&t=68s
//Frontend to Backend Link is from https://www.youtube.com/watch?v=pHRHJCYBqxw&t=1817s
import { Component } from '@angular/core';
import { OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { Account, RegisterService} from './register.service'
import { Router, RouterLink } from '@angular/router';


import Swal from 'sweetalert2';
import { Moment } from 'moment';
import * as moment from 'moment';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  accounts: Account[] = [];
  
  firstName: string = "";
  lastName: string = "";
  dateOfBirth: string =""
  email: string = "";
  password: string = "";

  added: boolean = false;
  authError = false;
  authErrorMsg: string;

  reactiveForm:FormGroup;
  hide: boolean = false;
  success: boolean = true;
  
  
  maxDate: Date;
  ngOnInit() {
  this.maxDate = moment().toDate();
  }

  constructor(private fb: FormBuilder, private RegisterService: RegisterService, private httpClient: HttpClient, private router: Router) { 
    this.accounts = RegisterService.get();
  }
    
    registerForm : FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.pattern("^[a-zA-z']*$")]],
    lastName: ['', [Validators.required, Validators.pattern("^[a-zA-z']*$")]],
    dateOfBirth: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],

    
  },
  
  )
  
  
  get f () {
    return this.reactiveForm.controls
  }

  addAccount(): void{

    if(this.registerForm.invalid) {
      this.missingField();
      return;
    }
    this.httpClient.post('api/register', {
      firstName: this.firstName,
          lastName: this.lastName,
          dateOfBirth: this.dateOfBirth,
          email: this.email,
          password: this.password
    }).subscribe (
        response => {this.router.navigate(['/login']);},
        err => {this.failedRegistration()}
    );
  }

  missingField() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Missing 1 or more required field(s), or input validation failed!',
    });
    
  }

  failedRegistration() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Account creation failed, email is already associated with another account!',
    })
  }

  //Used for testing. 
  onSubmit(accountData: any) {
    this.added = true;
    if (this.registerForm.invalid) {
      
      return;
    }
    const userAccountBody = {
      firstName: accountData.firstName,
      lastName: accountData.lastName,
      email: accountData.email,
      password: accountData.password,
      dateOfBirth: accountData.dateOfBirth
    }
  }

}


