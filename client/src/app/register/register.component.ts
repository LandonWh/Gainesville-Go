//Password Validation is from https://www.youtube.com/watch?v=qe-ebQ65sUY&t=68s

import { Component } from '@angular/core';
import { OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

interface IAccountInfo {
  firstName: string
  lastName: string
  email: string
  password: string
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  reactiveForm:FormGroup;
  ngOnit() {}
  
  hide: boolean = false;
  constructor(private fb: FormBuilder, private httpClient: HttpClient) { }
    
    registerForm : FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.pattern("^[a-zA-z']*$")]],
    lastName: ['', [Validators.required, Validators.pattern("^[a-zA-z']*$")]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
  },
  {
    //Validators: this.MustMatch('password', 'confirmPassword')
  })
  
  get f () {
    return this.reactiveForm.controls
  }

  /*MustMatch(controlName: string, matchingControlName: string) {
    return(formGroup:FormGroup)=> {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.MustMatch) {
        return
      }
      if(control.value !== matchingControl.value) {
        matchingControl.setErrors({MustMatch:true});
      }
      else {
        matchingControl.setErrors(null);
      }
    }
  }
  */
  

  onLogin() {
    if (!this.registerForm.valid) {
      return;
    }
    console.log(this.registerForm.value);
  }

  //Stuff to send account info to backend
  //This needs to be moved to app.component.ts (maybe?)
  public firstName = ''
  public lastName = ''
  public email = ''
  public password = ''
  public accountInfoItems: IAccountInfo[] = [

    {
      firstName: 'John',
      lastName: 'Smith',
      email: 'Hello',
      password: 'first password'
    },
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'Hello',
      password: 'second password'
    }
  ]

  //.promise replacement from https://stackoverflow.com/questions/67044273/rxjs-topromise-deprecated
  public async loadAccountInfo() {
    const accountInfoItems$ = this.httpClient.get<IAccountInfo[]>('/api');
    this.accountInfoItems = await lastValueFrom(accountInfoItems$);
    //this.accountInfoItems = await this.httpClient.get<IAccountInfo[]>('/api/').toPromise //Make a new request type in main.go and toPromise is deprecated, find replacement 
  }

  public async createAccount() {
    await this.httpClient.post('/api/', {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    })
    this.firstName = ''
    this.lastName = ''
    this.email = ''
    this.password = ''
     //Make a new request type in main.go here too
  }
}
