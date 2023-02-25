//Password Validation is from https://www.youtube.com/watch?v=qe-ebQ65sUY&t=68s
//Frontend to Backend Link is from https://www.youtube.com/watch?v=pHRHJCYBqxw&t=1817s
import { Component } from '@angular/core';
import { OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { first } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';
import { AlertService } from '../_services/alert.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{
  

  firstName: string = "";
  lastName: string = "";
  email: string = "";
  password: string = "";

  reactiveForm:FormGroup;
  hide: boolean = false;
  httpClient: any;

  submitted = false;
  loading = true;
  
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService

    ) { }
    

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

  onSubmit() {
    this.submitted = true;

    this.alertService.clear();

    if (this.reactiveForm.invalid) {
      return;
    }
    this.loading  = true;
    this.accountService.register(this.reactiveForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Registration Successful', { keepAfterRouteChange: true});
          this.router.navigate(['../login'], { relativeTo: this.route});
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      })
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

  // //.promise replacement from https://stackoverflow.com/questions/67044273/rxjs-topromise-deprecated
  // public async loadAccountInfo() {
  //   const accountInfoItems$ = this.httpClient.get<IAccountInfo[]>('/api');
  //   this.accountInfoItems = await lastValueFrom(accountInfoItems$);
  //   //this.accountInfoItems = await this.httpClient.get<IAccountInfo[]>('/api/').toPromise //Make a new request type in main.go and toPromise is deprecated, find replacement 
  // }
}
